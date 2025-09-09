import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share, QrCode, X } from "lucide-react";

interface YourBookingsProps {
  isSignedIn: boolean;
}

const YourBookings = ({ isSignedIn }: YourBookingsProps) => {
  if (!isSignedIn) return null;

  // Mock booking data - in real app this would come from API
  const currentBooking = {
    facility: "Football Ground",
    location: "Near K block",
    date: "Today",
    time: "14:00 - 16:00",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop"
  };

  return (
    <section 
      className="h-[250px] bg-primary/10 border-y border-border"
      style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Your Bookings</h2>
        </div>
        
        <div className="flex items-center h-full max-h-[180px]">
          <Card className="flex items-center space-x-4 p-4 bg-card/80 backdrop-blur-sm border border-border/50 w-full max-w-4xl">
            {/* Booking Image */}
            <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={currentBooking.image} 
                alt={currentBooking.facility}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Booking Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{currentBooking.facility}</h3>
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
              <Button variant="outline" size="sm" className="flex items-center space-x-1 text-destructive hover:text-destructive">
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