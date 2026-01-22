import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/passes - Get all active passes for an event
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    const where = eventId 
      ? { eventId, isActive: true }
      : { isActive: true };

    const passes = await prisma.pass.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      include: {
        event: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ passes });
  } catch (error) {
    console.error("Get passes error:", error);
    return NextResponse.json(
      { error: "Failed to get passes" },
      { status: 500 }
    );
  }
}
