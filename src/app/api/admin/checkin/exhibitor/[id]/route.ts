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

    const exhibitor = await prisma.exhibitor.findUnique({
      where: { id },
    });

    if (!exhibitor) {
      return NextResponse.json({ error: "Exposant non trouvé" }, { status: 404 });
    }

    if (exhibitor.checkedIn) {
      return NextResponse.json(
        { error: "Exposant déjà enregistré", checkedInAt: exhibitor.checkedInAt },
        { status: 400 }
      );
    }

    const updatedExhibitor = await prisma.exhibitor.update({
      where: { id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
        checkedInBy: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      exhibitor: updatedExhibitor,
    });
  } catch (error) {
    console.error("Exhibitor check-in error:", error);
    return NextResponse.json({ error: "Check-in failed" }, { status: 500 });
  }
}
