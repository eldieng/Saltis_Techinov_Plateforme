import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import QRCode from "qrcode";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        pass: true,
        order: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Generate QR code as base64
    const qrData = JSON.stringify({
      ticketId: ticket.id,
      event: "SALTIS2025",
      timestamp: Date.now(),
    });

    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 200,
      color: {
        dark: "#0d5a75",
        light: "#ffffff",
      },
    });

    // Generate HTML for the ticket
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Billet - ${ticket.ticketNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .ticket { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 16px; 
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #0d5a75 0%, #0a4a62 100%); 
      color: white; 
      padding: 24px; 
      text-align: center;
    }
    .header h1 { font-size: 24px; margin-bottom: 4px; }
    .header p { opacity: 0.8; font-size: 14px; }
    .pass-badge {
      display: inline-block;
      background: #FF6B35;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-weight: bold;
      margin-top: 12px;
    }
    .content { padding: 24px; }
    .qr-section { 
      text-align: center; 
      padding: 20px;
      border-bottom: 2px dashed #e5e5e5;
    }
    .qr-section img { width: 180px; height: 180px; }
    .ticket-number { 
      font-family: monospace; 
      font-size: 14px; 
      color: #666;
      margin-top: 8px;
    }
    .info-section { padding: 20px 0; }
    .info-row { 
      display: flex; 
      justify-content: space-between; 
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 14px; }
    .info-value { font-weight: 600; color: #333; }
    .event-info {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 12px;
      margin-top: 16px;
    }
    .event-info h3 { color: #0d5a75; margin-bottom: 8px; }
    .event-info p { color: #666; font-size: 14px; line-height: 1.5; }
    .footer {
      background: #f8f9fa;
      padding: 16px 24px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .status-valid { color: #22c55e; }
    .status-used { color: #6b7280; }
    @media print {
      body { background: white; padding: 0; }
      .ticket { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <h1>SALTIS TechInov 2025</h1>
      <p>Salon de l'Intelligence Artificielle</p>
      <div class="pass-badge">${ticket.pass.name}</div>
    </div>
    
    <div class="content">
      <div class="qr-section">
        <img src="${qrCodeDataUrl}" alt="QR Code" />
        <p class="ticket-number">${ticket.ticketNumber}</p>
      </div>
      
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">Titulaire</span>
          <span class="info-value">${ticket.holderFirstName} ${ticket.holderLastName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${ticket.holderEmail}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Statut</span>
          <span class="info-value ${ticket.status === 'VALID' ? 'status-valid' : 'status-used'}">
            ${ticket.status === 'VALID' ? '✓ Valide' : ticket.status === 'USED' ? 'Utilisé' : 'Annulé'}
          </span>
        </div>
      </div>
      
      <div class="event-info">
        <h3>📅 Informations de l'événement</h3>
        <p><strong>Date :</strong> 15-16 Juin 2025</p>
        <p><strong>Lieu :</strong> Musée des Civilisations Noires, Dakar</p>
        <p><strong>Horaires :</strong> 9h00 - 18h00</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Présentez ce QR code à l'entrée de l'événement</p>
      <p>Commande : ${ticket.order.orderNumber}</p>
    </div>
  </div>
  
  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate ticket" },
      { status: 500 }
    );
  }
}
