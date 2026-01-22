"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
}

export default function NewSessionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "conference",
    theme: "ia",
    day: "1",
    startTime: "09:00",
    endTime: "10:00",
    room: "",
    capacity: "",
    speakerIds: [] as string[],
  });

  useEffect(() => {
    fetch("/api/admin/speakers")
      .then((res) => res.json())
      .then((data) => setSpeakers(data.speakers || []))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpeakerChange = (speakerId: string) => {
    setFormData((prev) => ({
      ...prev,
      speakerIds: prev.speakerIds.includes(speakerId)
        ? prev.speakerIds.filter((id) => id !== speakerId)
        : [...prev.speakerIds, speakerId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      router.push("/admin/sessions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/sessions" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#0d5a75]">Nouvelle Session</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Titre de la session *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d5a75]"
                required
              >
                <option value="keynote">Keynote</option>
                <option value="conference">Conférence</option>
                <option value="panel">Panel</option>
                <option value="atelier">Atelier</option>
                <option value="networking">Networking</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Thème *</Label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d5a75]"
                required
              >
                <option value="ia">Intelligence Artificielle</option>
                <option value="fintech">FinTech</option>
                <option value="sante">Santé & Tech</option>
                <option value="education">Éducation</option>
                <option value="agriculture">AgriTech</option>
                <option value="energie">Énergie</option>
                <option value="startup">Startups</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Jour *</Label>
              <select
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d5a75]"
                required
              >
                <option value="1">Jour 1 (15 Juin)</option>
                <option value="2">Jour 2 (16 Juin)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure début *</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure fin *</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
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
                placeholder="Ex: Salle A, Amphithéâtre..."
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
                placeholder="Nombre de places"
              />
            </div>
          </div>

          {speakers.length > 0 && (
            <div className="space-y-2">
              <Label>Speakers</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                {speakers.map((speaker) => (
                  <label key={speaker.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.speakerIds.includes(speaker.id)}
                      onChange={() => handleSpeakerChange(speaker.id)}
                      className="w-4 h-4 text-[#FF6B35] rounded"
                    />
                    <span className="text-sm">{speaker.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer la session"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
