import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      role,
      company,
      bio,
      email,
      phone,
      linkedin,
      topic,
      image,
    } = body;

    // Validation
    if (!name || !role || !company || !bio || !email || !phone || !topic) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Check if speaker with same email already exists
    const existingSpeaker = await prisma.speaker.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

    if (existingSpeaker) {
      return NextResponse.json(
        { error: "Une candidature avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Create speaker with PENDING status
    const speaker = await prisma.speaker.create({
      data: {
        name,
        role,
        company,
        bio,
        email,
        phone,
        linkedin: linkedin || null,
        topic,
        image: image || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidature soumise avec succès",
      speaker: { id: speaker.id, name: speaker.name },
    });
  } catch (error) {
    console.error("Error creating speaker submission:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la soumission" },
      { status: 500 }
    );
  }
}
