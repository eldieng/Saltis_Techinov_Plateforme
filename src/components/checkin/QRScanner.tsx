"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Loader2, CheckCircle, XCircle } from "lucide-react";

interface QRScannerProps {
  onScan: (qrCode: string) => Promise<{ success: boolean; message: string }>;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = async () => {
    if (!containerRef.current) return;

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Pause scanning while processing
          setIsProcessing(true);
          
          try {
            const response = await onScan(decodedText);
            setResult(response);
            
            // Auto-clear result after 3 seconds
            setTimeout(() => {
              setResult(null);
            }, 3000);
          } catch {
            setResult({ success: false, message: "Erreur lors du scan" });
          } finally {
            setIsProcessing(false);
          }
        },
        () => {
          // QR code not found - ignore
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setResult({ success: false, message: "Impossible d'accéder à la caméra" });
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Scanner Container */}
      <div
        ref={containerRef}
        className="relative bg-gray-900 rounded-xl overflow-hidden"
        style={{ minHeight: isScanning ? "300px" : "200px" }}
      >
        <div id="qr-reader" className="w-full" />

        {!isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Camera className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-sm opacity-70">Cliquez pour activer la caméra</p>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        )}
      </div>

      {/* Result Message */}
      {result && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            result.success
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center">
        {isScanning ? (
          <Button
            onClick={stopScanner}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CameraOff className="w-4 h-4" />
            Arrêter le scanner
          </Button>
        ) : (
          <Button
            onClick={startScanner}
            className="bg-[#0d5a75] hover:bg-[#0d5a75]/90 text-white flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Scanner un QR code
          </Button>
        )}
      </div>
    </div>
  );
}
