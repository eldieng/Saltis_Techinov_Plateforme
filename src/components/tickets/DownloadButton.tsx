"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps {
  ticketIds: string[];
  className?: string;
}

export function DownloadTicketsButton({ ticketIds, className }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Open each ticket in a new window for printing
      for (const ticketId of ticketIds) {
        window.open(`/api/tickets/${ticketId}/pdf`, "_blank");
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className={className}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Préparation...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Télécharger les billets (PDF)
        </>
      )}
    </Button>
  );
}

interface SingleTicketDownloadProps {
  ticketId: string;
  className?: string;
}

export function DownloadTicketButton({ ticketId, className }: SingleTicketDownloadProps) {
  const handleDownload = () => {
    window.open(`/api/tickets/${ticketId}/pdf`, "_blank");
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className={className}
    >
      <Download className="w-4 h-4 mr-2" />
      Télécharger PDF
    </Button>
  );
}
