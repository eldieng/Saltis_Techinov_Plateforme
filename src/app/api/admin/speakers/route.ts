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

    const speakers = await prisma.speaker.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ speakers });
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return NextResponse.json({ error: "Failed to fetch speakers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, company, bio, image, linkedin, twitter } = body;

    const speaker = await prisma.speaker.create({
      data: { name, role, company, bio, image, linkedin, twitter },
    });

    return NextResponse.json({ speaker });
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json({ error: "Failed to create speaker" }, { status: 500 });
  }
}
