import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create Admin User
  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@saltis-techinov.org" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "admin@saltis-techinov.org",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "SALTIS",
      role: "ADMIN",
      phone: "+221770000000",
    },
  });
  console.log("✅ Admin user created:", adminUser.email);

  // Create SALTIS 2025 Event
  const event = await prisma.event.upsert({
    where: { slug: "saltis-2025" },
    update: {},
    create: {
      name: "SALTIS TechInov 2025",
      slug: "saltis-2025",
      description:
        "Salon International des Algorithmes, des Sciences, des Technologies et de l'Innovation du Sénégal",
      startDate: new Date("2025-06-15T09:00:00"),
      endDate: new Date("2025-06-16T18:00:00"),
      venue: "Musée des Civilisations Noires",
      address: "Place de la Nation, Dakar, Sénégal",
      isActive: true,
    },
  });

  console.log("✅ Event created:", event.name);

  // Create Passes
  const passes = [
    {
      name: "Pass Gratuit",
      description: "Accès gratuit au SALTIS 2025 !",
      price: 0,
      features: [
        "Accès aux conférences et expositions",
        "Participation aux activités du salon",
        "Découverte de l'Intelligence Artificielle",
      ],
      sortOrder: 1,
    },
    {
      name: "Pass Standard",
      description: "Pour vivre pleinement l'énergie du SALTIS!",
      price: 5000,
      features: [
        "Accès total aux conférences et expositions",
        "Un livre sur l'Intelligence Artificielle",
        "Repas",
      ],
      sortOrder: 2,
    },
    {
      name: "Pass Médium",
      description: "Le juste équilibre entre confort et découverte !",
      price: 15000,
      features: [
        "Accès complet au SALTIS sur deux jours",
        "Sièges réservés juste derrière les VIP",
        "Repas inclus pour les deux jours",
        "Un livre sur l'IA + un cadeau surprise SALTIS",
      ],
      sortOrder: 3,
    },
    {
      name: "Pass Premium",
      description: "L'expérience ultime du SALTIS !",
      price: 50000,
      features: [
        "Accès total aux deux journées du Salon",
        "Place VIP fauteuil avec accès exclusif à l'espace VIP et lunch networking",
        "Rencontre privilégiée avec les autorités, speakers et partenaires stratégiques",
        "Un livre sur l'Intelligence Artificielle offert",
        "Un ticket de visite du Musée des Civilisations Noires inclus",
      ],
      sortOrder: 4,
    },
  ];

  for (const passData of passes) {
    const pass = await prisma.pass.upsert({
      where: {
        id: `${event.id}-${passData.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: passData,
      create: {
        id: `${event.id}-${passData.name.toLowerCase().replace(/\s+/g, "-")}`,
        eventId: event.id,
        ...passData,
      },
    });
    console.log("✅ Pass created:", pass.name, "-", pass.price, "FCFA");
  }

  // Create Speakers
  const speakersData = [
    {
      name: "Dr. Aminata Diallo",
      role: "Experte IA & Data Science",
      company: "Tech Africa Labs",
      bio: "Docteure en Intelligence Artificielle, spécialisée dans l'application du Machine Learning aux problématiques africaines.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/aminata-diallo",
      twitter: "@aminatadiallo",
    },
    {
      name: "Moussa Ndiaye",
      role: "CEO & Fondateur",
      company: "InnovSenegal",
      bio: "Entrepreneur serial, fondateur de plusieurs startups tech au Sénégal. Passionné par l'innovation et le développement durable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/moussa-ndiaye",
      twitter: "@moussandiaye",
    },
    {
      name: "Fatou Sow",
      role: "Directrice Innovation",
      company: "Digital Africa",
      bio: "Leader dans la transformation digitale des entreprises africaines. Experte en stratégie d'innovation.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/fatou-sow",
    },
    {
      name: "Ibrahima Fall",
      role: "CTO",
      company: "AfriTech Solutions",
      bio: "Architecte logiciel avec 15 ans d'expérience. Spécialiste des systèmes distribués et de l'IA.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/ibrahima-fall",
    },
    {
      name: "Aïssatou Ba",
      role: "Fondatrice",
      company: "HealthTech Senegal",
      bio: "Pionnière de la santé digitale en Afrique de l'Ouest. Développe des solutions IA pour le diagnostic médical.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/aissatou-ba",
    },
    {
      name: "Oumar Diop",
      role: "Directeur Général",
      company: "Fintech West Africa",
      bio: "Expert en inclusion financière et paiements mobiles. A contribué à démocratiser les services financiers au Sénégal.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/oumar-diop",
    },
    {
      name: "Marie Faye",
      role: "Chercheuse IA",
      company: "Université Cheikh Anta Diop",
      bio: "Chercheuse spécialisée dans le traitement du langage naturel pour les langues africaines.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/marie-faye",
    },
    {
      name: "Abdoulaye Sarr",
      role: "VP Engineering",
      company: "Global Tech Corp",
      bio: "Leader technique avec une expérience internationale. Mentor pour les jeunes développeurs africains.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      linkedin: "https://linkedin.com/in/abdoulaye-sarr",
    },
  ];

  const speakers = [];
  for (const speakerData of speakersData) {
    const speaker = await prisma.speaker.upsert({
      where: { id: speakerData.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "") },
      update: speakerData,
      create: {
        id: speakerData.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, ""),
        ...speakerData,
      },
    });
    speakers.push(speaker);
    console.log("✅ Speaker created:", speaker.name);
  }

  // Create Exhibitors
  const exhibitorsData = [
    {
      name: "Tech Africa Labs",
      category: "startup",
      description: "Solutions d'Intelligence Artificielle pour l'Afrique",
      boothNumber: "A1",
      website: "https://techafricaabs.com",
      isActive: true,
    },
    {
      name: "InnovSenegal",
      category: "startup",
      description: "Incubateur et accélérateur de startups tech",
      boothNumber: "A2",
      website: "https://innovsenegal.com",
      isActive: true,
    },
    {
      name: "Digital Africa",
      category: "entreprise",
      description: "Accompagnement à la transformation numérique",
      boothNumber: "B1",
      website: "https://digitalafrica.com",
      isActive: true,
    },
    {
      name: "AfriTech Solutions",
      category: "entreprise",
      description: "Solutions logicielles sur mesure",
      boothNumber: "B2",
      website: "https://afritechsolutions.com",
      isActive: true,
    },
    {
      name: "HealthTech Senegal",
      category: "startup",
      description: "Technologies de santé innovantes",
      boothNumber: "C1",
      website: "https://healthtechsenegal.com",
      isActive: true,
    },
    {
      name: "Fintech West Africa",
      category: "entreprise",
      description: "Solutions de paiement et inclusion financière",
      boothNumber: "C2",
      website: "https://fintechwestafrica.com",
      isActive: true,
    },
  ];

  for (const exhibitorData of exhibitorsData) {
    const exhibitor = await prisma.exhibitor.upsert({
      where: { id: exhibitorData.name.toLowerCase().replace(/\s+/g, "-") },
      update: exhibitorData,
      create: {
        id: exhibitorData.name.toLowerCase().replace(/\s+/g, "-"),
        ...exhibitorData,
      },
    });
    console.log("✅ Exhibitor created:", exhibitor.name);
  }

  // Create Sessions
  const sessionsData = [
    {
      title: "Ouverture officielle SALTIS TechInov 2025",
      description: "Cérémonie d'ouverture avec les autorités et partenaires",
      type: "ceremonie",
      theme: "general",
      day: 1,
      startTime: "09:00",
      endTime: "10:00",
      room: "Amphithéâtre Principal",
      capacity: 500,
      isBreak: false,
    },
    {
      title: "L'IA au service du développement africain",
      description: "Keynote sur les opportunités de l'Intelligence Artificielle pour transformer l'Afrique",
      type: "keynote",
      theme: "ia",
      day: 1,
      startTime: "10:00",
      endTime: "11:00",
      room: "Amphithéâtre Principal",
      capacity: 500,
      isBreak: false,
      speakerIds: [speakers[0].id],
    },
    {
      title: "Pause café & Networking",
      description: "Moment de networking et visite des stands",
      type: "pause",
      theme: "general",
      day: 1,
      startTime: "11:00",
      endTime: "11:30",
      room: "Espace Exposition",
      isBreak: true,
    },
    {
      title: "Panel : Startups tech sénégalaises",
      description: "Discussion avec les fondateurs de startups innovantes du Sénégal",
      type: "panel",
      theme: "startup",
      day: 1,
      startTime: "11:30",
      endTime: "12:30",
      room: "Salle A",
      capacity: 150,
      isBreak: false,
      speakerIds: [speakers[1].id, speakers[4].id],
    },
    {
      title: "Atelier : Introduction au Machine Learning",
      description: "Atelier pratique pour découvrir les bases du Machine Learning",
      type: "atelier",
      theme: "ia",
      day: 1,
      startTime: "14:00",
      endTime: "16:00",
      room: "Salle B",
      capacity: 50,
      isBreak: false,
      speakerIds: [speakers[6].id],
    },
    {
      title: "FinTech et inclusion financière en Afrique",
      description: "Comment les solutions de paiement mobile révolutionnent l'accès aux services financiers",
      type: "conference",
      theme: "fintech",
      day: 1,
      startTime: "14:00",
      endTime: "15:00",
      room: "Salle A",
      capacity: 150,
      isBreak: false,
      speakerIds: [speakers[5].id],
    },
    {
      title: "Keynote : La santé digitale en Afrique",
      description: "Les innovations technologiques qui transforment le secteur de la santé",
      type: "keynote",
      theme: "sante",
      day: 2,
      startTime: "09:30",
      endTime: "10:30",
      room: "Amphithéâtre Principal",
      capacity: 500,
      isBreak: false,
      speakerIds: [speakers[4].id],
    },
    {
      title: "Panel : Transformation digitale des entreprises",
      description: "Retours d'expérience sur la digitalisation des entreprises africaines",
      type: "panel",
      theme: "general",
      day: 2,
      startTime: "11:00",
      endTime: "12:00",
      room: "Salle A",
      capacity: 150,
      isBreak: false,
      speakerIds: [speakers[2].id, speakers[3].id],
    },
    {
      title: "Compétition Pitch Startups",
      description: "Les meilleures startups présentent leurs projets devant un jury d'experts",
      type: "competition",
      theme: "startup",
      day: 2,
      startTime: "14:00",
      endTime: "17:00",
      room: "Amphithéâtre Principal",
      capacity: 500,
      isBreak: false,
    },
    {
      title: "Cérémonie de clôture",
      description: "Remise des prix et clôture officielle de SALTIS TechInov 2025",
      type: "ceremonie",
      theme: "general",
      day: 2,
      startTime: "17:00",
      endTime: "18:00",
      room: "Amphithéâtre Principal",
      capacity: 500,
      isBreak: false,
    },
  ];

  // Helper function to create URL-safe slugs
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)/g, "") // Remove leading/trailing hyphens
      .substring(0, 50);
  }

  for (const sessionData of sessionsData) {
    const { speakerIds, ...data } = sessionData as typeof sessionData & { speakerIds?: string[] };
    const sessionId = slugify(sessionData.title);
    const session = await prisma.session.upsert({
      where: { id: sessionId },
      update: data,
      create: {
        id: sessionId,
        eventId: event.id,
        ...data,
      },
    });

    // Link speakers
    if (speakerIds && speakerIds.length > 0) {
      for (const speakerId of speakerIds) {
        await prisma.sessionSpeaker.upsert({
          where: {
            sessionId_speakerId: { sessionId: session.id, speakerId },
          },
          update: {},
          create: { sessionId: session.id, speakerId },
        });
      }
    }

    console.log("✅ Session created:", session.title);
  }

  // Create Blog Posts
  const blogPostsData = [
    {
      title: "L'Intelligence Artificielle en Afrique : État des lieux 2025",
      slug: "ia-afrique-2025",
      excerpt: "Découvrez comment l'IA transforme les secteurs clés du continent africain et les opportunités qui en découlent.",
      content: "L'Intelligence Artificielle connaît une croissance exponentielle en Afrique...",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      category: "tech",
      tags: ["ia", "afrique", "innovation"],
      isPublished: true,
      publishedAt: new Date("2024-12-10"),
    },
    {
      title: "Les startups tech sénégalaises à suivre en 2025",
      slug: "startups-senegal-2025",
      excerpt: "Portrait de 10 startups innovantes qui façonnent l'écosystème tech du Sénégal.",
      content: "Le Sénégal est devenu un hub technologique majeur en Afrique de l'Ouest...",
      coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      category: "actualites",
      tags: ["startups", "senegal", "tech"],
      isPublished: true,
      publishedAt: new Date("2024-12-05"),
    },
    {
      title: "Fintech et inclusion financière : le modèle africain",
      slug: "fintech-inclusion-financiere",
      excerpt: "Comment les solutions de paiement mobile révolutionnent l'accès aux services financiers en Afrique.",
      content: "L'Afrique est à l'avant-garde de la révolution fintech mondiale...",
      coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      category: "tech",
      tags: ["fintech", "mobile money", "inclusion"],
      isPublished: true,
      publishedAt: new Date("2024-11-28"),
    },
    {
      title: "SALTIS 2024 : Retour sur une édition record",
      slug: "saltis-2024-bilan",
      excerpt: "Plus de 4000 participants, 80 exposants et des annonces majeures. Revivez les moments forts de l'édition 2024.",
      content: "L'édition 2024 du SALTIS TechInov a été un succès retentissant...",
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      category: "evenement",
      tags: ["saltis", "evenement", "bilan"],
      isPublished: true,
      publishedAt: new Date("2024-11-20"),
    },
  ];

  for (const postData of blogPostsData) {
    const post = await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: postData,
      create: {
        authorId: adminUser.id,
        ...postData,
      },
    });
    console.log("✅ Blog post created:", post.title);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
