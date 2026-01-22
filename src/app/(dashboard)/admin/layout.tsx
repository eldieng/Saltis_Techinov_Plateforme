"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

// Pages accessible by HOSTESS role
const HOSTESS_ALLOWED_PATHS = ["/admin/checkin", "/admin/visitors"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // Not authenticated - redirect to login
    if (!session?.user) {
      router.push("/connexion");
      return;
    }

    const userRole = session.user.role;

    // Check if user has access to admin area
    if (!["ADMIN", "ORGANIZER", "HOSTESS"].includes(userRole)) {
      router.push("/dashboard");
      return;
    }

    // HOSTESS can only access check-in and visitors pages
    if (userRole === "HOSTESS") {
      const isAllowed = HOSTESS_ALLOWED_PATHS.some((path) => pathname.startsWith(path));
      if (!isAllowed) {
        router.push("/admin/checkin");
        return;
      }
    }
  }, [session, status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-saltis-primary" />
      </div>
    );
  }

  // Check access before rendering
  if (!session?.user) {
    return null;
  }

  const userRole = session.user.role;

  if (!["ADMIN", "ORGANIZER", "HOSTESS"].includes(userRole)) {
    return null;
  }

  if (userRole === "HOSTESS") {
    const isAllowed = HOSTESS_ALLOWED_PATHS.some((path) => pathname.startsWith(path));
    if (!isAllowed) {
      return null;
    }
  }

  return <>{children}</>;
}
