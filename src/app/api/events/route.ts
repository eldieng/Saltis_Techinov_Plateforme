import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/events - Get active events with their passes
 */
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { isActive: true },
      include: {
        passes: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Failed to get events" },
      { status: 500 }
    );
  }
}
