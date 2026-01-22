"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

interface Session {
  id: string;
  title: string;
  type: string;
  theme: string;
  day: number;
  startTime: string;
  endTime: string;
  room: string;
  speakers: { speaker: { id: string; name: string } }[];
}

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/admin/sessions");
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) return;

    try {
      await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" });
      setSessions(sessions.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      keynote: "Keynote",
      panel: "Panel",
      atelier: "Atelier",
      conference: "Conférence",
      networking: "Networking",
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0d5a75]">
              Gestion du Programme
            </h1>
            <p className="text-gray-600">{sessions.length} sessions</p>
          </div>
          <Button
            className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
            asChild
          >
            <Link href="/admin/sessions/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle session
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher une session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucune session trouvée
            </div>
          ) : (
            <div className="divide-y">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 hover:bg-gray-50 flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#0d5a75]/10 text-[#0d5a75] text-xs rounded">
                        {getTypeLabel(session.type)}
                      </span>
                      <span className="px-2 py-0.5 bg-[#FF6B35]/10 text-[#FF6B35] text-xs rounded">
                        Jour {session.day}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900">
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.startTime} - {session.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {session.room}
                      </span>
                    </div>
                    {session.speakers.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Speakers:{" "}
                        {session.speakers
                          .map((s) => s.speaker.name)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/sessions/${session.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(session.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
