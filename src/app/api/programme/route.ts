import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        speakers: {
          include: { speaker: true },
        },
      },
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });

    // Transform data to match expected format
    const formattedSessions = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      type: session.type,
      theme: session.theme,
      day: session.day,
      startTime: session.startTime,
      endTime: session.endTime,
      room: session.room,
      capacity: session.capacity,
      isBreak: session.isBreak,
      speakers: session.speakers.map((ss) => ({
        id: ss.speaker.id,
        name: ss.speaker.name,
        role: ss.speaker.role,
        company: ss.speaker.company,
        bio: ss.speaker.bio,
        image: ss.speaker.image,
        linkedin: ss.speaker.linkedin,
        twitter: ss.speaker.twitter,
      })),
    }));

    return NextResponse.json({ sessions: formattedSessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
