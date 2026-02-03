import {
  HeroSection,
  StatsSection,
  AboutSection,
  GetPassSection,
  SpeakersSection,
  PartnersSection,
  CTASection,
  NewsletterSection,
  PASChallengeSection,
  IASSection,
  BlogSection,
  GallerySection,
} from "@/components/home";

export const dynamic = 'force-dynamic'; // Always fetch fresh data

export default function Home() {
  return (
    <>
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-orange-50" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0d5a75]/20 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF6B35]/15 rounded-full blur-[100px] translate-x-1/4" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#0d5a75]/15 rounded-full blur-[100px] translate-y-1/4" />
      </div>
      
      {/* Content */}
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <PASChallengeSection />
      <IASSection />
      <GetPassSection />
      <SpeakersSection />
      <GallerySection />
      <BlogSection />
      <CTASection />
      <PartnersSection />
      <NewsletterSection />
    </>
  );
}
