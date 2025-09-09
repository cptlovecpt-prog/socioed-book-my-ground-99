import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share, QrCode, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useBookings } from "@/contexts/BookingContext";

interface YourBookingsProps {
  isSignedIn: boolean;
}

const YourBookings = ({ isSignedIn }: YourBookingsProps) => {
  const { bookings, removeBooking } = useBookings();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Reset to first booking when bookings change (new booking added)
  useEffect(() => {
    setCurrentIndex(0);
  }, [bookings]);
  
  if (!isSignedIn || bookings.length === 0) return null;

  const visibleBookings = bookings.slice(0, 3);
  const currentBooking = visibleBookings[currentIndex];

  const nextBooking = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleBookings.length);
  };

  const prevBooking = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleBookings.length) % visibleBookings.length);
  };

  const handleCancel = (bookingId: string) => {
    removeBooking(bookingId);
    if (currentIndex >= visibleBookings.length - 1) {
      setCurrentIndex(Math.max(0, visibleBookings.length - 2));
    }
  };

  return (
    <section 
      className="h-[250px] bg-primary/10 border-y border-border"
      style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 h-full">
        <div className="flex items-center justify-between mb-0.5">
          <h2 className="text-3xl font-bold text-foreground">Your Bookings</h2>
          {visibleBookings.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {visibleBookings.length}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevBooking}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextBooking}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center h-full max-h-[180px]">
          <Card className="flex items-center space-x-4 p-4 bg-card/80 backdrop-blur-sm border border-border/50 w-full max-w-4xl">
            {/* Booking Image */}
            <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={currentBooking.image} 
                alt={currentBooking.facilityName}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Booking Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{currentBooking.facilityName}</h3>
              <p className="text-sm text-muted-foreground">{currentBooking.location}</p>
              <p className="text-sm text-muted-foreground">{currentBooking.date} • {currentBooking.time}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">QR Code</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 text-destructive hover:text-white hover:bg-destructive border-destructive"
                onClick={() => handleCancel(currentBooking.id)}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default YourBookings;