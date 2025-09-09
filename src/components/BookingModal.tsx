import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Share2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  capacity: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: {
    id: string;
    name: string;
    sport: string;
    location: string;
  } | null;
}

const timeSlots: TimeSlot[] = [
  { id: "1", time: "08:00 - 10:00", available: 8, capacity: 10 },
  { id: "2", time: "10:00 - 12:00", available: 3, capacity: 10 },
  { id: "3", time: "12:00 - 14:00", available: 0, capacity: 10 },
  { id: "4", time: "14:00 - 16:00", available: 7, capacity: 10 },
  { id: "5", time: "16:00 - 18:00", available: 2, capacity: 10 },
  { id: "6", time: "18:00 - 20:00", available: 5, capacity: 10 },
];

export const BookingModal = ({ isOpen, onClose, facility }: BookingModalProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [shareToken] = useState("BK-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const { toast } = useToast();

  const handleBook = () => {
    if (!selectedSlot) return;
    
    setIsBooked(true);
    toast({
      title: "Booking Confirmed!",
      description: `Your spot at ${facility?.name} has been reserved. Share with friends!`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Join my booking: ${window.location.origin}/join/${shareToken}`);
    toast({
      title: "Share Link Copied!",
      description: "Your friends can now join your booking using this link.",
    });
  };

  if (!facility) return null;

  if (isBooked) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Booking Confirmed!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center space-y-2">
              <div className="w-32 h-32 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center">
                <QrCode className="h-16 w-16 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">Show this QR code at entry</p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Facility:</span>
                <span className="font-medium">{facility.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time:</span>
                <span className="font-medium">{timeSlots.find(s => s.id === selectedSlot)?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Share Code:</span>
                <span className="font-mono font-medium">{shareToken}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={onClose} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book {facility.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{facility.sport}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Available Time Slots</h3>
            <div className="grid gap-2">
              {timeSlots.map((slot) => {
                const isAvailable = slot.available > 0;
                const isSelected = selectedSlot === slot.id;
                
                return (
                  <div
                    key={slot.id}
                    onClick={() => isAvailable && setSelectedSlot(slot.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : isAvailable 
                          ? 'border-border hover:border-primary/50' 
                          : 'border-border bg-muted cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isAvailable ? "default" : "secondary"}>
                          {slot.available}/{slot.capacity} spots
                        </Badge>
                        {!isAvailable && <Badge variant="destructive">Full</Badge>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBook} 
              disabled={!selectedSlot}
              className="flex-1 bg-gradient-primary"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};