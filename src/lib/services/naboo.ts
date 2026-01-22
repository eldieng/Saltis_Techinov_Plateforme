/**
 * NabooPay Payment Gateway Service
 * Documentation: https://docs.naboopay.com/docs/intro
 * Base URL: https://api.naboopay.com/api/v1
 */

import crypto from "crypto";

export type PaymentMethod = "WAVE" | "ORANGE_MONEY";

export interface NabooProduct {
  name: string;
  category: string;
  amount: number;
  quantity: number;
  description: string;
}

export interface NabooPaymentRequest {
  amount: number;
  currency?: string;
  paymentMethod?: PaymentMethod | PaymentMethod[];
  customerEmail?: string;
  customerPhone?: string;
  customerFirstName?: string;
  customerLastName?: string;
  description: string;
  orderId: string;
  callbackUrl?: string; // webhook URL
  returnUrl: string; // success_url
  cancelUrl: string; // error_url
  metadata?: Record<string, string>;
}

export interface NabooPaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  status?: string;
  error?: string;
  errorCode?: string;
}

export interface NabooTransactionResponse {
  order_id: string;
  checkout_url: string;
  transaction_status: "pending" | "paid" | "failed" | "cancelled";
  created_at: string;
  products: NabooProduct[];
}

export interface NabooWebhookPayload {
  order_id: string;
  transaction_status: "pending" | "paid" | "failed" | "cancelled";
  amount: number;
  method_of_payment: string;
  paid_at?: string;
  failure_reason?: string;
}

class NabooService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NABOO_API_KEY || "";
    this.baseUrl = "https://api.naboopay.com/api/v1";
  }

  /**
   * Create a payment transaction with NabooPay
   * API: PUT /transaction/create-transaction
   */
  async createPayment(request: NabooPaymentRequest): Promise<NabooPaymentResponse> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: "NabooPay API key not configured",
        };
      }

      // Build products array from the order
      const products: NabooProduct[] = [{
        name: request.description,
        category: "Event Ticket",
        amount: request.amount,
        quantity: 1,
        description: `Commande ${request.orderId}`,
      }];

      // Payment methods - default to both Wave and Orange Money
      const methodOfPayment = request.paymentMethod 
        ? (Array.isArray(request.paymentMethod) ? request.paymentMethod : [request.paymentMethod])
        : ["WAVE", "ORANGE_MONEY"];

      const requestBody = {
        method_of_payment: methodOfPayment,
        products,
        success_url: request.returnUrl,
        error_url: request.cancelUrl,
        is_escrow: false,
        is_merchant: true,
        // Store order ID in metadata for webhook reference
        metadata: {
          order_id: request.orderId,
          customer_email: request.customerEmail || "",
          customer_phone: request.customerPhone || "",
          customer_name: `${request.customerFirstName || ""} ${request.customerLastName || ""}`.trim(),
          ...request.metadata,
        },
      };

      console.log("NabooPay request:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${this.baseUrl}/transaction/create-transaction`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("NabooPay response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.detail || "Payment initialization failed",
          errorCode: data.code,
        };
      }

      // NabooPay returns checkout_url and order_id
      return {
        success: true,
        transactionId: data.order_id,
        paymentUrl: data.checkout_url,
        status: data.transaction_status || "pending",
      };
    } catch (error) {
      console.error("NabooPay payment error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get transaction status
   * API: GET /transaction/get-one-transaction/{order_id}
   */
  async getPaymentStatus(transactionId: string): Promise<NabooPaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/${transactionId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Accept": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Failed to get payment status",
        };
      }

      return {
        success: true,
        transactionId: data.order_id,
        status: data.transaction_status,
      };
    } catch (error) {
      console.error("NabooPay status check error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Verify webhook signature (if NabooPay provides one)
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // NabooPay may use a different verification method
    // For now, we'll accept all webhooks but log them
    // Update this when you have the webhook documentation
    if (!signature) return true;
    
    const secretKey = process.env.NABOO_WEBHOOK_SECRET || this.apiKey;
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(payload)
      .digest("hex");
    
    return signature === expectedSignature;
  }

  /**
   * Check if service is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get account information
   * API: GET /account/get-account
   */
  async getAccountInfo(): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/account/get-account`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Accept": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Failed to get account info",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("NabooPay account info error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const nabooService = new NabooService();
export default nabooService;
