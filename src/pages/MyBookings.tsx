import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Clock, MapPin, Users, Share, QrCode, X } from "lucide-react";
import { useState } from "react";
import { useBookings } from "@/contexts/BookingContext";
import { ShareDialog } from "@/components/ShareDialog";

const MyBookings = () => {
  const [isSignedIn, setIsSignedIn] = useState(true); // Assume signed in to access this page
  const [userData, setUserData] = useState<{ name: string; email: string } | null>({
    name: "John Doe",
    email: "john@example.com"
  });
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [bookingToShare, setBookingToShare] = useState<any>(null);
  
  const { bookings, removeBooking } = useBookings();

  const handleCancelClick = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelDialog(true);
  };

  const handleShareClick = (booking: any) => {
    setBookingToShare(booking);
    setShowShareDialog(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      removeBooking(bookingToCancel);
    }
    setShowCancelDialog(false);
    setBookingToCancel(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        userData={userData}
        setUserData={setUserData}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Bookings</h1>
          <p className="text-muted-foreground">You have {bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <Card className="w-full">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground text-lg">No bookings found</p>
                <p className="text-muted-foreground text-sm mt-2">Book a facility to see it here</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className={`w-full relative ${booking.status === 'Completed' ? 'overflow-hidden' : ''}`}>
                {booking.status === 'Completed' && (
                  <div className="absolute inset-0 bg-gray-500/90 z-10 flex items-center justify-center">
                    <Badge variant="secondary" className="bg-gray-600 text-white border-gray-500 text-lg px-4 py-2">
                      Expired
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{booking.facilityName}</h3>
                        <Badge 
                          variant="secondary" 
                          className={
                            booking.status === 'Upcoming' 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{booking.sport}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{booking.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{booking.date} • {booking.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.participants}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => handleShareClick(booking)}>
                      <Share className="h-4 w-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      <span className="hidden sm:inline">QR Code</span>
                    </Button>
                    {booking.status === 'Upcoming' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 text-destructive hover:text-white hover:bg-destructive border-destructive"
                        onClick={() => handleCancelClick(booking.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="hidden sm:inline">Cancel</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      
      {bookingToShare && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => {
            setShowShareDialog(false);
            setBookingToShare(null);
          }}
          booking={bookingToShare}
        />
      )}
      
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
    </div>
  );
};

export default MyBookings;