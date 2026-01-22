import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !["ADMIN", "ORGANIZER", "HOSTESS"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Search in tickets (registered participants)
    const tickets = await prisma.ticket.findMany({
      where: {
        OR: [
          { holderFirstName: { contains: query, mode: "insensitive" } },
          { holderLastName: { contains: query, mode: "insensitive" } },
          { holderEmail: { contains: query, mode: "insensitive" } },
          { ticketNumber: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        pass: { select: { name: true } },
        order: { select: { customerOrganization: true } },
      },
      take: 10,
    });

    // Search in users by organization
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { organization: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        tickets: {
          include: { pass: { select: { name: true } } },
          take: 1,
        },
      },
      take: 10,
    });

    // Search in speakers
    const speakers = await prisma.speaker.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { company: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    // Search in exhibitors
    const exhibitors = await prisma.exhibitor.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ],
        isActive: true,
      },
      take: 10,
    });

    // Search in visitors (already registered walk-ins)
    let visitors: Array<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      organization: string | null;
      checkedInAt: Date;
    }> = [];
    
    try {
      visitors = await prisma.visitor.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { organization: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      });
    } catch (visitorError) {
      console.error("Visitor search error (model may not exist yet):", visitorError);
    }

    // Format results - deduplicate by collecting ticket IDs from users
    const userTicketIds = new Set(users.flatMap((u) => u.tickets.map((t) => t.id)));

    // Format results
    const results = [
      ...tickets
        .filter((t) => !userTicketIds.has(t.id))
        .map((t) => ({
          id: t.id,
          type: "ticket" as const,
          name: `${t.holderFirstName} ${t.holderLastName}`,
          email: t.holderEmail,
          phone: t.holderPhone,
          details: `${t.pass.name}${t.order.customerOrganization ? ` - ${t.order.customerOrganization}` : ""}`,
          status: t.status,
          checkedIn: t.status === "USED",
          checkedInAt: t.checkedInAt,
        })),
      ...users.map((u) => ({
        id: u.id,
        type: "user" as const,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        phone: u.phone,
        details: u.organization || (u.tickets[0]?.pass?.name ? `Ticket: ${u.tickets[0].pass.name}` : "Utilisateur inscrit"),
        status: null,
        checkedIn: false,
        checkedInAt: null,
      })),
      ...speakers.map((s) => ({
        id: s.id,
        type: "speaker" as const,
        name: s.name,
        email: null,
        phone: null,
        details: `Speaker - ${s.role} @ ${s.company}`,
        status: null,
        checkedIn: s.checkedIn,
        checkedInAt: s.checkedInAt,
      })),
      ...exhibitors.map((e) => ({
        id: e.id,
        type: "exhibitor" as const,
        name: e.name,
        email: null,
        phone: null,
        details: `Exposant - ${e.category}${e.boothNumber ? ` - Stand ${e.boothNumber}` : ""}`,
        status: null,
        checkedIn: e.checkedIn,
        checkedInAt: e.checkedInAt,
      })),
      ...visitors.map((v) => ({
        id: v.id,
        type: "visitor" as const,
        name: `${v.firstName} ${v.lastName}`,
        email: v.email,
        phone: v.phone,
        details: v.organization || "Visiteur",
        status: null,
        checkedIn: true,
        checkedInAt: v.checkedInAt,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
