import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin } from "lucide-react";

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
    <Card className="booking-card group cursor-pointer" onClick={() => onBook(id)}>
      <div 
        className="h-48 bg-cover bg-center rounded-t-xl"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="h-full bg-gradient-to-t from-black/60 to-transparent rounded-t-xl flex items-end p-4">
          <div className="text-white">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm opacity-90">{sport}</p>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{available}/{capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-accent" />
          <span className="text-accent font-medium">Next: {nextSlot}</span>
        </div>
        
        <Button 
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" 
          disabled={status === 'full'}
        >
          {status === 'full' ? 'Fully Booked' : 'Book Now'}
        </Button>
      </CardContent>
    </Card>
  );
};