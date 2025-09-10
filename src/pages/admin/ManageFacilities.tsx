import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, MapPin, Camera, AlertTriangle } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ManageFacilities() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);
  const [deletingFacility, setDeletingFacility] = useState<any>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    sport: "",
    size: "",
    capacity: "",
    image: "",
    type: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const facilities = [
    {
      id: 1,
      name: "Cricket Ground",
      location: "Old Ground",
      sport: "Cricket",
      size: "120 x 80",
      capacity: "22 players",
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
      capacity: "22 players",
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
      capacity: "4 players",
      status: "Maintenance",
      pricePerHour: 300,
      image: "/lovable-uploads/30c311d0-0531-4989-b2cf-446fa8a581ed.png"
    },
  ];

  const handleEditClick = (facility: any) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      location: facility.location,
      sport: facility.sport,
      size: facility.size,
      capacity: facility.capacity,
      image: facility.image,
      type: facility.type || "indoor"
    });
    setIsEditModalOpen(true);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmChanges = () => {
    console.log("Updating facility:", editingFacility.id, "with data:", formData);
    // Here you would typically update the facility in your backend/state
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleDeleteClick = (facility: any) => {
    setDeletingFacility(facility);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting facility:", deletingFacility.id);
    // Here you would typically delete the facility from your backend/state
    toast({
      title: "Facility Deleted",
      description: `${deletingFacility.name} has been permanently deleted.`,
      variant: "destructive",
    });
    setIsDeleteDialogOpen(false);
    setDeletingFacility(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeletingFacility(null);
  };

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
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(facility)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(facility)}>
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
                  <span className="text-muted-foreground">Capacity:</span>
                  <span>{facility.capacity}</span>
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

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Facility</DialogTitle>
            <DialogDescription>
              Make changes to the facility details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Image Section */}
            <div className="space-y-2">
              <Label>Facility Image</Label>
              <div 
                className="relative aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-colors overflow-hidden"
                onClick={handleImageClick}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Facility"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Click to select image</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-sm flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Image
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum image size allowed is 50kb in .jpeg, .jpg or .png format only
              </p>
            </div>

            {/* Facility Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Facility Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Facility Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter facility name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sport">Sport</Label>
                <Input
                  id="sport"
                  value={formData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  placeholder="Enter sport type"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="Enter size (e.g., 120 x 80)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                placeholder="Enter capacity (e.g., 22 players)"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirmChanges}>
              Confirm Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={handleDeleteCancel}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Facility
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete <strong>{deletingFacility?.name}</strong>. 
              This cannot be undone. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}