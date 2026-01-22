import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nabooService, NabooWebhookPayload } from "@/lib/services/naboo";
import { confirmOrderAndGenerateTickets } from "@/lib/services/orders";

/**
 * POST /api/webhooks/naboo - Handle NabooPay payment webhooks
 * 
 * NabooPay sends webhooks when transaction status changes.
 * Configure this URL in your NabooPay dashboard: https://your-domain.com/api/webhooks/naboo
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-naboo-signature") || 
                      request.headers.get("x-naboopay-signature") || "";

    console.log("NabooPay webhook received - raw body:", rawBody);

    // Verify webhook signature (if provided)
    if (signature && !nabooService.verifyWebhookSignature(rawBody, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload: NabooWebhookPayload = JSON.parse(rawBody);

    console.log("NabooPay webhook payload:", payload);

    // NabooPay uses order_id as the transaction reference
    const nabooOrderId = payload.order_id;
    const transactionStatus = payload.transaction_status;

    // Find the payment record by NabooPay order_id
    const payment = await prisma.payment.findUnique({
      where: { nabooRef: nabooOrderId },
      include: { order: true },
    });

    if (!payment) {
      // Try to find by metadata order_id if stored differently
      console.error("Payment not found for NabooPay order_id:", nabooOrderId);
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Map NabooPay status to our PaymentStatus enum
    type PaymentStatusType = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "REFUNDED";
    const statusMap: Record<string, PaymentStatusType> = {
      "paid": "COMPLETED",
      "pending": "PENDING",
      "failed": "FAILED",
      "cancelled": "CANCELLED",
    };

    const mappedStatus: PaymentStatusType = statusMap[transactionStatus] || "PENDING";

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        nabooStatus: transactionStatus,
        status: mappedStatus,
        failureReason: payload.failure_reason,
        webhookReceived: true,
        metadata: JSON.parse(JSON.stringify(payload)),
      },
    });

    // If payment successful (paid), confirm order and generate tickets
    if (transactionStatus === "paid") {
      await confirmOrderAndGenerateTickets(payment.orderId, nabooOrderId);
      console.log("Order confirmed:", payment.order.orderNumber);
    } else if (transactionStatus === "failed" || transactionStatus === "cancelled") {
      // Update order status
      await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: "CANCELLED",
          paymentStatus: transactionStatus === "failed" ? "FAILED" : "CANCELLED",
        },
      });
      console.log("Order cancelled:", payment.order.orderNumber, "- Reason:", payload.failure_reason);
    }

    return NextResponse.json({ received: true, status: "processed" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/naboo - Health check for webhook endpoint
 */
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "NabooPay webhook endpoint is active",
    timestamp: new Date().toISOString(),
  });
}
