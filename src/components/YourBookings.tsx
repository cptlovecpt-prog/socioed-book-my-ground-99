import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Share, QrCode, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useBookings } from "@/contexts/BookingContext";
import { ShareDialog } from "./ShareDialog";
import { QRCodeDialog } from "./QRCodeDialog";

interface YourBookingsProps {
  isSignedIn: boolean;
}

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

const YourBookings = ({ isSignedIn }: YourBookingsProps) => {
  const { bookings, cancelBooking } = useBookings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showQRCodeDialog, setShowQRCodeDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  
  // Filter to only show upcoming bookings
  const upcomingBookings = bookings.filter(booking => booking.status === 'Upcoming');
  
  // Reset to first booking when bookings change (new booking added)
  useEffect(() => {
    setCurrentIndex(0);
  }, [upcomingBookings]);
  
  if (!isSignedIn || upcomingBookings.length === 0) return null;

  // Sort bookings by latest first, prioritizing "Today" and "Tomorrow"
  const sortedBookings = [...upcomingBookings].sort((a, b) => {
    const dateOrder = { "Today": 0, "Tomorrow": 1 };
    const aOrder = dateOrder[a.date as keyof typeof dateOrder] ?? 2;
    const bOrder = dateOrder[b.date as keyof typeof dateOrder] ?? 2;
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    
    // For same category, sort by date string (newest first for regular dates)
    if (aOrder === 2 && bOrder === 2) {
      return new Date(b.date) > new Date(a.date) ? 1 : -1;
    }
    
    return 0;
  });

  const visibleBookings = sortedBookings.slice(0, 3);
  const currentBooking = visibleBookings[currentIndex];

  const nextBooking = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleBookings.length);
  };

  const prevBooking = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleBookings.length) % visibleBookings.length);
  };

  const handleCancelClick = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelDialog(true);
  };

  const handleShareClick = () => {
    setShowShareDialog(true);
  };

  const handleQRCodeClick = () => {
    setShowQRCodeDialog(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel);
      if (currentIndex >= visibleBookings.length - 1) {
        setCurrentIndex(Math.max(0, visibleBookings.length - 2));
      }
    }
    setShowCancelDialog(false);
    setBookingToCancel(null);
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
              <p className="text-sm text-muted-foreground">{currentBooking.participants} • {currentBooking.facilitySize} sq mtrs.</p>
              <p className="text-sm text-muted-foreground">{currentBooking.date} • {convertTo12HourFormat(currentBooking.time)}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={handleShareClick}>
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={handleQRCodeClick}>
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">QR Code</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 text-destructive hover:text-white hover:bg-destructive border-destructive"
                onClick={() => handleCancelClick(currentBooking.id)}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        booking={currentBooking}
      />
      
      <QRCodeDialog
        isOpen={showQRCodeDialog}
        onClose={() => setShowQRCodeDialog(false)}
        booking={currentBooking}
      />
      
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your reservation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel}>
              Yes, Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default YourBookings;