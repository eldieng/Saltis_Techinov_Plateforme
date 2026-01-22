import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Share2, User, Clock, Tag, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

const categoryColors: Record<string, string> = {
  actualites: "bg-blue-100 text-blue-700",
  interviews: "bg-purple-100 text-purple-700",
  tech: "bg-green-100 text-green-700",
  evenement: "bg-orange-100 text-orange-700",
  partenaires: "bg-yellow-100 text-yellow-700",
  presse: "bg-rose-100 text-rose-700",
};

const categoryLabels: Record<string, string> = {
  actualites: "Actualités",
  interviews: "Interviews",
  tech: "Tech",
  evenement: "Événement",
  partenaires: "Partenaires",
  presse: "Revue de Presse",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

function parseMarkdown(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0d5a75] hover:text-[#FF6B35] underline underline-offset-2 inline-flex items-center gap-1">$1<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#FF6B35] pl-4 py-2 my-4 bg-orange-50 rounded-r-lg italic text-gray-700">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-2"><span class="text-[#FF6B35] mt-1.5">•</span><span>$1</span></li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>')
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
    .replace(/\n/g, '<br/>')
    .replace(/^(?!<)(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>')
    .replace(/<p class="text-gray-700 leading-relaxed mb-4"><\/p>/g, '');
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // Get author if exists
  let authorName = "Équipe SALTIS";
  if (post.authorId) {
    const author = await prisma.user.findUnique({
      where: { id: post.authorId },
      select: { firstName: true, lastName: true },
    });
    if (author) {
      authorName = `${author.firstName} ${author.lastName}`;
    }
  }

  // Estimate reading time (200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen">
      {/* Hero with gradient background */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux articles
          </Link>

          <div className="max-w-4xl">
            {/* Category badge */}
            <Badge
              className={`mb-4 px-4 py-1.5 text-sm font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}
            >
              {categoryLabels[post.category] || post.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt in hero */}
            {post.excerpt && (
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{authorName}</span>
              </div>
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF6B35]" />
                  <span>
                    {post.publishedAt.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                <span>{readingTime} min de lecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_280px] gap-12">
              {/* Main content */}
              <article>
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-xl">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                {/* Article content */}
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-[#FF6B35]" />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Tags
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Partagez cet article</h4>
                      <p className="text-sm text-gray-500">Aidez-nous à diffuser l&apos;information</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-[#0d5a75] hover:bg-[#0a4a62] text-white flex items-center justify-center transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#0077B5] hover:bg-[#006396] text-white flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Quick info card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                      À propos
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Catégorie</span>
                        <Badge className={`text-xs ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                          {categoryLabels[post.category] || post.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Temps de lecture</span>
                        <span className="font-medium text-gray-900">{readingTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Auteur</span>
                        <span className="font-medium text-gray-900">{authorName}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA card */}
                  <div className="bg-gradient-to-br from-[#0d5a75] to-[#083d52] rounded-2xl p-6 text-white">
                    <h4 className="font-semibold mb-2">SALTIS 2025</h4>
                    <p className="text-sm text-white/80 mb-4">
                      Rejoignez-nous pour la prochaine édition du salon.
                    </p>
                    <Link
                      href="/billetterie"
                      className="inline-flex items-center gap-2 w-full justify-center bg-[#FF6B35] hover:bg-[#e55a2a] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      Réserver ma place
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* External links for press articles */}
                  {post.category === "presse" && (
                    <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 border border-rose-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-rose-500" />
                        Sources externes
                      </h4>
                      <p className="text-sm text-gray-600">
                        Cet article compile les retombées presse du SALTIS 2025. Consultez les liens dans l&apos;article pour accéder aux sources originales.
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] to-[#083d52]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-white text-sm font-medium">Rejoignez-nous</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Participez à SALTIS 2025
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Découvrez les dernières innovations en IA et technologie lors de notre événement annuel.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/billetterie"
                className="inline-flex items-center gap-2 h-14 px-8 text-lg bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:opacity-90 text-white rounded-xl font-medium transition-all shadow-lg shadow-orange-500/25"
              >
                Réserver ma place
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 h-14 px-8 text-lg border border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl font-medium transition-all"
              >
                Voir tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
