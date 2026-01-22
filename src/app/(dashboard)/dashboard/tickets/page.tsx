import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DownloadTicketButton } from "@/components/tickets/DownloadButton";
import {
  Ticket,
  ArrowLeft,
  Calendar,
  MapPin,
} from "lucide-react";

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

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

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="text-gray-500 hover:text-[#0d5a75]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0d5a75]">Mes Billets</h1>
            <p className="text-gray-600">
              {tickets.length} billet{tickets.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Ticket Header */}
                <div className="bg-[#0d5a75] p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-white/70">SALTIS TechInov 2025</p>
                      <h3 className="text-lg font-semibold">{ticket.pass.name}</h3>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.status === "VALID"
                          ? "bg-green-500"
                          : ticket.status === "USED"
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                    >
                      {ticket.status === "VALID"
                        ? "Valide"
                        : ticket.status === "USED"
                        ? "Utilisé"
                        : "Annulé"}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="p-6 flex justify-center bg-white">
                  {ticket.qrCodeUrl ? (
                    <Image
                      src={ticket.qrCodeUrl}
                      alt={`QR Code - ${ticket.ticketNumber}`}
                      width={180}
                      height={180}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-sm text-center px-4">
                        QR Code en cours de génération
                      </p>
                    </div>
                  )}
                </div>

                {/* Ticket Info */}
                <div className="px-6 pb-6 space-y-3">
                  <div className="text-center border-t border-dashed pt-4">
                    <p className="font-mono text-sm text-gray-500">
                      {ticket.ticketNumber}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#FF6B35]" />
                      <span>15-16 Juin 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#FF6B35]" />
                      <span>Musée des Civilisations Noires</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-500">Titulaire</p>
                    <p className="font-medium">
                      {ticket.holderFirstName} {ticket.holderLastName}
                    </p>
                  </div>

                  <DownloadTicketButton
                    ticketId={ticket.id}
                    className="w-full mt-4 border-[#0d5a75] text-[#0d5a75]"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun billet
            </h2>
            <p className="text-gray-500 mb-6">
              Vous n&apos;avez pas encore de billets pour SALTIS TechInov 2025
            </p>
            <Button
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              asChild
            >
              <Link href="/billetterie">Réserver maintenant</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
