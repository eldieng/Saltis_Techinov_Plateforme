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
    const exhibitor = await prisma.exhibitor.findUnique({ where: { id } });

    if (!exhibitor) {
      return NextResponse.json({ error: "Exhibitor not found" }, { status: 404 });
    }

    return NextResponse.json({ exhibitor });
  } catch (error) {
    console.error("Error fetching exhibitor:", error);
    return NextResponse.json({ error: "Failed to fetch exhibitor" }, { status: 500 });
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
    const { name, description, logo, website, category, boothNumber, isActive, status, contactName, contactEmail, contactPhone, products } = body;

    const exhibitor = await prisma.exhibitor.update({
      where: { id },
      data: { 
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(logo !== undefined && { logo }),
        ...(website !== undefined && { website }),
        ...(category !== undefined && { category }),
        ...(boothNumber !== undefined && { boothNumber }),
        ...(isActive !== undefined && { isActive }),
        ...(status !== undefined && { status }),
        ...(contactName !== undefined && { contactName }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(products !== undefined && { products }),
      },
    });

    return NextResponse.json({ exhibitor });
  } catch (error) {
    console.error("Error updating exhibitor:", error);
    return NextResponse.json({ error: "Failed to update exhibitor" }, { status: 500 });
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
    await prisma.exhibitor.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting exhibitor:", error);
    return NextResponse.json({ error: "Failed to delete exhibitor" }, { status: 500 });
  }
}
