import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, Share, QrCode } from "lucide-react";

const MyBookings = () => {
  const bookings = [
    {
      id: "BK-ABC123",
      title: "Basketball Court A",
      sport: "Basketball",
      date: "Today",
      time: "14:00 - 16:00",
      location: "Sports Center",
      participants: "8/10 joined",
      status: "Upcoming"
    },
    {
      id: "BK-XYZ789",
      title: "Tennis Court 2",
      sport: "Tennis",
      date: "Tomorrow",
      time: "10:00 - 12:00",
      location: "Outdoor Courts",
      participants: "3/4 joined",
      status: "Upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Bookings</h1>
          <p className="text-muted-foreground">You have 2/4 bookings this week</p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="w-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{booking.title}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
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
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button className="flex items-center gap-2 flex-1">
                    <QrCode className="h-4 w-4" />
                    QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;