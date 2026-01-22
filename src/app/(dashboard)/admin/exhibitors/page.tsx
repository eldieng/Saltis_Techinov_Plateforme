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
  Building,
} from "lucide-react";

interface Exhibitor {
  id: string;
  name: string;
  category: string;
  boothNumber?: string;
  isActive: boolean;
}

export default function AdminExhibitorsPage() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      const response = await fetch("/api/admin/exhibitors");
      const data = await response.json();
      setExhibitors(data.exhibitors || []);
    } catch (error) {
      console.error("Error fetching exhibitors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet exposant ?")) return;

    try {
      await fetch(`/api/admin/exhibitors/${id}`, { method: "DELETE" });
      setExhibitors(exhibitors.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting exhibitor:", error);
    }
  };

  const filteredExhibitors = exhibitors.filter((exhibitor) =>
    exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0d5a75]">Gestion des Exposants</h1>
            <p className="text-gray-600">{exhibitors.length} exposants</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white" asChild>
            <Link href="/admin/exhibitors/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel exposant
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher un exposant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : filteredExhibitors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aucun exposant trouvé</div>
          ) : (
            <div className="divide-y">
              {filteredExhibitors.map((exhibitor) => (
                <div key={exhibitor.id} className="p-4 hover:bg-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{exhibitor.name}</h3>
                      {!exhibitor.isActive && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Inactif</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {exhibitor.category}
                      {exhibitor.boothNumber && ` • Stand ${exhibitor.boothNumber}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/exhibitors/${exhibitor.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(exhibitor.id)}
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
