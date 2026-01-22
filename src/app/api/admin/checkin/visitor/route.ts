import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER", "HOSTESS"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, organization, source } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Prénom, nom et email sont requis" },
        { status: 400 }
      );
    }

    // Check if visitor already exists
    const existingVisitor = await prisma.visitor.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (existingVisitor) {
      return NextResponse.json(
        { error: "Ce visiteur est déjà enregistré", visitor: existingVisitor },
        { status: 400 }
      );
    }

    const visitor = await prisma.visitor.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone: phone || null,
        organization: organization || null,
        source: source || "walk-in",
        checkedInBy: session.user.id,
        checkedInAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, visitor });
  } catch (error) {
    console.error("Visitor registration error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur lors de l'enregistrement: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER", "HOSTESS"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const visitors = await prisma.visitor.findMany({
      orderBy: { checkedInAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.visitor.count();

    return NextResponse.json({ visitors, total, page, limit });
  } catch (error) {
    console.error("Get visitors error:", error);
    return NextResponse.json({ error: "Failed to get visitors" }, { status: 500 });
  }
}
