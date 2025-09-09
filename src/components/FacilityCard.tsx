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
  status: 'available' | 'busy' | 'full';
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
      case 'busy':
        return <Badge className="facility-busy">Limited</Badge>;
      case 'full':
        return <Badge className="facility-full">Full</Badge>;
    }
  };

  return (
    <Card className="booking-card group cursor-pointer w-full max-w-[280px] h-64 overflow-hidden bg-card dark:bg-card" onClick={() => onBook(id)}>
      <div className="relative h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Drop shadow overlay for text visibility */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-2 left-2">
          {getStatusBadge()}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 text-white">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium">{rating}/10</span>
            </div>
            <span className="text-xs text-white/70">{votes.toLocaleString()} Votes</span>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>
          <p className="text-sm text-white/70">{sport}</p>
        </div>
      </div>
    </Card>
  );
};