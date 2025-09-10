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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmChangesDialogOpen, setIsConfirmChangesDialogOpen] = useState(false);
  const [isConfirmAddDialogOpen, setIsConfirmAddDialogOpen] = useState(false);
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
      name: "Cricket",
      location: "Old Ground",
      sport: "Cricket",
      size: "120 x 80",
      capacity: "22 persons",
      status: "Active",
      pricePerHour: 500,
      type: "outdoor",
      area: "7400",
      image: "/lovable-uploads/02fe3dda-03b5-4600-9dec-0565eb90e485.png"
    },
    {
      id: 2,
      name: "Basketball",
      location: "Near K block",
      sport: "Basketball",
      size: "28 x 15",
      capacity: "20 persons",
      status: "Active",
      pricePerHour: 400,
      type: "outdoor",
      area: "1252",
      image: "/lovable-uploads/13f55e31-dbbf-4013-9810-91c3cbb90e0a.png"
    },
    {
      id: 3,
      name: "Volleyball",
      location: "Near Gate No. 3",
      sport: "Volleyball",
      size: "18 x 9",
      capacity: "24 persons",
      status: "Active",
      pricePerHour: 350,
      type: "outdoor",
      area: "960",
      image: "/lovable-uploads/30c311d0-0531-4989-b2cf-446fa8a581ed.png"
    },
    {
      id: 4,
      name: "Tennis",
      location: "Near K block",
      sport: "Tennis",
      size: "23.77 x 8.23",
      capacity: "8 persons",
      status: "Active",
      pricePerHour: 300,
      type: "outdoor",
      area: "1338",
      image: "/lovable-uploads/3a13d82d-5544-4379-a3e4-a65a065f42f8.png"
    },
    {
      id: 5,
      name: "Badminton",
      location: "A block",
      sport: "Badminton",
      size: "13.4 x 6.1",
      capacity: "12 persons",
      status: "Active",
      pricePerHour: 250,
      type: "indoor",
      area: "480",
      image: "/lovable-uploads/41b5b789-fdcc-40d9-a3d7-323838e4ea3f.png"
    },
    {
      id: 6,
      name: "Squash",
      location: "K block",
      sport: "Squash",
      size: "9.75 x 6.4",
      capacity: "6 persons",
      status: "Active",
      pricePerHour: 200,
      type: "indoor",
      area: "187",
      image: "/lovable-uploads/691656f8-b703-46bf-a786-c3ef0507018f.png"
    },
    {
      id: 7,
      name: "Basketball Indoor",
      location: "K block",
      sport: "Basketball",
      size: "28 x 15",
      capacity: "20 persons",
      status: "Active",
      pricePerHour: 450,
      type: "indoor",
      area: "336",
      image: "/lovable-uploads/75efefc8-6f39-47ce-b08c-18e3336f2ada.png"
    },
    {
      id: 8,
      name: "Swimming",
      location: "K block",
      sport: "Swimming",
      size: "50 x 25",
      capacity: "35 persons",
      status: "Active",
      pricePerHour: 600,
      type: "outdoor",
      area: "1474",
      image: "/lovable-uploads/78147606-33bf-41e6-9575-8f1950aff715.png"
    },
    {
      id: 9,
      name: "Basketball Near H",
      location: "Near H block",
      sport: "Basketball",
      size: "28 x 15",
      capacity: "40 persons",
      status: "Active",
      pricePerHour: 450,
      type: "indoor",
      area: "336",
      image: "/lovable-uploads/7db2248d-16a0-4a56-bae5-8a61c1a607e7.png"
    },
    {
      id: 10,
      name: "Gym",
      location: "D6",
      sport: "Fitness",
      size: "20 x 15",
      capacity: "40 persons",
      status: "Active",
      pricePerHour: 300,
      type: "indoor",
      area: "308",
      image: "/lovable-uploads/8ba8443e-fd66-4b90-842c-e8cea7b3b146.png"
    },
    {
      id: 11,
      name: "Tennis Indoor",
      location: "New Building",
      sport: "Tennis",
      size: "23.77 x 8.23",
      capacity: "40 persons",
      status: "Active",
      pricePerHour: 400,
      type: "indoor",
      area: "382",
      image: "/lovable-uploads/923283f5-8027-43fb-b25c-080ee8310656.png"
    },
    {
      id: 12,
      name: "Badminton German",
      location: "German Hanger",
      sport: "Badminton",
      size: "13.4 x 6.1",
      capacity: "10 persons",
      status: "Active",
      pricePerHour: 250,
      type: "indoor",
      area: "1120",
      image: "/lovable-uploads/ab1aee87-6cbc-4ad4-ab3e-a52aae6cf731.png"
    },
    {
      id: 13,
      name: "Hockey",
      location: "C & D Block",
      sport: "Hockey",
      size: "91.4 x 55",
      capacity: "22 persons",
      status: "Active",
      pricePerHour: 500,
      type: "outdoor",
      area: "261",
      image: "/lovable-uploads/b935a6aa-5073-48e5-9c0f-2e74d806ecaa.png"
    },
    {
      id: 14,
      name: "Badminton Outdoor",
      location: "C & D Block",
      sport: "Badminton",
      size: "13.4 x 6.1",
      capacity: "8 persons",
      status: "Active",
      pricePerHour: 200,
      type: "outdoor",
      area: "174",
      image: "/lovable-uploads/bf8cc990-c9ef-41ee-85fe-9fb459ca0ff6.png"
    },
    {
      id: 15,
      name: "Basketball C&D",
      location: "C & D Block",
      sport: "Basketball",
      size: "28 x 15",
      capacity: "12 persons",
      status: "Active",
      pricePerHour: 350,
      type: "outdoor",
      area: "480",
      image: "/lovable-uploads/de8033c6-2e20-42bf-8b5e-88753e101116.png"
    },
    {
      id: 16,
      name: "Squash C1-C12",
      location: "C1-C12 Block",
      sport: "Squash",
      size: "9.75 x 6.4",
      capacity: "18 persons",
      status: "Active",
      pricePerHour: 200,
      type: "indoor",
      area: "332",
      image: "/lovable-uploads/f5824fb2-7c1a-4759-89eb-628b108960b7.png"
    },
    {
      id: 17,
      name: "Chess",
      location: "C12 Block",
      sport: "Chess",
      size: "10 x 10",
      capacity: "10 persons",
      status: "Active",
      pricePerHour: 100,
      type: "indoor",
      area: "2048",
      image: "/lovable-uploads/fdffe92f-f5b1-4ab3-9e26-bf822ff29b7e.png"
    },
    {
      id: 18,
      name: "Basketball Chennai",
      location: "Chennai Block",
      sport: "Basketball",
      size: "28 x 15",
      capacity: "18 persons",
      status: "Active",
      pricePerHour: 350,
      type: "outdoor",
      area: "200",
      image: "/lovable-uploads/02fe3dda-03b5-4600-9dec-0565eb90e485.png"
    }
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
    setIsConfirmChangesDialogOpen(true);
  };

  const handleSaveChanges = () => {
    console.log("Updating facility:", editingFacility.id, "with data:", formData);
    // Here you would typically update the facility in your backend/state
    toast({
      title: "Changes Saved",
      description: `${formData.name} has been updated successfully.`,
    });
    setIsConfirmChangesDialogOpen(false);
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleCancelSave = () => {
    setIsConfirmChangesDialogOpen(false);
  };

  const handleAddFacilityClick = () => {
    // Reset form data for new facility
    setFormData({
      name: "",
      location: "",
      sport: "",
      size: "",
      capacity: "",
      image: "",
      type: "indoor"
    });
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleConfirmAdd = () => {
    setIsConfirmAddDialogOpen(true);
  };

  const handleSaveNewFacility = () => {
    console.log("Adding new facility with data:", formData);
    // Here you would typically add the facility to your backend/state
    toast({
      title: "Facility Added",
      description: `${formData.name} has been added to Book Your Ground successfully.`,
    });
    setIsConfirmAddDialogOpen(false);
    setIsAddModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsConfirmAddDialogOpen(false);
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
        <Button onClick={handleAddFacilityClick}>
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
              <CardTitle>{facility.name}</CardTitle>
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
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{facility.type}</span>
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
                  <span className="text-muted-foreground">Area:</span>
                  <span>{facility.area} Sq. Mtrs</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(facility)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <div className="w-px bg-border h-8"></div>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(facility)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
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

      {/* Add Facility Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Facility</DialogTitle>
            <DialogDescription>
              Add a new facility card.
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
            <Button variant="outline" onClick={handleAddModalClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAdd}>
              Add Facility
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

      {/* Save Changes Confirmation Dialog */}
      <Dialog open={isConfirmChangesDialogOpen} onOpenChange={handleCancelSave}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the changes made to <strong>{editingFacility?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelSave}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Yes, Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Add Facility Confirmation Dialog */}
      <Dialog open={isConfirmAddDialogOpen} onOpenChange={handleCancelAdd}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Add Facility</DialogTitle>
            <DialogDescription>
              Are you sure you want to add <strong>{formData.name}</strong> to Book Your Ground?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelAdd}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewFacility}>
              Yes, Add Facility
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}