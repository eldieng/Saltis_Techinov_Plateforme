import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/tickets/[id] - Get ticket by ID or ticket number
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    // Try to find by ID first, then by ticket number
    let ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        pass: true,
        order: {
          select: {
            orderNumber: true,
            customerEmail: true,
            customerFirstName: true,
            customerLastName: true,
          },
        },
      },
    });

    if (!ticket) {
      ticket = await prisma.ticket.findUnique({
        where: { ticketNumber: id },
        include: {
          pass: true,
          order: {
            select: {
              orderNumber: true,
              customerEmail: true,
              customerFirstName: true,
              customerLastName: true,
            },
          },
        },
      });
    }

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error("Get ticket error:", error);
    return NextResponse.json(
      { error: "Failed to get ticket" },
      { status: 500 }
    );
  }
}
