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
  User,
} from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
}

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await fetch("/api/admin/speakers");
      const data = await response.json();
      setSpeakers(data.speakers || []);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce speaker ?")) return;

    try {
      await fetch(`/api/admin/speakers/${id}`, { method: "DELETE" });
      setSpeakers(speakers.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting speaker:", error);
    }
  };

  const filteredSpeakers = speakers.filter((speaker) =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0d5a75]">Gestion des Speakers</h1>
            <p className="text-gray-600">{speakers.length} speakers</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white" asChild>
            <Link href="/admin/speakers/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau speaker
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher un speaker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : filteredSpeakers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aucun speaker trouvé</div>
          ) : (
            <div className="divide-y">
              {filteredSpeakers.map((speaker) => (
                <div key={speaker.id} className="p-4 hover:bg-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0d5a75]/10 rounded-full flex items-center justify-center overflow-hidden">
                    {speaker.image ? (
                      <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-[#0d5a75]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{speaker.name}</h3>
                    <p className="text-sm text-gray-500">{speaker.role} - {speaker.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/speakers/${speaker.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(speaker.id)}
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
