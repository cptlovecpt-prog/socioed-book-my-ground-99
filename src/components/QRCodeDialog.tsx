import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import QRCodeLib from "qrcode";

interface QRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    facilityName: string;
    sport: string;
    date: string;
    time: string;
    location: string;
    participants: string;
    facilitySize: number;
  };
}

export const QRCodeDialog = ({ isOpen, onClose, booking }: QRCodeDialogProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  
  const shareUrl = `${window.location.origin}/join/${booking.id}`;

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen, booking.id]);

  const generateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCodeLib.toDataURL(shareUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full w-screen h-screen p-0 bg-black/95 flex items-center justify-center">
        <DialogHeader className="sr-only">
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            {qrCodeUrl ? (
              <div className="p-8 bg-white rounded-lg">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-80 h-80"
                />
              </div>
            ) : (
              <div className="w-80 h-80 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};