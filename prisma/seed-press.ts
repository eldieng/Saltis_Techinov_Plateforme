import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const pressArticles = [
  {
    title: "SALTIS 2025 : Ce qu'en dit la presse - Revue complète",
    slug: "saltis-2025-revue-presse-complete",
    excerpt: "Découvrez la couverture médiatique exceptionnelle du SALTIS 2025 à travers 16 médias nationaux et internationaux qui ont relayé l'événement.",
    content: `
# SALTIS 2025 : Une couverture médiatique exceptionnelle

La 4ème édition du Salon International des Algorithmes, des Sciences, des Technologies et de l'Innovation du Sénégal (SALTIS) a bénéficié d'une couverture médiatique sans précédent. Plus de 16 médias nationaux et internationaux ont relayé l'événement, témoignant de son importance croissante dans l'écosystème numérique africain.

## Les chiffres clés
- **5 000 participants** attendus
- **50 experts internationaux**
- **28 pays** représentés
- **16+ médias** couvrant l'événement

## Les médias qui en parlent

### Presse nationale
- **Le Soleil** - "La coordinatrice Générale Wedji Kane pour une souveraineté technologique tournée vers l'avenir"
- **RTS** - "L'intelligence artificielle au service du développement africain"
- **IGFM** - "Dakar accueille SALTIS 2025 pour la quatrième fois"
- **Senego** - "Un panel de haut niveau sur l'école connectée et l'apport de l'IA"

### Médias Tech spécialisés
- **Le Tech Observateur** - Programme complet du SALTIS 2025
- **SocialNetLink** - Interview exclusive de Wedji Kane
- **Le Monde du Numérique** - "Le Sénégal au cœur de l'innovation numérique"
- **Akassaa** - Présentation du salon international de l'IA

### Médias institutionnels et corporate
- **Sonatel** - "Sonatel met en avant son expertise en IA et souveraineté numérique"
- **OSIRIS** - "Le Sénégal affirme sa souveraineté numérique"
- **AFESTIC** - Participation au SALTIS 2025

### Couverture internationale
- **AllAfrica** - Diffusion pan-africaine
- **La Vie Sénégalaise** - "La grande manifestation scientifique dédiée à l'IA"

## Liens vers les articles

1. [Sonatel - Expertise IA et souveraineté numérique](https://sonatel.sn/saltis-2025-sonatel-met-en-avant-son-expertise-en-intelligence-artificielle-et-en-souverainete-numerique/)
2. [Le Tech Observateur - Programme SALTIS 2025](https://letechobservateur.sn/saltis-2025-decouvrez-le-programme/)
3. [RTS - IA au service du développement africain](https://www.rts.sn/actualite/detail/a-la-une/saltis-dakar-2025-lintelligence-artificielle-au-service-du-developpement-africain)
4. [SocialNetLink - Interview Wedji Kane](https://www.socialnetlink.org/2025/11/27/wedji-kane-au-saltis-2025-le-senegal-doit-comprendre-et-maitriser-lintelligence-artificielle/)
5. [OSIRIS - Souveraineté numérique](https://www.osiris.sn/saltis-2025-le-senegal-affirme-sa-souverainete-numerique-et-installe-son.html)
6. [Le Soleil - Wedji Kane](https://lesoleil.sn/actualites/technologie/saltis-2025-la-coordinatrice-generale-wedji-kane-pour-une-souverainete-technologique-tournee-vers-lavenir/)
7. [Le Monde du Numérique](https://lemondedunumerique.com/2025/11/21/saltis-2025-le-senegal-au-coeur-de-linnovation-numerique-et-de-lintelligence-artificielle/)
8. [AllAfrica](https://fr.allafrica.com/stories/202511280585.html)
9. [IGFM](https://www.igfm.sn/Dakar-accueille-saltis-2025-pour-la-quatrieme-fois)
10. [La Vie Sénégalaise](https://laviesenegalaise.com/saltis-2025-la-grande-manifestation-scientifique-et-technologique-dediee-a-lia-et-ses-algorithmes-sur-le-continent/)
11. [Sénégal News - IA raconte l'histoire](https://www.senegalnews.sn/index.php/business/item/3493-saltis-2025-quand-l-ia-raconte-l-histoire-du-senegal)
12. [Senego - Panel école connectée](https://senego.com/saltis-2025-un-panel-de-haut-niveau-sur-lecole-connectee-et-lapport-de-lintelligence-artificielle_1898434.html)
13. [Sénégal News - IA éthique](https://senegalnews.sn/index.php/monde-top/item/3563-saltis-2025-le-senegal-trace-sa-voie-vers-une-intelligence-artificielle-ethique-inclusive-et-souveraine)
14. [Akassaa](https://akassaa.com/saltis-salon-international-de-lia/)

Le SALTIS 2025 confirme ainsi sa place comme événement incontournable de l'écosystème numérique africain.
    `,
    coverImage: "/images/ias-1.jpg",
    category: "presse",
    tags: ["presse", "médias", "saltis-2025", "couverture-médiatique"],
  },
  {
    title: "Sonatel au SALTIS 2025 : IA et Souveraineté Numérique",
    slug: "sonatel-saltis-2025-ia-souverainete",
    excerpt: "Au salon SALTIS, Sonatel a présenté ses dispositifs phares pour accompagner la transformation digitale du Sénégal : Orange Digital Center, Startup Studio et solutions IA.",
    content: `
# Sonatel au SALTIS 2025 : Leader de la transformation digitale

## Un engagement fort pour la souveraineté numérique

Lors du SALTIS 2025, Sonatel, leader dans le secteur des télécommunications, a marqué les esprits par sa participation technique et institutionnelle. Son engagement s'est concentré sur l'innovation et la souveraineté numérique, sous le thème « Pour une souveraineté technologique, inclusive et durable ».

## Les dispositifs présentés

### Orange Digital Center
Le centre de formation numérique de Sonatel accompagne les jeunes dans leur montée en compétences digitales.

### Orange Startup Studio
Un programme d'accompagnement pour les startups innovantes du Sénégal et de la sous-région.

### Solutions B2B
Des offres marketing adaptées aux besoins des entreprises en transformation digitale.

## L'IA au cœur de la stratégie Sonatel

L'un des moments forts du SALTIS 2025 a été l'intervention de **Mme Aïssatou Gningue**, Cheffe du Département Data & AI Business Management chez Sonatel. Lors du panel « Comment construire une société plus juste grâce à la donnée ? », elle a souligné l'engagement de Sonatel dans l'intégration de l'IA depuis plus de cinq ans.

### Les applications de l'IA chez Sonatel :
- **Amélioration des offres** via l'analyse avancée des données
- **Automatisation** des interactions clients avec des outils d'assistance intelligente
- **Sécurisation** des transactions Orange Money par la détection de fraude
- **Services publics** à travers l'exploitation responsable de données anonymisées

## Un partenaire stratégique

Avec sa participation au SALTIS 2025, Sonatel réaffirme son rôle de leader dans la structuration de l'écosystème numérique sénégalais et régional.

> "L'entreprise poursuit ses efforts pour accompagner l'innovation, renforcer la sécurité des systèmes et contribuer à l'émergence d'une souveraineté numérique forte, inclusive et durable en Afrique."

[Lire l'article complet sur Sonatel.sn](https://sonatel.sn/saltis-2025-sonatel-met-en-avant-son-expertise-en-intelligence-artificielle-et-en-souverainete-numerique/)
    `,
    coverImage: "/images/ias-2.jpg",
    category: "presse",
    tags: ["sonatel", "sponsors", "ia", "transformation-digitale", "orange"],
  },
  {
    title: "Wedji Kane : La Vision du SALTIS pour le Sénégal",
    slug: "wedji-kane-vision-saltis-senegal",
    excerpt: "La coordinatrice générale du SALTIS livre un message fort : le Sénégal doit maîtriser l'IA, la comprendre et en faire un outil d'inclusion et de développement.",
    content: `
# Wedji Kane : "Le Sénégal doit comprendre et maîtriser l'intelligence artificielle"

## Une vision claire pour l'avenir

Le coup d'envoi du SALTIS 2025 a été donné au Musée des Civilisations Noires de Dakar, un lieu hautement symbolique où **Wedji Kane**, Coordinatrice générale du salon et cofondatrice de l'Institut des Algorithmes du Sénégal (IAS), a livré un message fort.

> "Le Sénégal doit non seulement comprendre l'IA, mais aussi la maîtriser et en faire un outil d'inclusion, de souveraineté et de développement."

## L'IA adaptée aux réalités africaines

Pour Wedji Kane, l'intelligence artificielle ne peut être un simple produit importé. Elle doit :
- S'adapter aux **réalités africaines**
- Dialoguer avec nos **imaginaires et cultures**
- Respecter nos **trajectoires intellectuelles**

## Une alliance intergénérationnelle

Dans un message empreint de lucidité, Wedji Kane rappelle que si le SALTIS est porté par une équipe jeune, il se construit avec l'expertise et la vision des aînés qui ont façonné les premières bases de l'écosystème numérique national.

> "Cette alliance intergénérationnelle est l'un des piliers de la cohérence et de la durabilité des avancées technologiques du pays."

## Le SALTIS : Un travail continu

Le SALTIS n'est pas un événement ponctuel. Il se prolonge toute l'année par un travail d'acculturation dans :
- Les **écoles**
- Les **universités**
- Les **entreprises**
- Les **administrations**

**L'ambition est claire** : comprendre avant d'utiliser, et maîtriser avant de réguler, afin de bâtir une véritable culture de l'IA au Sénégal.

## Les réalisations marquantes

En trois éditions, le salon s'est imposé comme un espace incontournable :
- **PAS Challenge** : Des jeunes innovateurs développent des solutions concrètes
- **Réseau international** : Mobilisation de la diaspora, du Maghreb, de l'Europe et de l'Amérique
- **28 pays** représentés

## Sources

- [SocialNetLink - Interview Wedji Kane](https://www.socialnetlink.org/2025/11/27/wedji-kane-au-saltis-2025-le-senegal-doit-comprendre-et-maitriser-lintelligence-artificielle/)
- [Le Soleil - Souveraineté technologique](https://lesoleil.sn/actualites/technologie/saltis-2025-la-coordinatrice-generale-wedji-kane-pour-une-souverainete-technologique-tournee-vers-lavenir/)
- [OSIRIS - Leadership continental](https://www.osiris.sn/saltis-2025-le-senegal-affirme-sa-souverainete-numerique-et-installe-son.html)
    `,
    coverImage: "/images/Wedji-Kane.jpg",
    category: "presse",
    tags: ["wedji-kane", "vision", "ias", "leadership", "souveraineté"],
  },
  {
    title: "PAS Challenge et CANAL'IA : L'Innovation Jeunesse à l'Honneur",
    slug: "pas-challenge-canalia-innovation-jeunesse",
    excerpt: "Le PAS Challenge et CANAL'IA illustrent la volonté du Sénégal de faire de l'innovation un pilier d'accompagnement des grands rendez-vous nationaux.",
    content: `
# PAS Challenge et CANAL'IA : L'Innovation au Service du Sénégal

## Le PAS Challenge : Innover pour les JOJ 2026

Le **PAS Challenge** (Programme d'Accélération SALTIS) est l'une des initiatives phares du SALTIS. Cette année, il s'est focalisé sur les **solutions digitales pour les Jeux Olympiques de la Jeunesse Dakar 2026**.

### Objectifs du PAS Challenge
- Développer des **solutions concrètes** adaptées aux besoins du pays
- Accompagner les **jeunes innovateurs** sénégalais
- Créer un **écosystème d'innovation** durable

### Résultats
Le PAS Challenge a permis à de nombreux jeunes de :
- Présenter leurs projets devant un jury d'experts
- Bénéficier d'un accompagnement technique
- Accéder à des opportunités de financement

## CANAL'IA : L'IA dans toutes les régions

**CANAL'IA** (Caravane Nationale sur l'Intelligence Artificielle) est une initiative structurante lancée lors du SALTIS 2025.

### Mission
Diffuser l'intelligence artificielle dans **toutes les régions du Sénégal** dès janvier 2026.

### Cibles
- **Communes**
- **Lycées**
- **Centres de formation**
- **Administrations locales**

### Vision
> "La souveraineté technologique n'a de sens que si elle touche toutes les parties du pays" - Wedji Kane

## L'innovation comme pilier national

Ces deux initiatives illustrent la volonté du Sénégal de :
1. **Démocratiser l'accès** à l'IA
2. **Former la jeunesse** aux technologies de demain
3. **Ancrer la souveraineté numérique** au niveau local

## Sources

- [OSIRIS - CANAL'IA annoncé](https://www.osiris.sn/saltis-2025-le-senegal-affirme-sa-souverainete-numerique-et-installe-son.html)
- [Scribd - Présentation PAS Challenge](https://fr.scribd.com/document/900361680/Pre-sentation-SALTIS-2025-PAS-Challenge-offciiel)
- [Le Monde du Numérique](https://lemondedunumerique.com/2025/11/21/saltis-2025-le-senegal-au-coeur-de-linnovation-numerique-et-de-lintelligence-artificielle/)
    `,
    coverImage: "/images/ias-3.jpg",
    category: "presse",
    tags: ["pas-challenge", "canalia", "innovation", "jeunesse", "joj-2026"],
  },
  {
    title: "SALTIS 2025 : Le Sénégal affirme son Leadership Continental en IA",
    slug: "saltis-2025-senegal-leadership-continental-ia",
    excerpt: "Avec 5000 participants, 50 experts internationaux et 28 pays représentés, le SALTIS 2025 confirme la place du Sénégal comme acteur majeur de l'IA en Afrique.",
    content: `
# Le Sénégal, Hub de l'Intelligence Artificielle en Afrique

## Un événement d'envergure internationale

Le SALTIS 2025 a rassemblé :
- **5 000 participants**
- **50 experts internationaux**
- **28 pays** représentés
- Tenu au **Musée des Civilisations Noires** de Dakar

## Une plateforme stratégique

En trois années, le SALTIS s'est hissé au rang de **rendez-vous majeur de l'intelligence artificielle en Afrique francophone**, fédérant :
- Institutions gouvernementales
- Chercheurs et universitaires
- Startups innovantes
- Investisseurs

## Le Livre Blanc du Comité Scientifique

Cette édition a été marquée par la présentation du **Livre blanc du Comité scientifique du SALTIS**, proposant des recommandations concrètes pour :
- Accompagner la construction de **politiques publiques**
- Développer des **infrastructures numériques** robustes
- Préparer l'avenir : biotechnologies, machines quantiques

## Les leviers stratégiques du Sénégal

Selon Wedji Kane, le Sénégal doit identifier ses atouts :
- **Terres rares**
- **Dynamique démographique**
- **Savoirs endogènes**

## Thèmes clés abordés

Le SALTIS favorise la réflexion sur l'impact de l'IA dans :
- 🏥 **Santé**
- 📚 **Éducation**
- 🌾 **Agriculture**
- ⚡ **Énergie**
- 🏛️ **Gouvernance**
- 💼 **Entrepreneuriat**

## Une vision souverainiste

> "Nous faisons tout cela pour que nos enfants comprennent, maîtrisent et orientent ces technologies, et non les subissent." - Wedji Kane

## Sources

- [OSIRIS - Leadership continental](https://www.osiris.sn/saltis-2025-le-senegal-affirme-sa-souverainete-numerique-et-installe-son.html)
- [RTS - IA au service du développement](https://www.rts.sn/actualite/detail/a-la-une/saltis-dakar-2025-lintelligence-artificielle-au-service-du-developpement-africain)
- [AllAfrica - Couverture internationale](https://fr.allafrica.com/stories/202511280585.html)
- [Sénégal News - IA éthique et inclusive](https://senegalnews.sn/index.php/monde-top/item/3563-saltis-2025-le-senegal-trace-sa-voie-vers-une-intelligence-artificielle-ethique-inclusive-et-souveraine)
    `,
    coverImage: "/images/ias-4.jpg",
    category: "presse",
    tags: ["leadership", "afrique", "international", "souveraineté", "politique"],
  },
];

async function main() {
  console.log('🗞️ Seeding press articles...');

  for (const article of pressArticles) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: article.slug },
    });

    if (existing) {
      console.log(`⏭️ Article already exists: ${article.title}`);
      continue;
    }

    await prisma.blogPost.create({
      data: {
        ...article,
        isPublished: true,
        publishedAt: new Date('2025-11-28'),
      },
    });

    console.log(`✅ Created: ${article.title}`);
  }

  console.log('🎉 Press articles seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
