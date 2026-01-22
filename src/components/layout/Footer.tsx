import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  navigation: [
    { name: "Accueil", href: "/" },
    { name: "Le Salon", href: "/salon" },
    { name: "Programme", href: "/programme" },
    { name: "Speakers", href: "/speakers" },
    { name: "Exposants", href: "/exposants" },
    { name: "Blog", href: "/blog" },
  ],
  resources: [
    { name: "P.A.S Challenge", href: "/pag-challenge" },
    { name: "IAS", href: "/ias" },
    { name: "Billetterie", href: "/billetterie" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Confidentialité", href: "/confidentialite" },
    { name: "CGV", href: "/cgv" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61562152750423",
    icon: Facebook,
  },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/saltis-techinov/",
    icon: Linkedin,
  },
  { name: "Instagram", href: "#", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d5a75] via-[#0a4a62] to-[#083d52]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/10 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Pre-footer CTA */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-orange-500 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SALTIS TechInov 2025</h3>
                <p className="text-white/70">25-26 Novembre 2025 • Musée des Civilisations Noires, Dakar</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/billetterie"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25"
              >
                Réserver ma place
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/devenir-partenaire"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-colors bg-transparent"
              >
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/LOGO-MONOCHROME-SALTIS.png"
                alt="SALTIS Logo"
                width={140}
                height={70}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-white/70 leading-relaxed max-w-sm">
              Le plus grand Salon de l&apos;Intelligence Artificielle en Afrique
              de l&apos;Ouest. Un événement incontournable dédié à l&apos;innovation
              technologique au Sénégal.
            </p>
            
            {/* Newsletter mini */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium text-white">Newsletter</span>
              </div>
              <p className="text-xs text-white/60 mb-3">Restez informé des dernières actualités</p>
              <Link 
                href="/contact" 
                className="text-[#FF6B35] text-sm font-medium hover:underline inline-flex items-center gap-1"
              >
                S&apos;inscrire <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#FF6B35] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#FF6B35] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <span className="text-white/70 text-sm">
                  Musée des Civilisations Noires, Dakar, Sénégal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <a
                  href="tel:+221772221885"
                  className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm"
                >
                  +221 77 222 18 85
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <a
                  href="mailto:info@saltis-techinov.org"
                  className="text-white/70 hover:text-[#FF6B35] transition-colors text-sm"
                >
                  info@saltis-techinov.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center gap-2">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} SALTIS TechInov.
              </p>
              <span className="text-white/30">•</span>
              <p className="text-white/50 text-sm">
                Propulsé par l&apos;Institut des Algorithmes du Sénégal
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/50 hover:text-[#FF6B35] transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
