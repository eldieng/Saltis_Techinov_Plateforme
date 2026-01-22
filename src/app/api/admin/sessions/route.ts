import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await prisma.session.findMany({
      include: {
        speakers: {
          include: { speaker: true },
        },
      },
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, type, theme, day, startTime, endTime, room, capacity, speakerIds, eventId } = body;

    // Get default event if not provided
    let finalEventId = eventId;
    if (!finalEventId) {
      const defaultEvent = await prisma.event.findFirst({ where: { isActive: true } });
      if (!defaultEvent) {
        return NextResponse.json({ error: "No active event found" }, { status: 400 });
      }
      finalEventId = defaultEvent.id;
    }

    const newSession = await prisma.session.create({
      data: {
        eventId: finalEventId,
        title,
        description,
        type,
        theme,
        day: parseInt(day),
        startTime,
        endTime,
        room,
        capacity: capacity ? parseInt(capacity) : null,
        speakers: speakerIds?.length
          ? {
              create: speakerIds.map((speakerId: string) => ({
                speakerId,
              })),
            }
          : undefined,
      },
      include: {
        speakers: { include: { speaker: true } },
      },
    });

    return NextResponse.json({ session: newSession });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
