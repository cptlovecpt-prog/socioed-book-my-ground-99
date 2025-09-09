import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacilityCard } from "@/components/FacilityCard";
import { BookingModal } from "@/components/BookingModal";
import { UserDashboard } from "@/components/UserDashboard";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import YourBookings from "@/components/YourBookings";

const indoorFacilities = [
  {
    id: "1",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 12,
    available: 8,
    location: "K block",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.3,
    votes: 480
  },
  {
    id: "2",
    name: "Squash Court",
    sport: "Squash",
    capacity: 6,
    available: 0,
    location: "K block",
    nextSlot: "12:00 - 14:00",
    image: "/lovable-uploads/de8033c6-2e20-42bf-8b5e-88753e101116.png",
    status: 'full' as const,
    rating: 4.2,
    votes: 187
  },
  {
    id: "3",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 10,
    available: 5,
    location: "K block",
    nextSlot: "09:00 - 18:00",
    image: "/lovable-uploads/8ba8443e-fd66-4b90-842c-e8cea7b3b146.png",
    status: 'available' as const,
    rating: 4.4,
    votes: 536
  },
  {
    id: "4",
    name: "Gym",
    sport: "Gym",
    capacity: 40,
    available: 25,
    location: "K block",
    nextSlot: "06:00 - 22:00",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.6,
    votes: 382
  },
  {
    id: "5",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 10,
    available: 7,
    location: "German House",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.2,
    votes: 187
  },
  {
    id: "6",
    name: "Padel Court",
    sport: "Padel",
    capacity: 8,
    available: 0,
    location: "C11-C12 block",
    nextSlot: "14:00 - 16:00",
    image: "/lovable-uploads/30c311d0-0531-4989-b2cf-446fa8a581ed.png",
    status: 'full' as const,
    rating: 4.1,
    votes: 832
  },
  {
    id: "7",
    name: "Table Tennis",
    sport: "Table Tennis",
    capacity: 48,
    available: 35,
    location: "Hostel Blocks",
    nextSlot: "18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.5,
    votes: 1200
  },
  {
    id: "8",
    name: "Chess Room",
    sport: "Chess",
    capacity: 10,
    available: 6,
    location: "K block",
    nextSlot: "16:00 - 18:00",
    image: "/lovable-uploads/02fe3dda-03b5-4600-9dec-0565eb90e485.png",
    status: 'available' as const,
    rating: 4.1,
    votes: 1048
  }
];

const outdoorFacilities = [
  {
    id: "9",
    name: "Football Ground",
    sport: "Football",
    capacity: 22,
    available: 18,
    location: "Near K block",
    nextSlot: "14:00 - 18:00",
    image: "/lovable-uploads/3a13d82d-5544-4379-a3e4-a65a065f42f8.png",
    status: 'available' as const,
    rating: 4.7,
    votes: 8968
  },
  {
    id: "10",
    name: "Cricket Ground",
    sport: "Cricket",
    capacity: 22,
    available: 18,
    location: "Old Ground",
    nextSlot: "10:00 - 12:00",
    image: "/lovable-uploads/ab1aee87-6cbc-4ad4-ab3e-a52aae6cf731.png",
    status: 'available' as const,
    rating: 4.8,
    votes: 7400
  },
  {
    id: "11",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 20,
    available: 0,
    location: "Near K block",
    nextSlot: "16:00 - 18:00",
    image: "/lovable-uploads/8ba8443e-fd66-4b90-842c-e8cea7b3b146.png",
    status: 'full' as const,
    rating: 4.5,
    votes: 1252
  },
  {
    id: "12",
    name: "Volleyball Court",
    sport: "Volleyball",
    capacity: 24,
    available: 20,
    location: "Near Gate No. 3",
    nextSlot: "12:00 - 14:00",
    image: "/lovable-uploads/f5824fb2-7c1a-4759-89eb-628b108960b7.png",
    status: 'available' as const,
    rating: 4.4,
    votes: 960
  },
  {
    id: "13",
    name: "Tennis Court",
    sport: "Tennis",
    capacity: 8,
    available: 0,
    location: "Near K block",
    nextSlot: "18:00 - 20:00",
    image: "/lovable-uploads/fdffe92f-f5b1-4ab3-9e26-bf822ff29b7e.png",
    status: 'full' as const,
    rating: 4.6,
    votes: 1338
  },
  {
    id: "14",
    name: "Swimming Pool",
    sport: "Swimming",
    capacity: 35,
    available: 25,
    location: "N block",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.9,
    votes: 1474
  },
  {
    id: "15",
    name: "Pickleball Courts",
    sport: "Pickleball",
    capacity: 40,
    available: 0,
    location: "Near H block",
    nextSlot: "08:00 - 10:00",
    image: "/lovable-uploads/75efefc8-6f39-47ce-b08c-18e3336f2ada.png",
    status: 'full' as const,
    rating: 4.3,
    votes: 736
  },
  {
    id: "16",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 12,
    available: 8,
    location: "C10-C11 block",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.2,
    votes: 261
  },
  {
    id: "17",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 8,
    available: 6,
    location: "C & D block",
    nextSlot: "14:00 - 16:00",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.1,
    votes: 174
  },
  {
    id: "18",
    name: "Half Basketball Court",
    sport: "Basketball",
    capacity: 12,
    available: 10,
    location: "C & D block",
    nextSlot: "14:00 - 16:00",
    image: "/lovable-uploads/8ba8443e-fd66-4b90-842c-e8cea7b3b146.png",
    status: 'available' as const,
    rating: 4.4,
    votes: 480
  }
];

const Index = () => {
  const [selectedFacility, setSelectedFacility] = useState<(typeof indoorFacilities[0]) | (typeof outdoorFacilities[0]) | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Default to false - user needs to sign in
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  const handleBooking = (facilityId: string) => {
    const allFacilities = [...indoorFacilities, ...outdoorFacilities];
    const facility = allFacilities.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        userData={userData}
        setUserData={setUserData}
      />
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Your Bookings Section - shown when signed in */}
      <YourBookings isSignedIn={isSignedIn} />

      {/* Facility Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="outdoor" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="outdoor" className="text-lg font-bold">Outdoor</TabsTrigger>
              <TabsTrigger value="indoor" className="text-lg font-bold">Indoor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="outdoor">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {outdoorFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.id}
                    {...facility}
                    onBook={handleBooking}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="indoor">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {indoorFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.id}
                    {...facility}
                    onBook={handleBooking}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        facility={selectedFacility}
      />
      
      <Footer />
    </div>
  );
};

export default Index;