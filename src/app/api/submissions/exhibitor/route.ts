import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      website,
      category,
      contactName,
      contactEmail,
      contactPhone,
      products,
    } = body;

    // Validation
    if (!name || !description || !category || !contactName || !contactEmail || !contactPhone || !products) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Check if exhibitor with same name already exists
    const existingExhibitor = await prisma.exhibitor.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existingExhibitor) {
      return NextResponse.json(
        { error: "Une organisation avec ce nom existe déjà" },
        { status: 400 }
      );
    }

    // Create exhibitor with PENDING status
    const exhibitor = await prisma.exhibitor.create({
      data: {
        name,
        description,
        website: website || null,
        category,
        contactName,
        contactEmail,
        contactPhone,
        products,
        status: "PENDING",
        isActive: false, // Will be activated when approved
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidature soumise avec succès",
      exhibitor: { id: exhibitor.id, name: exhibitor.name },
    });
  } catch (error) {
    console.error("Error creating exhibitor submission:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la soumission" },
      { status: 500 }
    );
  }
}
