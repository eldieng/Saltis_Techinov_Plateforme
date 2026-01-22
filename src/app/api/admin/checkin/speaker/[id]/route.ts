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

    const speaker = await prisma.speaker.findUnique({
      where: { id },
    });

    if (!speaker) {
      return NextResponse.json({ error: "Speaker non trouvé" }, { status: 404 });
    }

    if (speaker.checkedIn) {
      return NextResponse.json(
        { error: "Speaker déjà enregistré", checkedInAt: speaker.checkedInAt },
        { status: 400 }
      );
    }

    const updatedSpeaker = await prisma.speaker.update({
      where: { id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
        checkedInBy: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      speaker: updatedSpeaker,
    });
  } catch (error) {
    console.error("Speaker check-in error:", error);
    return NextResponse.json({ error: "Check-in failed" }, { status: 500 });
  }
}
