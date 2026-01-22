"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Settings,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Phone,
  Save,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [eventSettings, setEventSettings] = useState({
    name: "SALTIS TechInov 2025",
    description: "Le plus grand Salon de l'Intelligence Artificielle en Afrique de l'Ouest",
    startDate: "2025-06-15",
    endDate: "2025-06-16",
    venue: "Musée des Civilisations Noires",
    address: "Dakar, Sénégal",
    website: "https://saltis-techinov.org",
    email: "info@saltis-techinov.org",
    phone: "+221 77 222 18 85",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    // Simulate save - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Paramètres enregistrés avec succès" });
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-[#0d5a75]">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0d5a75]">Paramètres</h1>
              <p className="text-gray-600">Configuration de l&apos;événement</p>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`max-w-3xl mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            {message.text}
          </div>
        )}

        <div className="max-w-3xl space-y-6">
          {/* Event Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-[#0d5a75]" />
              <h2 className="text-lg font-semibold text-[#0d5a75]">
                Informations de l&apos;événement
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l&apos;événement</Label>
                <Input
                  id="name"
                  name="name"
                  value={eventSettings.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={eventSettings.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d5a75]/20 focus:border-[#0d5a75]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={eventSettings.startDate}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={eventSettings.endDate}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-[#0d5a75]" />
              <h2 className="text-lg font-semibold text-[#0d5a75]">Lieu</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Nom du lieu</Label>
                <Input
                  id="venue"
                  name="venue"
                  value={eventSettings.venue}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  value={eventSettings.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-[#0d5a75]" />
              <h2 className="text-lg font-semibold text-[#0d5a75]">Contact</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={eventSettings.website}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={eventSettings.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={eventSettings.phone}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les paramètres
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
