import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SALTIS-${timestamp}-${random}`;
}

/**
 * Generate a unique ticket number
 */
export function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TKT-${timestamp}-${random}`;
}

/**
 * Generate QR code for a ticket
 */
export async function generateQRCode(ticketId: string): Promise<string> {
  const qrData = JSON.stringify({
    ticketId,
    event: "SALTIS2025",
    timestamp: Date.now(),
  });
  
  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 300,
    color: {
      dark: "#0d5a75",
      light: "#ffffff",
    },
  });
  
  return qrCodeDataUrl;
}

export interface CreateOrderInput {
  eventId: string;
  customerEmail: string;
  customerPhone: string;
  customerFirstName: string;
  customerLastName: string;
  customerOrganization?: string;
  items: {
    passId: string;
    quantity: number;
  }[];
  userId?: string;
}

/**
 * Create a new order
 */
export async function createOrder(input: CreateOrderInput) {
  // Get pass details and calculate totals
  const passIds = input.items.map((item) => item.passId);
  const passes = await prisma.pass.findMany({
    where: { id: { in: passIds } },
  });

  if (passes.length !== passIds.length) {
    throw new Error("One or more passes not found");
  }

  // Calculate totals
  let subtotal = 0;
  const orderItems = input.items.map((item) => {
    const pass = passes.find((p) => p.id === item.passId)!;
    const itemTotal = pass.price * item.quantity;
    subtotal += itemTotal;
    return {
      passId: item.passId,
      quantity: item.quantity,
      unitPrice: pass.price,
      total: itemTotal,
    };
  });

  const fees = 0; // Can add processing fees here
  const total = subtotal + fees;

  // Create order
  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      eventId: input.eventId,
      userId: input.userId,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      customerFirstName: input.customerFirstName,
      customerLastName: input.customerLastName,
      customerOrganization: input.customerOrganization,
      subtotal,
      fees,
      total,
      status: "PENDING",
      paymentStatus: "PENDING",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          pass: true,
        },
      },
    },
  });

  return order;
}

/**
 * Confirm order and generate tickets after successful payment
 */
export async function confirmOrderAndGenerateTickets(orderId: string, paymentRef: string) {
  // Get order with items
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          pass: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === "CONFIRMED") {
    return order; // Already confirmed
  }

  // Generate tickets for each item
  const ticketsToCreate = [];
  for (const item of order.items) {
    for (let i = 0; i < item.quantity; i++) {
      const ticketNumber = generateTicketNumber();
      const qrCode = uuidv4(); // Unique QR code identifier
      
      ticketsToCreate.push({
        ticketNumber,
        orderId: order.id,
        passId: item.passId,
        userId: order.userId,
        holderEmail: order.customerEmail,
        holderPhone: order.customerPhone,
        holderFirstName: order.customerFirstName,
        holderLastName: order.customerLastName,
        qrCode,
        status: "VALID" as const,
      });
    }
  }

  // Update order and create tickets in a transaction
  const [updatedOrder] = await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "COMPLETED",
        paymentRef,
        paidAt: new Date(),
      },
    }),
    ...ticketsToCreate.map((ticket) =>
      prisma.ticket.create({ data: ticket })
    ),
    // Update sold count for each pass
    ...order.items.map((item) =>
      prisma.pass.update({
        where: { id: item.passId },
        data: { soldCount: { increment: item.quantity } },
      })
    ),
  ]);

  // Generate QR codes for tickets (can be done async)
  const tickets = await prisma.ticket.findMany({
    where: { orderId },
  });

  for (const ticket of tickets) {
    const qrCodeUrl = await generateQRCode(ticket.id);
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { qrCodeUrl },
    });
  }

  return updatedOrder;
}

/**
 * Get order by ID with all related data
 */
export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          pass: true,
        },
      },
      tickets: true,
      payments: true,
    },
  });
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          pass: true,
        },
      },
      tickets: true,
    },
  });
}

/**
 * Cancel expired orders
 */
export async function cancelExpiredOrders() {
  const expiredOrders = await prisma.order.updateMany({
    where: {
      status: "PENDING",
      expiresAt: {
        lt: new Date(),
      },
    },
    data: {
      status: "EXPIRED",
    },
  });

  return expiredOrders.count;
}
