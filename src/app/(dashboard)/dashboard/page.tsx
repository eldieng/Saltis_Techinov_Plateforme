import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  Calendar,
  User,
  Settings,
  LogOut,
  QrCode,
  ArrowRight,
  Shield,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Redirect HOSTESS to check-in page - they don't need the full dashboard
  if (session.user.role === "HOSTESS") {
    redirect("/admin/checkin");
  }

  // Get user's tickets
  const tickets = await prisma.ticket.findMany({
    where: { userId: session.user.id },
    include: {
      pass: true,
      order: {
        select: {
          orderNumber: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get user's orders
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { pass: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const validTickets = tickets.filter((t) => t.status === "VALID");

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a75]">
              Bienvenue, {session.user.name}
            </h1>
            <p className="text-gray-600">
              Gérez vos billets et votre profil SALTIS TechInov
            </p>
          </div>
          <div className="flex gap-3">
            {(session.user.role === "ADMIN" || session.user.role === "ORGANIZER") && (
              <Button className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white" asChild>
                <Link href="/admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Administration
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              asChild
            >
              <Link href="/api/auth/signout">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Billets valides</p>
                <p className="text-3xl font-bold text-[#0d5a75]">
                  {validTickets.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#0d5a75]/10 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-[#0d5a75]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Commandes</p>
                <p className="text-3xl font-bold text-[#FF6B35]">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#FF6B35]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Événement</p>
                <p className="text-lg font-bold text-[#0d5a75]">
                  15-16 Juin 2025
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Tickets */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#0d5a75]">
                Mes Billets
              </h2>
              <Link
                href="/dashboard/tickets"
                className="text-[#FF6B35] text-sm hover:underline"
              >
                Voir tout →
              </Link>
            </div>

            {tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.slice(0, 3).map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0d5a75] rounded-lg flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {ticket.pass.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ticket.ticketNumber}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "VALID"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "USED"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ticket.status === "VALID"
                        ? "Valide"
                        : ticket.status === "USED"
                        ? "Utilisé"
                        : "Annulé"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  Vous n&apos;avez pas encore de billets
                </p>
                <Button
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                  asChild
                >
                  <Link href="/billetterie">
                    Réserver maintenant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#0d5a75]">
                Commandes récentes
              </h2>
              <Link
                href="/dashboard/orders"
                className="text-[#FF6B35] text-sm hover:underline"
              >
                Voir tout →
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/billetterie/confirmation/${order.orderNumber}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.map((i) => i.pass.name).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#0d5a75]">
                        {order.total.toLocaleString()} FCFA
                      </p>
                      <span
                        className={`text-xs ${
                          order.status === "CONFIRMED"
                            ? "text-green-600"
                            : order.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status === "CONFIRMED"
                          ? "Confirmée"
                          : order.status === "PENDING"
                          ? "En attente"
                          : "Annulée"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucune commande</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-[#0d5a75] to-[#0d5a75]/80 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">
                SALTIS TechInov 2025
              </h3>
              <p className="text-white/80">
                15-16 Juin 2025 • Musée des Civilisations Noires, Dakar
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/programme">Voir le programme</Link>
              </Button>
              <Button
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                asChild
              >
                <Link href="/billetterie">Réserver</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
