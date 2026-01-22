import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/checkin - Check in a ticket by QR code
 */
export async function POST(request: NextRequest) {
  try {
    // Support both query param and body
    const url = new URL(request.url);
    const qrFromQuery = url.searchParams.get("qr");
    
    let qrCode: string | null = qrFromQuery;
    let checkedInBy: string | undefined;

    // If no query param, try to parse body
    if (!qrFromQuery) {
      try {
        const body = await request.json();
        qrCode = body.qrCode;
        checkedInBy = body.checkedInBy;
      } catch {
        // Body parsing failed, qrCode stays null
      }
    }

    if (!qrCode) {
      return NextResponse.json(
        { error: "QR code is required" },
        { status: 400 }
      );
    }

    // Try to parse QR code if it's JSON (from generated QR)
    let ticketIdentifier = qrCode;
    try {
      const parsed = JSON.parse(qrCode);
      if (parsed.ticketId) {
        ticketIdentifier = parsed.ticketId;
      }
    } catch {
      // Not JSON, use as-is (could be UUID or ticket number)
    }

    // Find ticket by QR code (UUID), ticket ID, or ticket number
    let ticket = await prisma.ticket.findUnique({
      where: { qrCode: ticketIdentifier },
      include: {
        pass: true,
        order: {
          select: {
            orderNumber: true,
            status: true,
          },
        },
      },
    });

    // Fallback: try to find by ticket ID
    if (!ticket) {
      ticket = await prisma.ticket.findUnique({
        where: { id: ticketIdentifier },
        include: {
          pass: true,
          order: {
            select: {
              orderNumber: true,
              status: true,
            },
          },
        },
      });
    }

    // Fallback: try to find by ticket number
    if (!ticket) {
      ticket = await prisma.ticket.findUnique({
        where: { ticketNumber: ticketIdentifier },
        include: {
          pass: true,
          order: {
            select: {
              orderNumber: true,
              status: true,
            },
          },
        },
      });
    }

    if (!ticket) {
      return NextResponse.json(
        { 
          success: false,
          error: "Ticket not found",
          status: "INVALID",
        },
        { status: 404 }
      );
    }

    // Check ticket status
    if (ticket.status === "USED") {
      return NextResponse.json({
        success: false,
        error: "Ticket already used",
        status: "ALREADY_USED",
        ticket: {
          ticketNumber: ticket.ticketNumber,
          holderName: `${ticket.holderFirstName} ${ticket.holderLastName}`,
          passName: ticket.pass.name,
          checkedInAt: ticket.checkedInAt,
        },
      });
    }

    if (ticket.status === "CANCELLED") {
      return NextResponse.json({
        success: false,
        error: "Ticket has been cancelled",
        status: "CANCELLED",
      });
    }

    if (ticket.status === "EXPIRED") {
      return NextResponse.json({
        success: false,
        error: "Ticket has expired",
        status: "EXPIRED",
      });
    }

    if (ticket.order.status !== "CONFIRMED") {
      return NextResponse.json({
        success: false,
        error: "Order not confirmed",
        status: "ORDER_NOT_CONFIRMED",
      });
    }

    // Check in the ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        status: "USED",
        checkedInAt: new Date(),
        checkedInBy: checkedInBy || "SYSTEM",
      },
      include: {
        pass: true,
      },
    });

    return NextResponse.json({
      success: true,
      status: "CHECKED_IN",
      ticket: {
        ticketNumber: updatedTicket.ticketNumber,
        holderName: `${updatedTicket.holderFirstName} ${updatedTicket.holderLastName}`,
        holderEmail: updatedTicket.holderEmail,
        passName: updatedTicket.pass.name,
        checkedInAt: updatedTicket.checkedInAt,
      },
    });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json(
      { error: "Check-in failed" },
      { status: 500 }
    );
  }
}
