import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface FacilityCardProps {
  id: string;
  name: string;
  sport: string;
  capacity: number;
  available: number;
  location: string;
  nextSlot: string;
  image: string;
  status: 'available' | 'full';
  rating: number;
  votes: number;
  onBook: (facilityId: string) => void;
}

export const FacilityCard = ({ 
  id, 
  name, 
  sport, 
  capacity, 
  available, 
  location, 
  nextSlot, 
  image, 
  status,
  rating,
  votes,
  onBook 
}: FacilityCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'available':
        return <Badge className="facility-available">Available</Badge>;
      case 'full':
        return <Badge className="facility-full">Full</Badge>;
    }
  };

  const getSizeForSport = (sport: string) => {
    const sizes: { [key: string]: number } = {
      'Football': 8968,
      'Cricket': 7400,
      'Volleyball': 960,
      'Tennis': 1338,
      'Badminton': 480,
      'Squash': 187,
      'Basketball': 536,
      'Swimming': 1474,
      'Pickleball': 736,
      'Fitness': 382,
      'Padel': 832,
      'Table Tennis': 1200
    };
    return sizes[sport] || 500;
  };

  return (
    <div className="w-[278px]">
      <Card className="booking-card group cursor-pointer overflow-hidden bg-card dark:bg-card relative" onClick={() => onBook(id)}>
        <div className="relative h-[350px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          {/* Gray overlay for full status */}
          {status === 'full' && (
            <div className="absolute inset-0 bg-gray-500/60 z-10" />
          )}
          {/* Drop shadow overlay for text visibility */}
          <div className="absolute inset-x-0 bottom-0 h-[175px] bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20" />
          
          <div className="absolute top-2 left-2 z-30">
            {getStatusBadge()}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 text-white z-30">
            <p className="text-sm text-white/90">{capacity} persons</p>
            <p className="text-sm text-white/90">{location}</p>
          </div>
        </div>
      </Card>
      
      {/* Sport name and size below card as separate text */}
      <div className="mt-3 space-y-1">
        <p className="text-lg font-semibold text-foreground">{sport}</p>
        <p className="text-sm text-muted-foreground">{getSizeForSport(sport)} sq mtrs.</p>
      </div>
    </div>
  );
};