import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Newspaper, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

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
    month: "short",
    year: "numeric",
  });
}

export async function BlogSection() {
  const articles = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  if (articles.length === 0) {
    return null;
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            Blog & Actualités
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dernières{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d5a75] to-[#FF6B35]">
              Actualités
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles sur SALTIS, l&apos;IA et l&apos;innovation technologique au Sénégal.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-64 lg:h-80 overflow-hidden">
              {featuredArticle.coverImage ? (
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
                  <span className="text-4xl font-bold text-white">SALTIS</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={`${categoryColors[featuredArticle.category] || "bg-gray-100 text-gray-700"}`}>
                  {featuredArticle.category}
                </Badge>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {featuredArticle.title}
                </h3>
                {featuredArticle.excerpt && (
                  <p className="text-white/80 text-sm line-clamp-2 mb-3">
                    {featuredArticle.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  {featuredArticle.publishedAt && (
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredArticle.publishedAt)}
                    </div>
                  )}
                  <span className="flex items-center gap-1 text-[#FF6B35] text-sm font-medium group-hover:gap-2 transition-all">
                    Lire
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Other Articles */}
          <div className="space-y-6">
            {otherArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
                      <span className="text-lg font-bold text-white">S</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className={`mb-2 text-xs ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
                    {article.category}
                  </Badge>
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0d5a75] transition-colors">
                    {article.title}
                  </h4>
                  {article.publishedAt && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt)}
                    </div>
                  )}
                </div>
              </Link>
            ))}

            {/* View all CTA */}
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FF6B35] hover:bg-orange-50 transition-all group"
            >
              <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
              <span className="font-medium text-gray-600 group-hover:text-[#FF6B35] transition-colors">
                Voir tous les articles
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
