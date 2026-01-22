"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Salon", href: "/salon" },
  { name: "Programme", href: "/programme" },
  { name: "Speakers", href: "/speakers" },
  { name: "Exposants", href: "/exposants" },
  { name: "P.A.S Challenge", href: "/pag-challenge" },
  { name: "IAS", href: "/ias" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // Only use transparent header on homepage
  const isHomePage = pathname === "/";
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "ORGANIZER";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Use dark text if not on homepage OR if scrolled
  const useDarkText = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkText
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logos */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/Logo-SALTIS.png"
              alt="SALTIS Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <Image
              src={useDarkText ? "/images/IAS - Logo.png" : "/images/ias-image.jpg"}
              alt="IAS Logo"
              width={100}
              height={50}
              className="h-10 w-auto rounded"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#FF6B35] ${
                  useDarkText ? "text-gray-700" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${
                      useDarkText
                        ? "text-[#0d5a75] hover:text-[#0d5a75]/80"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0d5a75] flex items-center justify-center text-white text-sm font-medium">
                      {session.user?.firstName?.charAt(0) || session.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden xl:inline">
                      {session.user?.firstName || session.user?.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{session.user?.firstName} {session.user?.lastName}</p>
                    <p className="text-gray-500 text-xs">{session.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Mon espace
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Administration
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                className={`${
                  useDarkText
                    ? "text-[#0d5a75] hover:text-[#0d5a75]/80"
                    : "text-white hover:text-white/80"
                }`}
                asChild
              >
                <Link href="/login">Connexion</Link>
              </Button>
            )}
            <Button
              variant="outline"
              className={`${
                useDarkText
                  ? "border-[#0d5a75] text-[#0d5a75] hover:bg-[#0d5a75]/10"
                  : "border-white text-white hover:bg-white/10 bg-transparent"
              }`}
              asChild
            >
              <a href="/devenir-partenaire">Devenir Partenaire</a>
            </Button>
            <Button
              className="bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] hover:from-[#e85a2a] hover:to-[#FF6B35] text-white shadow-lg"
              asChild
            >
              <a href="/billetterie">Réserver ma place</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={useDarkText ? "text-[#0d5a75]" : "text-white"}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/images/Logo-SALTIS.png"
                    alt="SALTIS Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <Image
                    src="/images/IAS - Logo.png"
                    alt="IAS Logo"
                    width={80}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-[#FF6B35] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <div className="pt-6 space-y-4">
                  {session ? (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[#0d5a75] flex items-center justify-center text-white font-medium">
                          {session.user?.firstName?.charAt(0) || session.user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {session.user?.firstName} {session.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{session.user?.email}</p>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full border-[#0d5a75] text-[#0d5a75]"
                          asChild
                        >
                          <Link href={isAdmin ? "/admin" : "/dashboard"}>
                            {isAdmin ? "Administration" : "Mon espace"}
                          </Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Déconnexion
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="w-full border-[#0d5a75] text-[#0d5a75]"
                        asChild
                      >
                        <Link href="/login">Connexion</Link>
                      </Button>
                    </SheetClose>
                  )}
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#0d5a75] text-[#0d5a75]"
                      asChild
                    >
                      <a href="/devenir-partenaire">Devenir Partenaire</a>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white"
                      asChild
                    >
                      <a href="/billetterie">Réserver ma place</a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
