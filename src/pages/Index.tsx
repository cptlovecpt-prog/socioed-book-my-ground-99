import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacilityCard } from "@/components/FacilityCard";
import { BookingModal } from "@/components/BookingModal";
import { UserDashboard } from "@/components/UserDashboard";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";

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
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&h=300&fit=crop",
    status: 'full' as const,
    rating: 4.2,
    votes: 187
  },
  {
    id: "3",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 8,
    available: 5,
    location: "K block",
    nextSlot: "09:00 - 18:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
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
    votes: 1370
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
  }
];

const outdoorFacilities = [
  {
    id: "8",
    name: "Football Ground",
    sport: "Football",
    capacity: 22,
    available: 18,
    location: "Near K block",
    nextSlot: "14:00 - 18:00",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.7,
    votes: 8968
  },
  {
    id: "9",
    name: "Cricket Ground",
    sport: "Cricket",
    capacity: 22,
    available: 18,
    location: "Old Ground",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.8,
    votes: 7400
  },
  {
    id: "10",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 20,
    available: 0,
    location: "Near K block",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    status: 'full' as const,
    rating: 4.5,
    votes: 1252
  },
  {
    id: "11",
    name: "Volleyball Court",
    sport: "Volleyball",
    capacity: 24,
    available: 20,
    location: "Near Gate No. 3",
    nextSlot: "12:00 - 14:00",
    image: "/lovable-uploads/41b5b789-fdcc-40d9-a3d7-323838e4ea3f.png",
    status: 'available' as const,
    rating: 4.4,
    votes: 960
  },
  {
    id: "12",
    name: "Tennis Court",
    sport: "Tennis",
    capacity: 8,
    available: 0,
    location: "Near K block",
    nextSlot: "18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    status: 'full' as const,
    rating: 4.6,
    votes: 1338
  },
  {
    id: "13",
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
    id: "14",
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
    id: "15",
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
    id: "16",
    name: "Half Basketball Court",
    sport: "Basketball",
    capacity: 12,
    available: 10,
    location: "C8-D block",
    nextSlot: "14:00 - 16:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.4,
    votes: 480
  }
];

const Index = () => {
  const [selectedFacility, setSelectedFacility] = useState<(typeof indoorFacilities[0]) | (typeof outdoorFacilities[0]) | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
      <Navigation />
      
      {/* Hero Carousel */}
      <HeroCarousel />

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
    </div>
  );
};

export default Index;