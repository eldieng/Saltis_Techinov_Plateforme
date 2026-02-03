import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Newspaper, ArrowRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog & Actualités",
  description:
    "Suivez les dernières actualités de SALTIS TechInov : articles, annonces et insights sur l'IA et l'innovation en Afrique.",
};

export const dynamic = 'force-dynamic'; // Always fetch fresh data

const categoryColors: Record<string, string> = {
  actualites: "bg-blue-100 text-blue-700",
  interviews: "bg-purple-100 text-purple-700",
  tech: "bg-green-100 text-green-700",
  evenement: "bg-orange-100 text-orange-700",
  partenaires: "bg-yellow-100 text-yellow-700",
  presse: "bg-rose-100 text-rose-700",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const articles = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero - Modern Gradient */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Newspaper className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">{articles.length} articles publiés</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Blog &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                Actualités
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Articles, analyses et insights sur l&apos;Intelligence Artificielle,
              l&apos;innovation et la tech en Afrique.
            </p>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-[#FF6B35] font-semibold">Article à la une</span>
            </div>
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group block bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-72 lg:h-[400px] overflow-hidden">
                  {featuredArticle.coverImage ? (
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d5a75] to-[#0a4a62]">
                      <span className="text-5xl font-bold text-white">SALTIS</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge
                    className={`w-fit mb-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryColors[featuredArticle.category] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#0d5a75] transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    {featuredArticle.publishedAt && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-[#FF6B35]" />
                        <span>{formatDate(featuredArticle.publishedAt)}</span>
                      </div>
                    )}
                    <span className="flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all">
                      Lire l&apos;article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center py-12">
            <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Articles à venir</h3>
            <p className="text-gray-500">Les articles seront bientôt publiés. Revenez plus tard !</p>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      {otherArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-[#FF6B35] font-semibold text-sm uppercase tracking-wider mb-2">
                Tous les articles
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Explorez nos contenus
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-52 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d5a75] to-[#0a4a62]">
                        <span className="text-3xl font-bold text-white">SALTIS</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0d5a75] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {article.publishedAt && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                          {formatDate(article.publishedAt)}
                        </div>
                      )}
                      <span className="text-[#FF6B35] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lire
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Newsletter</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ne manquez aucun article
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières
              actualités directement dans votre boîte mail.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white rounded-xl font-medium transition-all shadow-lg shadow-orange-500/25"
            >
              S&apos;inscrire à la newsletter
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
