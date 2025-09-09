import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacilityCard } from "@/components/FacilityCard";
import { BookingModal } from "@/components/BookingModal";
import { UserDashboard } from "@/components/UserDashboard";
import { Calendar, Users, Shield, QrCode } from "lucide-react";
import sportsHero from "@/assets/sports-hero.jpg";

const facilities = [
  {
    id: "1",
    name: "Basketball Court A",
    sport: "Basketball",
    capacity: 10,
    available: 8,
    location: "Sports Center",
    nextSlot: "14:00 - 16:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    status: 'available' as const
  },
  {
    id: "2", 
    name: "Tennis Court 2",
    sport: "Tennis",
    capacity: 4,
    available: 2,
    location: "Outdoor Courts",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    status: 'busy' as const
  },
  {
    id: "3",
    name: "Football Field",
    sport: "Football",
    capacity: 22,
    available: 0,
    location: "Main Field",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    status: 'full' as const
  },
  {
    id: "4",
    name: "Swimming Pool",
    sport: "Swimming",
    capacity: 15,
    available: 12,
    location: "Aquatic Center",
    nextSlot: "08:00 - 10:00",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
    status: 'available' as const
  },
  {
    id: "5",
    name: "Badminton Court 1",
    sport: "Badminton", 
    capacity: 8,
    available: 5,
    location: "Indoor Hall",
    nextSlot: "12:00 - 14:00",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    status: 'available' as const
  },
  {
    id: "6",
    name: "Volleyball Court",
    sport: "Volleyball",
    capacity: 12,
    available: 3,
    location: "Beach Courts",
    nextSlot: "18:00 - 20:00", 
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop",
    status: 'busy' as const
  }
];

const Index = () => {
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBooking = (facilityId: string) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${sportsHero})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Book Sports Facilities
              <span className="block text-transparent bg-gradient-to-r from-primary-glow to-accent bg-clip-text">
                Instantly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Reserve courts, pools, and fields at your university. Share with friends and check-in with QR codes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Facilities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our Booking System?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for university sports facilities with features that make booking and sharing easy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="booking-card text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Share with Friends</h3>
              <p className="text-muted-foreground">
                Invite friends to join your booking using shareable links. Up to 4 bookings per week.
              </p>
            </div>
            
            <div className="booking-card text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">QR Check-in</h3>
              <p className="text-muted-foreground">
                Show your QR code at the facility entrance for quick and contactless check-in.
              </p>
            </div>
            
            <div className="booking-card text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">University SSO</h3>
              <p className="text-muted-foreground">
                Secure login with your university credentials. No need for additional accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="facilities" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="facilities">Browse Facilities</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="facilities" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Available Facilities</h2>
                <p className="text-muted-foreground">
                  Choose from our wide range of sports facilities
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                  <FacilityCard
                    key={facility.id}
                    {...facility}
                    onBook={handleBooking}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <UserDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        facility={selectedFacility}
      />
    </div>
  );
};

export default Index;