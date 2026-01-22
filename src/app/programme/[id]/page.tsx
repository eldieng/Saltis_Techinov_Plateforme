import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  ArrowLeft,
  Linkedin,
  Twitter,
} from "lucide-react";
import { prisma } from "@/lib/db";

const sessionTypeLabels: Record<string, string> = {
  keynote: "Keynote",
  panel: "Panel",
  conference: "Conférence",
  atelier: "Atelier",
  networking: "Networking",
  ceremonie: "Cérémonie",
  competition: "Compétition",
  pause: "Pause",
};

const sessionTypeColors: Record<string, string> = {
  keynote: "bg-purple-100 text-purple-700",
  panel: "bg-blue-100 text-blue-700",
  conference: "bg-green-100 text-green-700",
  atelier: "bg-orange-100 text-orange-700",
  networking: "bg-pink-100 text-pink-700",
  ceremonie: "bg-yellow-100 text-yellow-700",
  competition: "bg-red-100 text-red-700",
  pause: "bg-gray-100 text-gray-700",
};

const sessionThemeLabels: Record<string, string> = {
  ia: "Intelligence Artificielle",
  fintech: "FinTech",
  sante: "Santé & Tech",
  education: "Éducation",
  startup: "Startups",
  gouvernance: "Gouvernance",
  general: "Général",
  agriculture: "AgriTech",
  energie: "Énergie",
};

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const session = await prisma.session.findUnique({
    where: { id },
  });

  if (!session) {
    return {
      title: "Session non trouvée",
    };
  }

  return {
    title: session.title,
    description: session.description || "",
  };
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      speakers: {
        include: { speaker: true },
      },
    },
  });

  if (!session) {
    notFound();
  }

  const dayLabel = session.day === 1 ? "Dimanche 15 Juin 2025" : "Lundi 16 Juin 2025";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-12 bg-[#0d5a75]">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            href="/programme"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au programme
          </Link>

          <div className="flex flex-wrap items-start gap-4 mb-4">
            <Badge className={sessionTypeColors[session.type]}>
              {sessionTypeLabels[session.type]}
            </Badge>
            <Badge variant="outline" className="border-white/50 text-white">
              {sessionThemeLabels[session.theme]}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {session.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#FF6B35]" />
              <span>{dayLabel}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#FF6B35]" />
              <span>
                {session.startTime} - {session.endTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" />
              <span>{session.room}</span>
            </div>
            {session.capacity && (
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#FF6B35]" />
                <span>{session.capacity} places</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-[#0d5a75] mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {session.description}
              </p>

              {/* Speakers */}
              {session.speakers.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#0d5a75] mb-6">
                    {session.speakers.length > 1 ? "Intervenants" : "Intervenant"}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {session.speakers.map((ss) => (
                      <div
                        key={ss.speaker.id}
                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          {ss.speaker.image ? (
                            <Image
                              src={ss.speaker.image}
                              alt={ss.speaker.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#0d5a75]/10 flex items-center justify-center">
                              <span className="text-xl font-bold text-[#0d5a75]">
                                {ss.speaker.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#0d5a75]">
                            {ss.speaker.name}
                          </h3>
                          <p className="text-[#FF6B35] text-sm">{ss.speaker.role}</p>
                          <p className="text-gray-500 text-sm">{ss.speaker.company}</p>
                          <div className="flex space-x-2 mt-2">
                            {ss.speaker.linkedin && (
                              <a
                                href={ss.speaker.linkedin}
                                className="text-gray-400 hover:text-[#0d5a75]"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                            {ss.speaker.twitter && (
                              <a
                                href={ss.speaker.twitter}
                                className="text-gray-400 hover:text-[#0d5a75]"
                              >
                                <Twitter className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-[#0d5a75] mb-4">Informations</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium">{sessionTypeLabels[session.type]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thème</span>
                    <span className="font-medium">{sessionThemeLabels[session.theme]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Salle</span>
                    <span className="font-medium">{session.room}</span>
                  </div>
                  {session.capacity && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Capacité</span>
                      <span className="font-medium">{session.capacity} places</span>
                    </div>
                  )}
                </div>
                <Link
                  href="/billetterie"
                  className="mt-6 block w-full text-center bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Réserver ma place
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
