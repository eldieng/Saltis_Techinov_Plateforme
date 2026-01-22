"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  QrCode,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Loader2,
  UserPlus,
  Users,
  Ticket,
  Mic,
  Building2,
  User,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { QRScanner } from "@/components/checkin/QRScanner";

interface SearchResult {
  id: string;
  type: "ticket" | "speaker" | "visitor" | "user" | "exhibitor";
  name: string;
  email: string | null;
  phone: string | null;
  details: string;
  status: string | null;
  checkedIn: boolean;
  checkedInAt: string | null;
}

type TabType = "search" | "scan" | "register";

export default function CheckinPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const isHostess = session?.user?.role === "HOSTESS";

  // Registration form
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  // Debounced auto-search
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/checkin/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch {
      setMessage({ type: "error", text: "Erreur lors de la recherche" });
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Auto-search with debounce when typing
  useEffect(() => {
    if (activeTab !== "search") return;
    
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeTab, performSearch]);

  const handleSearch = async () => {
    performSearch(searchQuery);
  };

  const handleCheckinTicket = async (ticketId: string) => {
    setIsCheckingIn(ticketId);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/checkin/ticket/${ticketId}`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Check-in réussi !" });
        // Remove from list after check-in
        setSearchResults((prev) => prev.filter((r) => r.id !== ticketId));
      } else {
        setMessage({ type: "error", text: data.error || "Erreur lors du check-in" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setIsCheckingIn(null);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/checkin/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: `${registerForm.firstName} ${registerForm.lastName} enregistré avec succès !` });
        setRegisterForm({ firstName: "", lastName: "", email: "", phone: "", organization: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Erreur lors de l'enregistrement" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setIsRegistering(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ticket":
        return <Ticket className="w-5 h-5 text-blue-500" />;
      case "user":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "speaker":
        return <Mic className="w-5 h-5 text-purple-500" />;
      case "exhibitor":
        return <Building2 className="w-5 h-5 text-orange-500" />;
      case "visitor":
        return <Users className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ticket":
        return "Participant";
      case "user":
        return "Inscrit";
      case "speaker":
        return "Speaker";
      case "exhibitor":
        return "Exposant";
      case "visitor":
        return "Visiteur";
      default:
        return type;
    }
  };

  const handleCheckinSpeakerOrExhibitor = async (id: string, type: "speaker" | "exhibitor") => {
    setIsCheckingIn(id);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/checkin/${type}/${id}`, {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: `${type === "speaker" ? "Speaker" : "Exposant"} marqué présent !` });
        // Remove from list after check-in
        setSearchResults((prev) => prev.filter((r) => r.id !== id));
      } else {
        setMessage({ type: "error", text: data.error || "Erreur lors du check-in" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setIsCheckingIn(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {!isHostess && (
              <Link href="/admin" className="text-gray-500 hover:text-saltis-primary">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <div>
              <h1 className="text-2xl font-bold text-saltis-primary">Accueil & Check-in</h1>
              <p className="text-gray-600">
                {isHostess && session?.user?.name && `Bienvenue, ${session.user.name} • `}
                Rechercher ou enregistrer les participants
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isHostess ? (
              <>
                <Link href="/dashboard/profile">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Mon profil
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link href="/admin/visitors">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Voir tous les visiteurs
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`max-w-2xl mx-auto mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === "search"
                  ? "bg-[#0d5a75] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Search className="w-5 h-5" />
              Rechercher
            </button>
            <button
              onClick={() => setActiveTab("scan")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === "scan"
                  ? "bg-[#0d5a75] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <QrCode className="w-5 h-5" />
              Scanner
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === "register"
                  ? "bg-[#0d5a75] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Nouveau visiteur
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Search Tab */}
          {activeTab === "search" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <QrCode className="w-6 h-6 text-[#0d5a75]" />
                <h2 className="text-lg font-semibold text-[#0d5a75]">
                  Rechercher un participant
                </h2>
              </div>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Nom, email ou numéro de billet..."
                    className="pl-10 h-12"
                    autoFocus
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-12 px-6 bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                  disabled={isSearching || searchQuery.length < 2}
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Rechercher"}
                </Button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">{searchResults.length} résultat(s)</p>
                  {searchResults.map((result) => (
                    <div
                      key={`${result.type}-${result.id}`}
                      className={`p-4 rounded-lg border ${
                        result.checkedIn ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getTypeIcon(result.type)}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{result.name}</span>
                              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                                {getTypeLabel(result.type)}
                              </span>
                              {result.checkedIn && (
                                <span className="text-xs px-2 py-0.5 bg-green-200 text-green-700 rounded-full">
                                  ✓ Présent
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{result.details}</p>
                            {result.email && (
                              <p className="text-sm text-gray-400">{result.email}</p>
                            )}
                            {result.checkedInAt && (
                              <p className="text-xs text-green-600 mt-1">
                                Check-in: {new Date(result.checkedInAt).toLocaleString("fr-FR")}
                              </p>
                            )}
                          </div>
                        </div>
                        {!result.checkedIn && (result.type === "ticket" || result.type === "speaker" || result.type === "exhibitor") && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              if (result.type === "ticket") {
                                handleCheckinTicket(result.id);
                              } else if (result.type === "speaker" || result.type === "exhibitor") {
                                handleCheckinSpeakerOrExhibitor(result.id, result.type);
                              }
                            }}
                            disabled={isCheckingIn === result.id}
                          >
                            {isCheckingIn === result.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Présent
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucun résultat trouvé</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Essayez avec un autre terme ou enregistrez un nouveau visiteur
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("register")}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Enregistrer un visiteur
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Scan Tab */}
          {activeTab === "scan" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <QrCode className="w-6 h-6 text-[#0d5a75]" />
                <h2 className="text-lg font-semibold text-[#0d5a75]">
                  Scanner un QR code
                </h2>
              </div>

              <QRScanner
                onScan={async (qrCode) => {
                  try {
                    const response = await fetch("/api/checkin", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ qrCode }),
                    });
                    const data = await response.json();

                    if (response.ok && data.success) {
                      return {
                        success: true,
                        message: `✓ ${data.ticket?.holderName || "Participant"} - Check-in réussi !`,
                      };
                    } else {
                      return {
                        success: false,
                        message: data.error || "Erreur lors du check-in",
                      };
                    }
                  } catch {
                    return {
                      success: false,
                      message: "Erreur de connexion",
                    };
                  }
                }}
              />

              <p className="text-sm text-gray-500 text-center mt-4">
                Pointez la caméra vers le QR code du billet
              </p>
            </div>
          )}

          {/* Register Tab */}
          {activeTab === "register" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-6 h-6 text-[#0d5a75]" />
                <h2 className="text-lg font-semibold text-[#0d5a75]">
                  Enregistrer un nouveau visiteur
                </h2>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+221 77 123 45 67"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organisation</Label>
                    <Input
                      id="organization"
                      value={registerForm.organization}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, organization: e.target.value }))}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white text-lg"
                  disabled={isRegistering}
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Enregistrer le visiteur
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Instructions</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Rechercher</strong> : Pour les participants/speakers déjà inscrits</li>
              <li>• <strong>Scanner</strong> : Pour scanner le QR code d&apos;un billet</li>
              <li>• <strong>Nouveau visiteur</strong> : Pour enregistrer une personne non inscrite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
