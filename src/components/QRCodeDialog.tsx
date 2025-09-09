import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, MessageCircle, Mail } from "lucide-react";
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
  
  // Utility function to convert 24-hour time to AM/PM format
  const convertTo12HourFormat = (timeRange: string) => {
    const [startTime, endTime] = timeRange.split(' - ');
    
    const convertTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    return `${convertTime(startTime)} - ${convertTime(endTime)}`;
  };
  
  const shareUrl = `${window.location.origin}/join/${booking.id}`;
  const shareText = `Join me for ${booking.sport} at ${booking.facilityName}!\n📅 ${booking.date} at ${convertTo12HourFormat(booking.time)}\n📍 ${booking.location}\n\nBooking ID: ${booking.id}`;

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen, booking.id]);

  const generateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCodeLib.toDataURL(shareUrl, {
        width: 200,
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

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(`Join me for ${booking.sport}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(emailUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-sm leading-tight px-2">
            Show this QR Code at the entrance to get access to your booking
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            {qrCodeUrl ? (
              <div className="p-4 bg-white rounded-lg border">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>
            ) : (
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-medium">{booking.facilityName}</h3>
            <p className="text-sm text-muted-foreground">{booking.sport}</p>
            <p className="text-sm text-muted-foreground">{booking.date} • {convertTo12HourFormat(booking.time)}</p>
            <p className="text-sm text-muted-foreground">{booking.participants} • {booking.facilitySize} sq mtrs.</p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-2 h-12 bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              Share on WhatsApp
            </Button>
            
            <Button
              onClick={handleEmail}
              variant="outline"
              className="w-full flex items-center gap-2 h-12"
            >
              <Mail className="h-5 w-5" />
              Share on Mail
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};