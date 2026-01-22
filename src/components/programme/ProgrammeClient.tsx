"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ChevronRight, Sparkles, Filter, ArrowRight, X } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  type: string;
  theme: string;
  day: 1 | 2;
  startTime: string;
  endTime: string;
  room: string;
  capacity?: number | null;
  isBreak?: boolean;
  speakers: Speaker[];
}

interface ProgrammeClientProps {
  sessions: Session[];
}

const sessionTypeLabels: Record<string, string> = {
  keynote: "Keynote",
  panel: "Panel",
  conference: "Conférence",
  atelier: "Atelier",
  networking: "Networking",
  ceremonie: "Cérémonie",
  competition: "Compétition",
  pause: "Pause",
};

const sessionThemeLabels: Record<string, string> = {
  ia: "Intelligence Artificielle",
  fintech: "FinTech",
  sante: "Santé & Tech",
  education: "Éducation",
  startup: "Startups",
  gouvernance: "Gouvernance",
  general: "Général",
  agriculture: "AgriTech",
  energie: "Énergie",
};

const typeColors: Record<string, string> = {
  keynote: "bg-purple-100 text-purple-700",
  panel: "bg-blue-100 text-blue-700",
  conference: "bg-green-100 text-green-700",
  atelier: "bg-orange-100 text-orange-700",
  networking: "bg-pink-100 text-pink-700",
  ceremonie: "bg-yellow-100 text-yellow-700",
  competition: "bg-red-100 text-red-700",
  pause: "bg-gray-100 text-gray-700",
};

export function ProgrammeClient({ sessions }: ProgrammeClientProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");

  const day1Sessions = useMemo(() => {
    return sessions
      .filter((s) => s.day === 1)
      .filter((s) => selectedType === "all" || s.type === selectedType)
      .filter((s) => selectedTheme === "all" || s.theme === selectedTheme);
  }, [sessions, selectedType, selectedTheme]);

  const day2Sessions = useMemo(() => {
    return sessions
      .filter((s) => s.day === 2)
      .filter((s) => selectedType === "all" || s.type === selectedType)
      .filter((s) => selectedTheme === "all" || s.theme === selectedTheme);
  }, [sessions, selectedType, selectedTheme]);

  const uniqueTypes = [...new Set(sessions.map((s) => s.type))];
  const uniqueThemes = [...new Set(sessions.map((s) => s.theme))];

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedTheme("all");
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Modern Gradient */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">15-16 Juin 2025 • Dakar</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Programme{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                SALTIS 2025
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Deux jours de conférences, panels, ateliers et networking pour
              explorer l&apos;avenir de la technologie en Afrique.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-white font-medium">2 jours</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <Clock className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-white font-medium">{sessions.length} sessions</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10">
                <MapPin className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-white font-medium">Musée des Civilisations Noires</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters - Modern Card */}
          <div className="bg-white rounded-2xl p-6 mb-10 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-[#0d5a75]" />
              <h3 className="font-semibold text-gray-900">Filtrer les sessions</h3>
              {(selectedType !== "all" || selectedTheme !== "all") && (
                <button
                  onClick={resetFilters}
                  className="ml-auto flex items-center gap-1 text-sm text-[#FF6B35] hover:underline"
                >
                  <X className="w-4 h-4" />
                  Réinitialiser
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Type de session
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0d5a75] focus:border-transparent transition-all"
                >
                  <option value="all">Tous les types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {sessionTypeLabels[type] || type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Thème
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0d5a75] focus:border-transparent transition-all"
                >
                  <option value="all">Tous les thèmes</option>
                  {uniqueThemes.map((theme) => (
                    <option key={theme} value={theme}>
                      {sessionThemeLabels[theme] || theme}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Programme à venir
              </h3>
              <p className="text-gray-500">
                Le programme sera bientôt disponible. Revenez plus tard !
              </p>
            </div>
          ) : (
            <Tabs defaultValue="jour1" className="w-full">
              <TabsList className="bg-white mb-8">
                <TabsTrigger
                  value="jour1"
                  className="data-[state=active]:bg-[#0d5a75] data-[state=active]:text-white"
                >
                  Jour 1 - 15 Juin ({day1Sessions.length})
                </TabsTrigger>
                <TabsTrigger
                  value="jour2"
                  className="data-[state=active]:bg-[#0d5a75] data-[state=active]:text-white"
                >
                  Jour 2 - 16 Juin ({day2Sessions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jour1" className="space-y-4">
                {day1Sessions.length > 0 ? (
                  day1Sessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Aucune session ne correspond à vos critères.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="jour2" className="space-y-4">
                {day2Sessions.length > 0 ? (
                  day2Sessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Aucune session ne correspond à vos critères.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* CTA - Modern */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ne manquez aucune session
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
            Réservez votre place maintenant et accédez à l&apos;ensemble du
            programme SALTIS TechInov 2025.
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white shadow-lg shadow-orange-500/25"
            asChild
          >
            <a href="/billetterie">
              Réserver ma place
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  return (
    <Link
      href={`/programme/${session.id}`}
      className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Time */}
        <div className="md:w-32 flex-shrink-0">
          <div className="flex items-center text-[#0d5a75] font-semibold">
            <Clock className="w-4 h-4 mr-2" />
            {session.startTime}
          </div>
          <div className="text-sm text-gray-500 ml-6">
            → {session.endTime}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                typeColors[session.type] || "bg-gray-100 text-gray-700"
              }`}
            >
              {sessionTypeLabels[session.type] || session.type}
            </span>
            <span className="px-2 py-0.5 bg-[#0d5a75]/10 text-[#0d5a75] rounded text-xs font-medium">
              {sessionThemeLabels[session.theme] || session.theme}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0d5a75]">
            {session.title}
          </h3>

          {session.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {session.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {session.room}
            </div>
            {session.capacity && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {session.capacity} places
              </div>
            )}
          </div>

          {session.speakers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {session.speakers.map((speaker) => (
                <span
                  key={speaker.id}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {speaker.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </Link>
  );
}
