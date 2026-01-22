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
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface Exhibitor {
  id: string;
  name: string;
  category: string;
  boothNumber?: string;
  isActive: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  contactName?: string;
  contactEmail?: string;
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

  const handleStatusChange = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const response = await fetch(`/api/admin/exhibitors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, isActive: status === "APPROVED" }),
      });
      if (response.ok) {
        setExhibitors(exhibitors.map((e) => 
          e.id === id ? { ...e, status, isActive: status === "APPROVED" } : e
        ));
      }
    } catch (error) {
      console.error("Error updating exhibitor status:", error);
    }
  };

  const pendingExhibitors = exhibitors.filter((e) => e.status === "PENDING");
  const approvedExhibitors = exhibitors.filter((e) => e.status === "APPROVED" || !e.status);
  const rejectedExhibitors = exhibitors.filter((e) => e.status === "REJECTED");

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

        {/* Pending Submissions */}
        {pendingExhibitors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h2 className="font-semibold text-yellow-800">
                Candidatures en attente ({pendingExhibitors.length})
              </h2>
            </div>
            <div className="space-y-3">
              {pendingExhibitors.map((exhibitor) => (
                <div key={exhibitor.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{exhibitor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {exhibitor.category} • {exhibitor.contactEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusChange(exhibitor.id, "APPROVED")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approuver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusChange(exhibitor.id, "REJECTED")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Refuser
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/exhibitors/${exhibitor.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Exhibitors */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">
              Exposants approuvés ({approvedExhibitors.length})
            </h2>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : approvedExhibitors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aucun exposant approuvé</div>
          ) : (
            <div className="divide-y">
              {approvedExhibitors
                .filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((exhibitor) => (
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

        {/* Rejected Exhibitors */}
        {rejectedExhibitors.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b bg-red-50">
              <h2 className="font-semibold text-red-800">
                Candidatures refusées ({rejectedExhibitors.length})
              </h2>
            </div>
            <div className="divide-y">
              {rejectedExhibitors.map((exhibitor) => (
                <div key={exhibitor.id} className="p-4 hover:bg-gray-50 flex items-center gap-4 opacity-60">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{exhibitor.name}</h3>
                    <p className="text-sm text-gray-500">{exhibitor.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(exhibitor.id, "APPROVED")}
                    >
                      Réactiver
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
          </div>
        )}
      </div>
    </div>
  );
}
