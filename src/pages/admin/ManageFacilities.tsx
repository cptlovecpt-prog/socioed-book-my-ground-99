import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";

export default function ManageFacilities() {
  const facilities = [
    {
      id: 1,
      name: "Cricket Ground",
      location: "Old Ground",
      sport: "Cricket",
      size: "120 x 80",
      status: "Active",
      pricePerHour: 500,
      image: "/lovable-uploads/02fe3dda-03b5-4600-9dec-0565eb90e485.png"
    },
    {
      id: 2,
      name: "Football Field",
      location: "New Ground",
      sport: "Football",
      size: "100 x 60",
      status: "Active",
      pricePerHour: 600,
      image: "/lovable-uploads/13f55e31-dbbf-4013-9810-91c3cbb90e0a.png"
    },
    {
      id: 3,
      name: "Tennis Court",
      location: "Sports Complex",
      sport: "Tennis",
      size: "23.77 x 8.23",
      status: "Maintenance",
      pricePerHour: 300,
      image: "/lovable-uploads/30c311d0-0531-4989-b2cf-446fa8a581ed.png"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Facilities</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage sports facilities
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Facility
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <Card key={facility.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant={facility.status === "Active" ? "default" : "secondary"}
              >
                {facility.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {facility.name}
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {facility.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sport:</span>
                  <span>{facility.sport}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{facility.size} mtrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price/Hour:</span>
                  <span className="font-medium">₹{facility.pricePerHour}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}