import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exhibitors = await prisma.exhibitor.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ exhibitors });
  } catch (error) {
    console.error("Error fetching exhibitors:", error);
    return NextResponse.json({ error: "Failed to fetch exhibitors" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, logo, website, category, boothNumber } = body;

    const exhibitor = await prisma.exhibitor.create({
      data: { name, description, logo, website, category, boothNumber },
    });

    return NextResponse.json({ exhibitor });
  } catch (error) {
    console.error("Error creating exhibitor:", error);
    return NextResponse.json({ error: "Failed to create exhibitor" }, { status: 500 });
  }
}
