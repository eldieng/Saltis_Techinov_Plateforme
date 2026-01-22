import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DownloadTicketsButton } from "@/components/tickets/DownloadButton";
import {
  CheckCircle,
  Mail,
  Calendar,
  MapPin,
  Ticket,
  ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderNumber } = await params;
  return {
    title: `Confirmation - ${orderNumber}`,
    description: "Votre réservation SALTIS TechInov 2025 est confirmée",
  };
}

export default async function ConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          pass: true,
        },
      },
      tickets: {
        include: {
          pass: true,
        },
      },
      event: true,
    },
  });

  if (!order) {
    notFound();
  }

  const isConfirmed = order.status === "CONFIRMED";

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Status Header */}
          <div className="text-center mb-8">
            {isConfirmed ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-[#0d5a75] mb-2">
                  Réservation confirmée !
                </h1>
                <p className="text-gray-600">
                  Votre commande <strong>{order.orderNumber}</strong> a été
                  confirmée avec succès.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-10 h-10 text-yellow-500" />
                </div>
                <h1 className="text-3xl font-bold text-[#0d5a75] mb-2">
                  Commande en attente
                </h1>
                <p className="text-gray-600">
                  Votre commande <strong>{order.orderNumber}</strong> est en
                  attente de paiement.
                </p>
              </>
            )}
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#0d5a75] mb-4">
              Détails de la commande
            </h2>

            <div className="space-y-4">
              {/* Event Info */}
              <div className="flex items-start space-x-3 pb-4 border-b">
                <Calendar className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {order.event?.name || "SALTIS TechInov 2025"}
                  </p>
                  <p className="text-sm text-gray-500">15-16 Juin 2025</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pb-4 border-b">
                <MapPin className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    Musée des Civilisations Noires
                  </p>
                  <p className="text-sm text-gray-500">
                    Place de la Nation, Dakar, Sénégal
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex items-start space-x-3 pb-4 border-b">
                <Mail className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {order.customerFirstName} {order.customerLastName}
                  </p>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Articles commandés</p>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{item.pass.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">
                      {item.total.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-semibold text-[#0d5a75]">
                  Total payé
                </span>
                <span className="text-2xl font-bold text-[#FF6B35]">
                  {order.total.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>

          {/* Tickets */}
          {isConfirmed && order.tickets.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-[#0d5a75] mb-4">
                Vos billets ({order.tickets.length})
              </h2>

              <div className="space-y-4">
                {order.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4"
                  >
                    {/* QR Code */}
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {ticket.qrCodeUrl ? (
                        <Image
                          src={ticket.qrCodeUrl}
                          alt={`QR Code - ${ticket.ticketNumber}`}
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div className="text-center text-gray-400 text-xs p-2">
                          QR Code en cours de génération
                        </div>
                      )}
                    </div>

                    {/* Ticket Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-semibold text-[#0d5a75]">
                        {ticket.pass.name}
                      </p>
                      <p className="text-sm text-gray-500 font-mono">
                        {ticket.ticketNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {ticket.holderFirstName} {ticket.holderLastName}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
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
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <DownloadTicketsButton 
                  ticketIds={order.tickets.map(t => t.id)}
                  className="flex-1 bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white"
                />
                <Button
                  variant="outline"
                  className="flex-1 border-[#0d5a75] text-[#0d5a75]"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Renvoyer par email
                </Button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">
              Informations importantes
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • Présentez votre QR code à l&apos;entrée de l&apos;événement
              </li>
              <li>• Un email de confirmation a été envoyé à {order.customerEmail}</li>
              <li>• Conservez votre numéro de commande : {order.orderNumber}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              asChild
            >
              <Link href="/programme">
                <Calendar className="w-4 h-4 mr-2" />
                Voir le programme
              </Link>
            </Button>
            <Button
              className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
