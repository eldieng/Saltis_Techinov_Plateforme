"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";
import {
  Session,
  sessionTypeLabels,
  sessionTypeColors,
} from "@/lib/data/sessions";

interface SessionCardProps {
  session: Session;
  showDetails?: boolean;
}

export function SessionCard({ session, showDetails = true }: SessionCardProps) {
  const formatTime = (time: string) => time;

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${
        session.isBreak ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex items-center space-x-2 text-[#0d5a75]">
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            {formatTime(session.startTime)} - {formatTime(session.endTime)}
          </span>
        </div>
        <Badge className={sessionTypeColors[session.type]}>
          {sessionTypeLabels[session.type]}
        </Badge>
      </div>

      <h3 className="text-lg font-semibold text-[#0d5a75] mb-2">
        {session.title}
      </h3>

      {session.description && showDetails && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {session.description}
        </p>
      )}

      {/* Speakers */}
      {session.speakers.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {session.speakers.slice(0, 3).map((speaker) => (
              <div
                key={speaker.id}
                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {session.speakers.map((s) => s.name).join(", ")}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{session.room}</span>
        </div>
        {session.capacity && (
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{session.capacity} places</span>
          </div>
        )}
      </div>

      {showDetails && !session.isBreak && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#0d5a75] hover:text-[#FF6B35] p-0"
            asChild
          >
            <Link href={`/programme/${session.id}`}>
              Voir les détails
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[#0d5a75] border-[#0d5a75]"
            onClick={() => {
              // Generate iCal event
              const event = generateICalEvent(session);
              downloadICalFile(event, session.title);
            }}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

function generateICalEvent(session: Session): string {
  const dayOffset = session.day === 2 ? 1 : 0;
  const startDate = `2025061${5 + dayOffset}`;
  const startTime = session.startTime.replace(":", "") + "00";
  const endTime = session.endTime.replace(":", "") + "00";

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SALTIS TechInov//Programme//FR
BEGIN:VEVENT
UID:${session.id}@saltis-techinov.org
DTSTAMP:${startDate}T${startTime}Z
DTSTART:${startDate}T${startTime}
DTEND:${startDate}T${endTime}
SUMMARY:${session.title}
DESCRIPTION:${session.description.replace(/\n/g, "\\n")}
LOCATION:${session.room} - Musée des Civilisations Noires, Dakar
END:VEVENT
END:VCALENDAR`;
}

function downloadICalFile(content: string, title: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/[^a-z0-9]/gi, "_")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
