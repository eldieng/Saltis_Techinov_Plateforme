import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER", "HOSTESS"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    if (ticket.status === "USED") {
      return NextResponse.json(
        { error: "Ticket already checked in", checkedInAt: ticket.checkedInAt },
        { status: 400 }
      );
    }

    if (ticket.status !== "VALID") {
      return NextResponse.json(
        { error: `Ticket status is ${ticket.status}` },
        { status: 400 }
      );
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        status: "USED",
        checkedInAt: new Date(),
        checkedInBy: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Check-in failed" }, { status: 500 });
  }
}
