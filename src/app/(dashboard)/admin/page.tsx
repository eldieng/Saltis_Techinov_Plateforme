import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Users,
  Ticket,
  CreditCard,
  TrendingUp,
  QrCode,
  Calendar,
  Settings,
  BarChart3,
  Mic,
  Building,
  FileText,
  CalendarDays,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Check if user is admin
  if (session.user.role !== "ADMIN" && session.user.role !== "ORGANIZER") {
    redirect("/dashboard");
  }

  // Get statistics
  const [
    totalOrders,
    confirmedOrders,
    totalRevenue,
    totalTickets,
    usedTickets,
    totalUsers,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "CONFIRMED" } }),
    prisma.order.aggregate({
      where: { status: "CONFIRMED" },
      _sum: { total: true },
    }),
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: "USED" } }),
    prisma.user.count(),
  ]);

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      items: {
        include: { pass: true },
      },
    },
  });

  // Get pass sales
  const passSales = await prisma.pass.findMany({
    include: {
      _count: {
        select: { tickets: true },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a75]">
              Administration SALTIS
            </h1>
            <p className="text-gray-600">
              Tableau de bord organisateur
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/checkin">
                <QrCode className="w-4 h-4 mr-2" />
                Check-in
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenus totaux</p>
                <p className="text-2xl font-bold text-[#0d5a75]">
                  {(totalRevenue._sum.total || 0).toLocaleString()} FCFA
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {confirmedOrders} commandes confirmées
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Billets vendus</p>
                <p className="text-2xl font-bold text-[#FF6B35]">
                  {totalTickets}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-[#FF6B35]" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {usedTickets} check-ins effectués
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Commandes</p>
                <p className="text-2xl font-bold text-[#0d5a75]">
                  {totalOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#0d5a75]/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#0d5a75]" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {confirmedOrders} confirmées
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Utilisateurs</p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Comptes créés
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pass Sales */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[#0d5a75] mb-6">
              Ventes par Pass
            </h2>
            <div className="space-y-4">
              {passSales.map((pass) => (
                <div key={pass.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0d5a75]/10 rounded-lg flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-[#0d5a75]" />
                    </div>
                    <div>
                      <p className="font-medium">{pass.name}</p>
                      <p className="text-sm text-gray-500">
                        {pass.price.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#0d5a75]">
                      {pass._count.tickets}
                    </p>
                    <p className="text-xs text-gray-500">vendus</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#0d5a75]">
                Commandes récentes
              </h2>
              <Link
                href="/admin/orders"
                className="text-[#FF6B35] text-sm hover:underline"
              >
                Voir tout →
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">
                      {order.customerFirstName} {order.customerLastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      {order.total.toLocaleString()} FCFA
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        order.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status === "CONFIRMED"
                        ? "Confirmée"
                        : order.status === "PENDING"
                        ? "En attente"
                        : "Annulée"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions - Content Management */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#0d5a75] mb-4">
            Gestion du contenu
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href="/admin/sessions"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#0d5a75]/10 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-[#0d5a75]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Programme</p>
                <p className="text-xs text-gray-500">Sessions & ateliers</p>
              </div>
            </Link>

            <Link
              href="/admin/speakers"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Speakers</p>
                <p className="text-xs text-gray-500">Intervenants</p>
              </div>
            </Link>

            <Link
              href="/admin/exhibitors"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Exposants</p>
                <p className="text-xs text-gray-500">Partenaires & stands</p>
              </div>
            </Link>

            <Link
              href="/admin/blog"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Blog</p>
                <p className="text-xs text-gray-500">Articles & actualités</p>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Utilisateurs</p>
                <p className="text-xs text-gray-500">Comptes & rôles</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Event Info */}
        <div className="mt-8 bg-gradient-to-r from-[#0d5a75] to-[#0d5a75]/80 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-10 h-10" />
              <div>
                <h3 className="text-xl font-semibold">SALTIS TechInov 2025</h3>
                <p className="text-white/80">
                  15-16 Juin 2025 • Musée des Civilisations Noires
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/admin/checkin">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scanner QR
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
