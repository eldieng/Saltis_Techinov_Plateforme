import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const speaker = await prisma.speaker.findUnique({ where: { id } });

    if (!speaker) {
      return NextResponse.json({ error: "Speaker not found" }, { status: 404 });
    }

    return NextResponse.json({ speaker });
  } catch (error) {
    console.error("Error fetching speaker:", error);
    return NextResponse.json({ error: "Failed to fetch speaker" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, role, company, bio, image, linkedin, twitter, email, phone, topic, status } = body;

    const speaker = await prisma.speaker.update({
      where: { id },
      data: { 
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(company !== undefined && { company }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
        ...(linkedin !== undefined && { linkedin }),
        ...(twitter !== undefined && { twitter }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(topic !== undefined && { topic }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json({ speaker });
  } catch (error) {
    console.error("Error updating speaker:", error);
    return NextResponse.json({ error: "Failed to update speaker" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.speaker.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting speaker:", error);
    return NextResponse.json({ error: "Failed to delete speaker" }, { status: 500 });
  }
}
