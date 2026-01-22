import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createOrder } from "@/lib/services/orders";
import { nabooService } from "@/lib/services/naboo";

/**
 * POST /api/orders - Create a new order and initiate payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      eventId,
      customerEmail,
      customerPhone,
      customerFirstName,
      customerLastName,
      customerOrganization,
      items,
    } = body;

    // Validate required fields
    if (!eventId || !customerEmail || !customerPhone || !customerFirstName || !customerLastName || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create order
    const order = await createOrder({
      eventId,
      customerEmail,
      customerPhone,
      customerFirstName,
      customerLastName,
      customerOrganization,
      items,
    });

    // If total is 0 (free pass), confirm immediately
    if (order.total === 0) {
      const { confirmOrderAndGenerateTickets } = await import("@/lib/services/orders");
      await confirmOrderAndGenerateTickets(order.id, "FREE");
      
      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: "CONFIRMED",
        },
        redirectUrl: `/billetterie/confirmation/${order.orderNumber}`,
      });
    }

    // Initiate payment with Naboo
    if (!nabooService.isConfigured()) {
      // For development without Naboo configured
      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
          status: order.status,
        },
        message: "Payment gateway not configured. Order created in pending state.",
        // In production, this would be the Naboo payment URL
        paymentUrl: null,
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const isProduction = appUrl.startsWith("https://");
    
    // NabooPay requires HTTPS URLs - only use in production
    if (!isProduction) {
      // Development mode: Skip NabooPay, confirm order directly for testing
      console.log("DEV MODE: Skipping NabooPay (requires HTTPS). Confirming order directly.");
      
      const { confirmOrderAndGenerateTickets } = await import("@/lib/services/orders");
      await confirmOrderAndGenerateTickets(order.id, "DEV_TEST");
      
      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: "CONFIRMED",
          total: order.total,
        },
        redirectUrl: `/billetterie/confirmation/${order.orderNumber}`,
        message: "Mode développement: Paiement simulé avec succès",
      });
    }
    
    // Production: Use NabooPay
    const paymentResponse = await nabooService.createPayment({
      amount: order.total,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      description: `SALTIS TechInov 2025 - ${order.orderNumber}`,
      orderId: order.id,
      returnUrl: `${appUrl}/billetterie/confirmation/${order.orderNumber}`,
      cancelUrl: `${appUrl}/billetterie?cancelled=true`,
    });

    if (!paymentResponse.success) {
      // Update order with payment failure
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED" },
      });

      return NextResponse.json(
        { error: paymentResponse.error || "Payment initialization failed" },
        { status: 400 }
      );
    }

    // Store payment reference with NabooPay order_id
    await prisma.payment.create({
      data: {
        orderId: order.id,
        nabooRef: paymentResponse.transactionId!, // NabooPay order_id
        paymentMethod: "NABOOPAY", // Will be updated by webhook with actual method
        amount: order.total,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
      },
      paymentUrl: paymentResponse.paymentUrl,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create order" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders?orderNumber=XXX - Get order by order number
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Order number is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
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

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { error: "Failed to get order" },
      { status: 500 }
    );
  }
}
