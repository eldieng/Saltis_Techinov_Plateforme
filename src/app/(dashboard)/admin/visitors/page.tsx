"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Loader2,
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  Download,
} from "lucide-react";

interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  organization: string | null;
  source: string;
  checkedInAt: string;
  checkedInBy: string | null;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchVisitors();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredVisitors(visitors);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredVisitors(
        visitors.filter(
          (v) =>
            v.firstName.toLowerCase().includes(query) ||
            v.lastName.toLowerCase().includes(query) ||
            v.email.toLowerCase().includes(query) ||
            v.organization?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, visitors]);

  const fetchVisitors = async () => {
    try {
      const response = await fetch("/api/admin/checkin/visitor?limit=500");
      const data = await response.json();
      setVisitors(data.visitors || []);
      setFilteredVisitors(data.visitors || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Prénom", "Nom", "Email", "Téléphone", "Organisation", "Date d'arrivée"];
    const rows = visitors.map((v) => [
      v.firstName,
      v.lastName,
      v.email,
      v.phone || "",
      v.organization || "",
      new Date(v.checkedInAt).toLocaleString("fr-FR"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visiteurs_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/checkin" className="text-gray-500 hover:text-saltis-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-saltis-primary">Visiteurs enregistrés</h1>
              <p className="text-gray-600">{total} visiteur(s) au total</p>
            </div>
          </div>
          <Button
            onClick={exportCSV}
            variant="outline"
            className="flex items-center gap-2"
            disabled={visitors.length === 0}
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, email ou organisation..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Visitors List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-saltis-primary" />
            </div>
          ) : filteredVisitors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchQuery ? "Aucun visiteur trouvé" : "Aucun visiteur enregistré"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-saltis-primary/10 flex items-center justify-center text-saltis-primary font-semibold">
                        {visitor.firstName[0]}{visitor.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {visitor.firstName} {visitor.lastName}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {visitor.email}
                          </span>
                          {visitor.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {visitor.phone}
                            </span>
                          )}
                          {visitor.organization && (
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {visitor.organization}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(visitor.checkedInAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full mt-1 inline-block">
                        {visitor.source}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {visitors.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-saltis-primary">{total}</p>
              <p className="text-sm text-gray-500">Total visiteurs</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {visitors.filter((v) => v.source === "walk-in").length}
              </p>
              <p className="text-sm text-gray-500">Walk-in</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {visitors.filter((v) => v.organization).length}
              </p>
              <p className="text-sm text-gray-500">Avec organisation</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {new Set(visitors.map((v) => v.organization).filter(Boolean)).size}
              </p>
              <p className="text-sm text-gray-500">Organisations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
