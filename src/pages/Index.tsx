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
    name: "Table Tennis",
    sport: "Table Tennis",
    capacity: 8,
    available: 6,
    location: "Indoor Hall",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.5,
    votes: 234
  },
  {
    id: "2",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 8,
    available: 5,
    location: "Indoor Hall",
    nextSlot: "12:00 - 14:00",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.3,
    votes: 189
  },
  {
    id: "3",
    name: "Chess Room",
    sport: "Chess",
    capacity: 16,
    available: 12,
    location: "Indoor Hall",
    nextSlot: "09:00 - 18:00",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.7,
    votes: 156
  },
  {
    id: "4",
    name: "Gym",
    sport: "Fitness",
    capacity: 30,
    available: 15,
    location: "Fitness Center",
    nextSlot: "06:00 - 22:00",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    status: 'busy' as const,
    rating: 4.6,
    votes: 542
  },
  {
    id: "5",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 10,
    available: 8,
    location: "Indoor Sports Hall",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.4,
    votes: 287
  },
  {
    id: "6",
    name: "Squash Court",
    sport: "Squash",
    capacity: 4,
    available: 2,
    location: "Indoor Courts",
    nextSlot: "14:00 - 16:00",
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&h=300&fit=crop",
    status: 'busy' as const,
    rating: 4.2,
    votes: 98
  },
  {
    id: "7",
    name: "Paddle Court",
    sport: "Paddle",
    capacity: 4,
    available: 4,
    location: "Indoor Courts",
    nextSlot: "18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1625804803870-ca12de0875e8?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.1,
    votes: 76
  }
];

const outdoorFacilities = [
  {
    id: "8",
    name: "Cricket Ground",
    sport: "Cricket",
    capacity: 22,
    available: 18,
    location: "Main Field",
    nextSlot: "14:00 - 18:00",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.8,
    votes: 456
  },
  {
    id: "9",
    name: "Pickleball Court",
    sport: "Pickleball",
    capacity: 8,
    available: 6,
    location: "Outdoor Courts",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1606506715832-3157661384d4?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.3,
    votes: 123
  },
  {
    id: "10",
    name: "Football Field",
    sport: "Football",
    capacity: 22,
    available: 0,
    location: "Main Field",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    status: 'full' as const,
    rating: 4.7,
    votes: 389
  },
  {
    id: "11",
    name: "Basketball Court",
    sport: "Basketball",
    capacity: 10,
    available: 7,
    location: "Outdoor Courts",
    nextSlot: "12:00 - 14:00",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.5,
    votes: 234
  },
  {
    id: "12",
    name: "Volleyball Court",
    sport: "Volleyball",
    capacity: 12,
    available: 3,
    location: "Beach Courts",
    nextSlot: "18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop",
    status: 'busy' as const,
    rating: 4.4,
    votes: 198
  },
  {
    id: "13",
    name: "Tennis Court",
    sport: "Tennis",
    capacity: 4,
    available: 2,
    location: "Outdoor Courts",
    nextSlot: "10:00 - 12:00",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    status: 'busy' as const,
    rating: 4.6,
    votes: 312
  },
  {
    id: "14",
    name: "Swimming Pool",
    sport: "Swimming",
    capacity: 15,
    available: 12,
    location: "Aquatic Center",
    nextSlot: "08:00 - 10:00",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.9,
    votes: 567
  },
  {
    id: "15",
    name: "Badminton Court",
    sport: "Badminton",
    capacity: 8,
    available: 5,
    location: "Outdoor Courts",
    nextSlot: "16:00 - 18:00",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    status: 'available' as const,
    rating: 4.2,
    votes: 145
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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