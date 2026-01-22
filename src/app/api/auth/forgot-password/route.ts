import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ 
        message: "Si un compte existe, un email a été envoyé" 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // For now, just log the token (in production, send email)
    // TODO: Implement email sending with a service like Resend, SendGrid, etc.
    console.log("=== PASSWORD RESET REQUEST ===");
    console.log(`User: ${user.email}`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Reset URL: ${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`);
    console.log(`Expires: ${resetTokenExpiry}`);
    console.log("==============================");

    // In a real implementation, you would:
    // 1. Store the token in the database (add resetToken and resetTokenExpiry fields to User model)
    // 2. Send an email with the reset link
    // 3. Create a /reset-password page to handle the token

    return NextResponse.json({ 
      message: "Si un compte existe, un email a été envoyé" 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
