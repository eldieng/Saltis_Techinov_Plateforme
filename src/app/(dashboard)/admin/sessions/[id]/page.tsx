"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, X } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditSessionPage({ params }: Props) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [allSpeakers, setAllSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "conference",
    theme: "general",
    day: 1,
    startTime: "",
    endTime: "",
    room: "",
    capacity: "",
    isBreak: false,
  });

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetchSession(p.id);
      fetchSpeakers();
    });
  }, [params]);

  const fetchSpeakers = async () => {
    try {
      const response = await fetch("/api/admin/speakers");
      if (response.ok) {
        const data = await response.json();
        setAllSpeakers(data.speakers || []);
      }
    } catch (err) {
      console.error("Error fetching speakers:", err);
    }
  };

  const fetchSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/admin/sessions/${sessionId}`);
      if (!response.ok) throw new Error("Session non trouvée");
      const data = await response.json();
      setFormData({
        title: data.session.title || "",
        description: data.session.description || "",
        type: data.session.type || "conference",
        theme: data.session.theme || "general",
        day: data.session.day || 1,
        startTime: data.session.startTime || "",
        endTime: data.session.endTime || "",
        room: data.session.room || "",
        capacity: data.session.capacity?.toString() || "",
        isBreak: data.session.isBreak || false,
      });
      // Set existing speakers
      if (data.session.speakers) {
        setSelectedSpeakerIds(data.session.speakers.map((s: { speakerId: string }) => s.speakerId));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddSpeaker = (speakerId: string) => {
    if (!selectedSpeakerIds.includes(speakerId)) {
      setSelectedSpeakerIds([...selectedSpeakerIds, speakerId]);
    }
  };

  const handleRemoveSpeaker = (speakerId: string) => {
    setSelectedSpeakerIds(selectedSpeakerIds.filter((id) => id !== speakerId));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/sessions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          day: parseInt(formData.day.toString()),
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          speakerIds: selectedSpeakerIds,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la modification");
      }

      router.push("/admin/sessions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d5a75]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/sessions" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#0d5a75]">Modifier la Session</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="keynote">Keynote</option>
                <option value="panel">Panel</option>
                <option value="conference">Conférence</option>
                <option value="atelier">Atelier</option>
                <option value="networking">Networking</option>
                <option value="ceremonie">Cérémonie</option>
                <option value="competition">Compétition</option>
                <option value="pause">Pause</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Thème *</Label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="ia">Intelligence Artificielle</option>
                <option value="fintech">FinTech</option>
                <option value="sante">Santé & Tech</option>
                <option value="education">Éducation</option>
                <option value="startup">Startups</option>
                <option value="gouvernance">Gouvernance</option>
                <option value="general">Général</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Jour *</Label>
              <select
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value={1}>Jour 1 - 15 Juin</option>
                <option value={2}>Jour 2 - 16 Juin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure début *</Label>
              <Input
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="09:00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure fin *</Label>
              <Input
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="10:00"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="room">Salle *</Label>
              <Input
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isBreak"
              name="isBreak"
              checked={formData.isBreak}
              onChange={handleChange}
            />
            <Label htmlFor="isBreak">Pause (non comptée comme session)</Label>
          </div>

          {/* Speakers Selection */}
          <div className="space-y-2">
            <Label>Speakers</Label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddSpeaker(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Ajouter un speaker...</option>
              {allSpeakers
                .filter((s) => !selectedSpeakerIds.includes(s.id))
                .map((speaker) => (
                  <option key={speaker.id} value={speaker.id}>
                    {speaker.name} - {speaker.role || speaker.company}
                  </option>
                ))}
            </select>
            {selectedSpeakerIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSpeakerIds.map((speakerId) => {
                  const speaker = allSpeakers.find((s) => s.id === speakerId);
                  return speaker ? (
                    <div
                      key={speakerId}
                      className="flex items-center gap-2 bg-[#0d5a75]/10 text-[#0d5a75] px-3 py-1.5 rounded-full text-sm"
                    >
                      <span>{speaker.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpeaker(speakerId)}
                        className="hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les modifications"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
