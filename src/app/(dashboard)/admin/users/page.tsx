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
  Shield,
} from "lucide-react";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      ADMIN: { bg: "bg-red-100", text: "text-red-700", label: "Admin" },
      ORGANIZER: { bg: "bg-purple-100", text: "text-purple-700", label: "Organisateur" },
      SPEAKER: { bg: "bg-blue-100", text: "text-blue-700", label: "Speaker" },
      EXHIBITOR: { bg: "bg-orange-100", text: "text-orange-700", label: "Exposant" },
      PARTICIPANT: { bg: "bg-gray-100", text: "text-gray-700", label: "Participant" },
    };
    return badges[role] || badges.PARTICIPANT;
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-[#0d5a75]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0d5a75]">Gestion des Utilisateurs</h1>
            <p className="text-gray-600">{users.length} utilisateurs</p>
          </div>
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white" asChild>
            <Link href="/admin/users/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel utilisateur
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aucun utilisateur trouvé</div>
          ) : (
            <div className="divide-y">
              {filteredUsers.map((user) => {
                const badge = getRoleBadge(user.role);
                return (
                  <div key={user.id} className="p-4 hover:bg-gray-50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0d5a75]/10 rounded-full flex items-center justify-center">
                      {user.role === "ADMIN" ? (
                        <Shield className="w-6 h-6 text-[#0d5a75]" />
                      ) : (
                        <User className="w-6 h-6 text-[#0d5a75]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <span className={`px-2 py-0.5 ${badge.bg} ${badge.text} text-xs rounded`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
