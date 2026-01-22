export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  type: SessionType;
  theme: SessionTheme;
  day: 1 | 2;
  startTime: string;
  endTime: string;
  room: string;
  speakers: Speaker[];
  capacity?: number;
  isBreak?: boolean;
}

export type SessionType =
  | "keynote"
  | "panel"
  | "conference"
  | "atelier"
  | "networking"
  | "ceremonie"
  | "competition"
  | "pause";

export type SessionTheme =
  | "ia"
  | "fintech"
  | "sante"
  | "education"
  | "startup"
  | "gouvernance"
  | "general";

export const sessionTypeLabels: Record<SessionType, string> = {
  keynote: "Keynote",
  panel: "Panel",
  conference: "Conférence",
  atelier: "Atelier",
  networking: "Networking",
  ceremonie: "Cérémonie",
  competition: "Compétition",
  pause: "Pause",
};

export const sessionThemeLabels: Record<SessionTheme, string> = {
  ia: "Intelligence Artificielle",
  fintech: "Fintech",
  sante: "Santé",
  education: "Éducation",
  startup: "Startups & Entrepreneuriat",
  gouvernance: "Gouvernance & Politique",
  general: "Général",
};

export const sessionTypeColors: Record<SessionType, string> = {
  keynote: "bg-[#FF6B35] text-white",
  panel: "bg-[#0d5a75] text-white",
  conference: "bg-purple-500 text-white",
  atelier: "bg-green-500 text-white",
  networking: "bg-yellow-500 text-black",
  ceremonie: "bg-pink-500 text-white",
  competition: "bg-red-500 text-white",
  pause: "bg-gray-400 text-white",
};

export const speakers: Speaker[] = [
  {
    id: "aminata-diallo",
    name: "Dr. Aminata Diallo",
    role: "Experte IA & Data Science",
    company: "Tech Africa Labs",
    bio: "Docteure en Intelligence Artificielle, spécialisée dans l'application du Machine Learning aux problématiques africaines.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "moussa-ndiaye",
    name: "Moussa Ndiaye",
    role: "CEO & Fondateur",
    company: "InnovSenegal",
    bio: "Entrepreneur serial, fondateur de plusieurs startups tech au Sénégal. Passionné par l'innovation et le développement durable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "fatou-sow",
    name: "Fatou Sow",
    role: "Directrice Innovation",
    company: "Digital Africa",
    bio: "Leader dans la transformation digitale des entreprises africaines. Experte en stratégie d'innovation.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "ibrahima-fall",
    name: "Ibrahima Fall",
    role: "CTO",
    company: "AfriTech Solutions",
    bio: "Architecte logiciel avec 15 ans d'expérience. Spécialiste des systèmes distribués et de l'IA.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "aissatou-ba",
    name: "Aïssatou Ba",
    role: "Fondatrice",
    company: "HealthTech Senegal",
    bio: "Pionnière de la santé digitale en Afrique de l'Ouest. Développe des solutions IA pour le diagnostic médical.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "oumar-diop",
    name: "Oumar Diop",
    role: "Directeur Général",
    company: "Fintech West Africa",
    bio: "Expert en inclusion financière et paiements mobiles. A contribué à démocratiser les services financiers au Sénégal.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "marie-faye",
    name: "Marie Faye",
    role: "Chercheuse IA",
    company: "Université Cheikh Anta Diop",
    bio: "Chercheuse spécialisée dans le traitement du langage naturel pour les langues africaines.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "abdoulaye-sarr",
    name: "Abdoulaye Sarr",
    role: "VP Engineering",
    company: "Global Tech Corp",
    bio: "Leader technique avec une expérience internationale. Mentor pour les jeunes développeurs africains.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    linkedin: "#",
    twitter: "#",
  },
];

export const sessions: Session[] = [
  // JOUR 1
  {
    id: "ouverture",
    title: "Cérémonie d'ouverture",
    description: "Discours d'ouverture officiel et présentation de l'édition SALTIS 2025. Accueil des autorités et des invités d'honneur.",
    type: "ceremonie",
    theme: "general",
    day: 1,
    startTime: "09:00",
    endTime: "09:30",
    room: "Amphithéâtre principal",
    speakers: [],
  },
  {
    id: "keynote-ia-afrique",
    title: "Keynote : L'IA au service du développement africain",
    description: "Vision stratégique de l'Intelligence Artificielle pour l'Afrique. Comment l'IA peut accélérer le développement économique et social du continent.",
    type: "keynote",
    theme: "ia",
    day: 1,
    startTime: "09:30",
    endTime: "10:30",
    room: "Amphithéâtre principal",
    speakers: [speakers[0]],
  },
  {
    id: "pause-cafe-1",
    title: "Pause café & Networking",
    description: "Rencontres et échanges informels. Visite des stands exposants.",
    type: "networking",
    theme: "general",
    day: 1,
    startTime: "10:30",
    endTime: "11:00",
    room: "Espace exposition",
    speakers: [],
    isBreak: true,
  },
  {
    id: "panel-souverainete",
    title: "Panel : Souveraineté technologique en Afrique",
    description: "Débat sur les enjeux de la souveraineté numérique africaine. Comment construire une infrastructure tech indépendante et résiliente.",
    type: "panel",
    theme: "gouvernance",
    day: 1,
    startTime: "11:00",
    endTime: "12:30",
    room: "Salle A",
    speakers: [speakers[1], speakers[3], speakers[7]],
  },
  {
    id: "dejeuner-1",
    title: "Déjeuner",
    description: "",
    type: "pause",
    theme: "general",
    day: 1,
    startTime: "12:30",
    endTime: "14:00",
    room: "Restaurant",
    speakers: [],
    isBreak: true,
  },
  {
    id: "atelier-ml",
    title: "Atelier : Introduction au Machine Learning",
    description: "Atelier pratique pour découvrir les bases du Machine Learning. Hands-on avec Python et scikit-learn.",
    type: "atelier",
    theme: "ia",
    day: 1,
    startTime: "14:00",
    endTime: "15:30",
    room: "Salle B",
    speakers: [speakers[2]],
    capacity: 50,
  },
  {
    id: "conference-sante",
    title: "Conférence : IA et Santé en Afrique",
    description: "Applications de l'IA dans le secteur de la santé. Diagnostic assisté, télémédecine et gestion des épidémies.",
    type: "conference",
    theme: "sante",
    day: 1,
    startTime: "14:00",
    endTime: "15:30",
    room: "Amphithéâtre principal",
    speakers: [speakers[4]],
  },
  {
    id: "panel-startups",
    title: "Panel : Écosystème startup au Sénégal",
    description: "État des lieux de l'écosystème startup sénégalais. Défis, opportunités et success stories.",
    type: "panel",
    theme: "startup",
    day: 1,
    startTime: "15:30",
    endTime: "17:00",
    room: "Salle A",
    speakers: [speakers[1], speakers[2]],
  },
  {
    id: "cocktail-networking",
    title: "Cocktail de networking",
    description: "Soirée de networking avec les exposants, speakers et participants. Musique live et cocktails.",
    type: "networking",
    theme: "general",
    day: 1,
    startTime: "17:00",
    endTime: "19:00",
    room: "Terrasse",
    speakers: [],
  },

  // JOUR 2
  {
    id: "keynote-fintech",
    title: "Keynote : Fintech et inclusion financière",
    description: "L'innovation financière au service de tous. Comment les fintechs transforment l'accès aux services financiers en Afrique.",
    type: "keynote",
    theme: "fintech",
    day: 2,
    startTime: "09:00",
    endTime: "10:30",
    room: "Amphithéâtre principal",
    speakers: [speakers[5]],
  },
  {
    id: "pause-cafe-2",
    title: "Pause café & Networking",
    description: "Rencontres et échanges informels.",
    type: "networking",
    theme: "general",
    day: 2,
    startTime: "10:30",
    endTime: "11:00",
    room: "Espace exposition",
    speakers: [],
    isBreak: true,
  },
  {
    id: "panel-levee-fonds",
    title: "Panel : Startups africaines et levée de fonds",
    description: "Comment lever des fonds pour sa startup tech. Retours d'expérience d'entrepreneurs et conseils d'investisseurs.",
    type: "panel",
    theme: "startup",
    day: 2,
    startTime: "11:00",
    endTime: "12:30",
    room: "Salle A",
    speakers: [speakers[1], speakers[5]],
  },
  {
    id: "conference-nlp",
    title: "Conférence : NLP pour les langues africaines",
    description: "Traitement du langage naturel appliqué aux langues africaines. Défis et avancées de la recherche.",
    type: "conference",
    theme: "ia",
    day: 2,
    startTime: "11:00",
    endTime: "12:30",
    room: "Salle B",
    speakers: [speakers[6]],
  },
  {
    id: "dejeuner-2",
    title: "Déjeuner",
    description: "",
    type: "pause",
    theme: "general",
    day: 2,
    startTime: "12:30",
    endTime: "14:00",
    room: "Restaurant",
    speakers: [],
    isBreak: true,
  },
  {
    id: "atelier-api-ia",
    title: "Atelier : Développer avec les APIs d'IA",
    description: "Hands-on avec ChatGPT, Claude et autres APIs. Intégration dans vos applications.",
    type: "atelier",
    theme: "ia",
    day: 2,
    startTime: "14:00",
    endTime: "15:30",
    room: "Salle B",
    speakers: [speakers[3]],
    capacity: 50,
  },
  {
    id: "conference-education",
    title: "Conférence : IA et Éducation",
    description: "Comment l'IA transforme l'éducation en Afrique. Personnalisation de l'apprentissage et accès au savoir.",
    type: "conference",
    theme: "education",
    day: 2,
    startTime: "14:00",
    endTime: "15:30",
    room: "Amphithéâtre principal",
    speakers: [speakers[0], speakers[6]],
  },
  {
    id: "pitch-competition",
    title: "Pitch Competition : Finale",
    description: "Les 10 meilleures startups présentent leurs projets devant un jury d'investisseurs et d'experts.",
    type: "competition",
    theme: "startup",
    day: 2,
    startTime: "15:30",
    endTime: "16:30",
    room: "Amphithéâtre principal",
    speakers: [],
  },
  {
    id: "cloture",
    title: "Cérémonie de clôture & Remise des prix",
    description: "Annonce des gagnants du Pitch Competition. Discours de clôture et remerciements.",
    type: "ceremonie",
    theme: "general",
    day: 2,
    startTime: "16:30",
    endTime: "17:30",
    room: "Amphithéâtre principal",
    speakers: [],
  },
];

export function getSessionsByDay(day: 1 | 2): Session[] {
  return sessions.filter((s) => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getSessionById(id: string): Session | undefined {
  return sessions.find((s) => s.id === id);
}

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}

export function filterSessions(
  sessionList: Session[],
  filters: {
    type?: SessionType;
    theme?: SessionTheme;
    speakerId?: string;
  }
): Session[] {
  return sessionList.filter((session) => {
    if (filters.type && session.type !== filters.type) return false;
    if (filters.theme && session.theme !== filters.theme) return false;
    if (filters.speakerId && !session.speakers.some((s) => s.id === filters.speakerId)) return false;
    return true;
  });
}
