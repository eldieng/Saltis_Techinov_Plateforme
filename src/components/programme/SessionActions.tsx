"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Share2, Linkedin, Twitter } from "lucide-react";
import { Session } from "@/lib/data/sessions";

interface SessionActionsProps {
  session: Session;
}

export function SessionActions({ session }: SessionActionsProps) {
  const handleDownloadIcs = () => {
    const dayOffset = session.day === 2 ? 1 : 0;
    const startDate = `2025061${5 + dayOffset}`;
    const startTime = session.startTime.replace(":", "") + "00";
    const endTime = session.endTime.replace(":", "") + "00";

    const icsContent = `BEGIN:VCALENDAR
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

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${session.title.replace(/[^a-z0-9]/gi, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://saltis-techinov.org/programme/${session.id}`
    );
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    session.title
  )}&dates=2025061${session.day === 1 ? 5 : 6}T${session.startTime.replace(
    ":",
    ""
  )}00/2025061${session.day === 1 ? 5 : 6}T${session.endTime.replace(
    ":",
    ""
  )}00&details=${encodeURIComponent(
    session.description
  )}&location=${encodeURIComponent(
    session.room + ", Musée des Civilisations Noires, Dakar"
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Je participe à "${session.title}" au SALTIS TechInov 2025 ! #SALTIS2025`
  )}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `https://saltis-techinov.org/programme/${session.id}`
  )}`;

  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
      <h3 className="font-semibold text-[#0d5a75] mb-4">
        Ajouter à mon agenda
      </h3>
      <div className="space-y-3">
        <Button
          className="w-full bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
          onClick={handleDownloadIcs}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Télécharger .ics
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#0d5a75] text-[#0d5a75]"
          asChild
        >
          <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
            Ajouter à Google Calendar
          </a>
        </Button>
      </div>

      <hr className="my-6" />

      <h3 className="font-semibold text-[#0d5a75] mb-4">Partager</h3>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="border-gray-300"
          asChild
        >
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-4 h-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-300"
          asChild
        >
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-300"
          onClick={handleCopyLink}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <hr className="my-6" />

      <Button
        className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
        asChild
      >
        <a href="/billetterie">Réserver ma place</a>
      </Button>
    </div>
  );
}
