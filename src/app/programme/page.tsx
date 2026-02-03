import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ProgrammeClient } from "@/components/programme/ProgrammeClient";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Découvrez le programme complet de SALTIS TechInov 2025 : conférences, panels, ateliers et networking.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProgrammePage() {
  const sessions = await prisma.session.findMany({
    include: {
      speakers: {
        include: { speaker: true },
      },
    },
    orderBy: [{ day: "asc" }, { startTime: "asc" }],
  });

  // Transform data for client component
  const formattedSessions = sessions.map((session) => ({
    id: session.id,
    title: session.title,
    description: session.description || "",
    type: session.type,
    theme: session.theme,
    day: session.day as 1 | 2,
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
      bio: ss.speaker.bio || "",
      image: ss.speaker.image || "",
      linkedin: ss.speaker.linkedin || undefined,
      twitter: ss.speaker.twitter || undefined,
    })),
  }));

  return <ProgrammeClient sessions={formattedSessions} />;
}
