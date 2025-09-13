import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, MapPin, Camera, AlertTriangle, Clock, Users } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { SPORT_IMAGES } from "@/constants/images";

export default function ManageFacilities() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmChangesDialogOpen, setIsConfirmChangesDialogOpen] = useState(false);
  const [isConfirmAddDialogOpen, setIsConfirmAddDialogOpen] = useState(false);
  const [isCancelConfirmDialogOpen, setIsCancelConfirmDialogOpen] = useState(false);
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
    type: "",
    tag: "Active",
    maintenanceComment: "",
    slots: [] as Array<{
      id: string;
      startTime: string;
      endTime: string;
      minParticipants: string;
      maxParticipants: string;
    }>
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [facilities, setFacilities] = useState([
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
      image: SPORT_IMAGES.CRICKET,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.BASKETBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.VOLLEYBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.TENNIS,
      tag: "Active",
      maintenanceComment: ""
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
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
      tag: "Active",
      maintenanceComment: ""
    },
    {
      id: 6,
      name: "Squash",
      location: "K block",
      sport: "Squash",
      size: "9.75 x 6.4",
      capacity: "6 persons",
      status: "Down for Maintenance",
      pricePerHour: 200,
      type: "indoor",
      area: "187",
      image: SPORT_IMAGES.SQUASH,
      tag: "Down for Maintenance",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.BASKETBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.BASKETBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.TENNIS,
      tag: "Active",
      maintenanceComment: ""
    },
    {
      id: 12,
      name: "Badminton German",
      location: "German Hanger",
      sport: "Badminton",
      size: "13.4 x 6.1",
      capacity: "10 persons",
      status: "Down for Maintenance",
      pricePerHour: 250,
      type: "indoor",
      area: "1120",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
      tag: "Down for Maintenance",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.FOOTBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.BASKETBALL,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.SQUASH,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.CHESS,
      tag: "Active",
      maintenanceComment: ""
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
      image: SPORT_IMAGES.BASKETBALL,
      tag: "Active",
      maintenanceComment: ""
    }
  ]);

  const handleEditClick = (facility: any) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      location: facility.location,
      sport: facility.sport,
      size: facility.size,
      capacity: facility.capacity,
      image: facility.image,
      type: facility.type || "indoor",
      tag: facility.tag || "Active",
      maintenanceComment: facility.maintenanceComment || "",
      slots: facility.slots || []
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
    if (field === 'tag' && value !== 'Schedule for Maintenance') {
      // Clear maintenance comment when changing away from maintenance
      setFormData(prev => ({ ...prev, [field]: value, maintenanceComment: "" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };


  const handleConfirmChanges = () => {
    // Check if all required fields are filled
    const requiredFields = [
      { key: 'name', label: 'Facility Name' },
      { key: 'location', label: 'Location' },
      { key: 'sport', label: 'Sport' },
      { key: 'size', label: 'Size' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'image', label: 'Facility Image' },
      { key: 'type', label: 'Facility Type' },
      { key: 'tag', label: 'Tag' }
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field.key as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in all required fields: ${emptyFields.map(f => f.label).join(', ')}.`,
        variant: "destructive",
      });
      return;
    }

    // Check if there are any changes
    const hasChanges = 
      formData.name !== editingFacility.name ||
      formData.location !== editingFacility.location ||
      formData.sport !== editingFacility.sport ||
      formData.size !== editingFacility.size ||
      formData.capacity !== editingFacility.capacity ||
      formData.image !== editingFacility.image ||
      formData.type !== (editingFacility.type || "indoor") ||
      formData.tag !== (editingFacility.tag || "Active") ||
      formData.maintenanceComment !== (editingFacility.maintenanceComment || "");

    if (!hasChanges) {
      // No changes made, close modal directly
      setIsEditModalOpen(false);
      setEditingFacility(null);
      return;
    }

    // Changes detected, show confirmation dialog
    setIsConfirmChangesDialogOpen(true);
  };

  const handleSaveChanges = () => {
    console.log("Updating facility:", editingFacility.id, "with data:", formData);
    // Here you would typically update the facility in your backend/state
    setFacilities(prevFacilities => 
      prevFacilities.map(facility => 
        facility.id === editingFacility.id 
          ? { ...facility, ...formData }
          : facility
      )
    );
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
      type: "indoor",
      tag: "Active",
      maintenanceComment: "",
      slots: []
    });
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleConfirmAdd = () => {
    // Check if all fields are filled
    const requiredFields = ['name', 'location', 'sport', 'size', 'capacity', 'image', 'type', 'tag'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before adding the facility.",
        variant: "destructive",
      });
      return;
    }
    
    setIsConfirmAddDialogOpen(true);
  };

  const handleSaveNewFacility = () => {
    console.log("Adding new facility with data:", formData);
    // Add the facility to the state
    const newId = Math.max(...facilities.map(f => f.id)) + 1;
    const newFacility = {
      id: newId,
      name: formData.name,
      location: formData.location,
      sport: formData.sport,
      size: formData.size,
      capacity: formData.capacity,
      image: formData.image,
      type: formData.type,
      status: "Active",
      pricePerHour: 0,
      area: "0",
      tag: formData.tag,
      maintenanceComment: formData.maintenanceComment
    };
    setFacilities(prev => [...prev, newFacility]);
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
    // Check if there are any changes before closing
    const hasChanges = editingFacility && (
      formData.name !== editingFacility.name ||
      formData.location !== editingFacility.location ||
      formData.sport !== editingFacility.sport ||
      formData.size !== editingFacility.size ||
      formData.capacity !== editingFacility.capacity ||
      formData.image !== editingFacility.image ||
      formData.type !== (editingFacility.type || "indoor") ||
      formData.tag !== (editingFacility.tag || "Active") ||
      formData.maintenanceComment !== (editingFacility.maintenanceComment || "")
    );

    if (hasChanges) {
      setIsCancelConfirmDialogOpen(true);
    } else {
      setIsEditModalOpen(false);
      setEditingFacility(null);
    }
  };

  const handleCancelConfirm = () => {
    setIsCancelConfirmDialogOpen(false);
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleCancelCancel = () => {
    setIsCancelConfirmDialogOpen(false);
  };

  const handleDeleteClick = (facility: any) => {
    setDeletingFacility(facility);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting facility:", deletingFacility.id);
    // Remove the facility from the state
    setFacilities(prevFacilities => 
      prevFacilities.filter(facility => facility.id !== deletingFacility.id)
    );
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

  // Slot management functions
  const handleAddSlot = () => {
    const newSlot = {
      id: Date.now().toString(),
      startTime: "06:00",
      endTime: "07:30",
      minParticipants: "2",
      maxParticipants: "10"
    };
    setFormData(prev => ({
      ...prev,
      slots: [...prev.slots, newSlot]
    }));
  };

  const handleSlotChange = (slotId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      slots: prev.slots.map(slot => 
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const handleDeleteSlot = (slotId: string) => {
    setFormData(prev => ({
      ...prev,
      slots: prev.slots.filter(slot => slot.id !== slotId)
    }));
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
              {(facility.status === "Down for Maintenance" || facility.tag === "Schedule for Maintenance") && (
                <div className="absolute inset-0 bg-gray-500/80"></div>
              )}
              {facility.tag === "Schedule for Maintenance" && facility.maintenanceComment && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="font-bold text-black text-sm">{facility.maintenanceComment}</p>
                  </div>
                </div>
              )}
              <Badge 
                className={`absolute top-2 right-2 ${
                  (facility.status === "Active" && facility.tag !== "Schedule for Maintenance")
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-amber-700 hover:bg-amber-800 text-white"
                }`}
              >
                {facility.tag === "Schedule for Maintenance" ? "Down for Maintenance" : facility.status}
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
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-start">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(facility)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleDeleteClick(facility)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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
        <DialogContent className="sm:max-w-[500px] [&>button]:hidden">
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
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum image size allowed is 50kb in .jpeg, .jpg or .png format only
              </p>
            </div>

            {/* 1st Row: Facility Name and Facility Type */}
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
            </div>

            {/* 2nd Row: Location and Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
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

            {/* 3rd Row: Sport and Capacity */}
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
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Enter capacity (e.g., 22 players)"
                />
              </div>
            </div>

            {/* 4th Row: Tag */}
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Select value={formData.tag} onValueChange={(value) => handleInputChange('tag', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Schedule for Maintenance">Schedule for Maintenance</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Fixed space for maintenance comment - always present to avoid layout shift */}
              <div className="min-h-[2.5rem] flex items-center">
                {formData.tag === 'Schedule for Maintenance' && (
                  <div className="w-full">
                    {formData.maintenanceComment ? (
                      <div 
                        className="text-sm text-muted-foreground px-2 py-1 bg-muted/30 rounded cursor-pointer truncate" 
                        title={formData.maintenanceComment}
                        onClick={() => {
                          const newComment = prompt("Edit maintenance comment (max 100 characters):", formData.maintenanceComment);
                          if (newComment !== null && newComment.length <= 100) {
                            handleInputChange('maintenanceComment', newComment);
                          }
                        }}
                      >
                        {formData.maintenanceComment}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="text-sm text-muted-foreground px-2 py-1 bg-muted/30 rounded hover:bg-muted/50 transition-colors w-full text-left"
                        onClick={() => {
                          const comment = prompt("Enter maintenance comment (max 100 characters):");
                          if (comment !== null && comment.length <= 100) {
                            handleInputChange('maintenanceComment', comment);
                          }
                        }}
                      >
                        Click to add maintenance comment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Slots Management Section */}
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Time Slots</Label>
                  <p className="text-sm text-muted-foreground">Manage available time slots for this facility</p>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddSlot}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Slot
                </Button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.slots.map((slot, index) => (
                  <div key={slot.id} className="border rounded-lg p-4 bg-muted/30">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`startTime-${slot.id}`}>Start Time</Label>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`startTime-${slot.id}`}
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => handleSlotChange(slot.id, 'startTime', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`endTime-${slot.id}`}>End Time</Label>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`endTime-${slot.id}`}
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => handleSlotChange(slot.id, 'endTime', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`minParticipants-${slot.id}`}>Min Participants</Label>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`minParticipants-${slot.id}`}
                            type="number"
                            min="1"
                            value={slot.minParticipants}
                            onChange={(e) => handleSlotChange(slot.id, 'minParticipants', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`maxParticipants-${slot.id}`}>Max Participants</Label>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`maxParticipants-${slot.id}`}
                            type="number"
                            min="1"
                            value={slot.maxParticipants}
                            onChange={(e) => handleSlotChange(slot.id, 'maxParticipants', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Slot
                      </Button>
                    </div>
                  </div>
                ))}
                
                {formData.slots.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No time slots added yet</p>
                    <p className="text-sm">Click "Add Slot" to create the first time slot</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
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
        <DialogContent className="sm:max-w-[500px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Add Facility</DialogTitle>
            <DialogDescription>
              Add a new facility card.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Image Section */}
            <div className="space-y-2">
              <Label>Facility Image <span className="text-red-500">*</span></Label>
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
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum image size allowed is 50kb in .jpeg, .jpg or .png format only
              </p>
            </div>

            {/* 1st Row: Facility Name and Facility Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Facility Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter facility name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Facility Type <span className="text-red-500">*</span></Label>
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
            </div>

            {/* 2nd Row: Location and Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Size <span className="text-red-500">*</span></Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="Enter size (e.g., 120 x 80)"
                />
              </div>
            </div>

            {/* 3rd Row: Sport and Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sport">Sport <span className="text-red-500">*</span></Label>
                <Input
                  id="sport"
                  value={formData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  placeholder="Enter sport type"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity <span className="text-red-500">*</span></Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Enter capacity (e.g., 22 players)"
                />
              </div>
            </div>

            {/* 4th Row: Tag */}
            <div className="space-y-2">
              <Label htmlFor="tag">Tag <span className="text-red-500">*</span></Label>
              <Select value={formData.tag} onValueChange={(value) => handleInputChange('tag', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Schedule for Maintenance">Schedule for Maintenance</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Fixed space for maintenance comment - always present to avoid layout shift */}
              <div className="min-h-[2.5rem] flex items-center">
                {formData.tag === 'Schedule for Maintenance' && (
                  <div className="w-full">
                    {formData.maintenanceComment ? (
                      <div 
                        className="text-sm text-muted-foreground px-2 py-1 bg-muted/30 rounded cursor-pointer truncate" 
                        title={formData.maintenanceComment}
                        onClick={() => {
                          const newComment = prompt("Edit maintenance comment (max 100 characters):", formData.maintenanceComment);
                          if (newComment !== null && newComment.length <= 100) {
                            handleInputChange('maintenanceComment', newComment);
                          }
                        }}
                      >
                        {formData.maintenanceComment}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="text-sm text-muted-foreground px-2 py-1 bg-muted/30 rounded hover:bg-muted/50 transition-colors w-full text-left"
                        onClick={() => {
                          const comment = prompt("Enter maintenance comment (max 100 characters):");
                          if (comment !== null && comment.length <= 100) {
                            handleInputChange('maintenanceComment', comment);
                          }
                        }}
                      >
                        Click to add maintenance comment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
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

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelConfirmDialogOpen} onOpenChange={handleCancelCancel}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to cancel without saving?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelCancel}>
              Stay
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}