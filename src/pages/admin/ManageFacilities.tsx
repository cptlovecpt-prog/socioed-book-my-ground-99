import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, MapPin, Camera, AlertTriangle, Clock, Users, ChevronLeft, ChevronRight, Check } from "lucide-react";
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
  const [isMaintenanceCommentDialogOpen, setIsMaintenanceCommentDialogOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);
  const [deletingFacility, setDeletingFacility] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [originalFormData, setOriginalFormData] = useState<any>(null);
  const [maintenanceCommentInput, setMaintenanceCommentInput] = useState("");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    sport: "",
    size: "",
    capacity: "",
    minParticipants: "",
    maxParticipants: "",
    image: "",
    type: "",
    tag: "Active",
    maintenanceComment: "",
    courts: [] as Array<{
      id: string;
      name: string;
      type: string;
    }>,
    slots: [] as Array<{
      id: string;
      startTime: string;
      endTime: string;
      minParticipants: string;
      maxParticipants: string;
    }>,
    spots: [] as Array<{
      id: string;
      name: string;
      location: string;
      capacity: string;
    }>
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "Facility Details",
    "Manage Courts", 
    "Manage Slots",
    "Manage Spots",
    "Review Changes",
    "Confirm"
  ];

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
    const initialData = {
      name: facility.name,
      location: facility.location,
      sport: facility.sport,
      size: facility.size,
      capacity: facility.capacity,
      minParticipants: facility.minParticipants || "2",
      maxParticipants: facility.maxParticipants || "10",
      image: facility.image,
      type: facility.type || "indoor",
      tag: facility.tag || "Active",
      maintenanceComment: facility.maintenanceComment || "",
      courts: facility.courts || [],
      slots: facility.slots || [],
      spots: facility.spots || []
    };
    setFormData(initialData);
    setOriginalFormData(JSON.parse(JSON.stringify(initialData)));
    setCurrentStep(0);
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
    if (field === 'tag' && value === 'Schedule for Maintenance') {
      setIsMaintenanceCommentDialogOpen(true);
      setMaintenanceCommentInput("");
    } else if (field === 'tag' && value !== 'Schedule for Maintenance') {
      // Clear maintenance comment when changing away from maintenance
      setFormData(prev => ({ ...prev, [field]: value, maintenanceComment: "" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleMaintenanceCommentSave = () => {
    if (maintenanceCommentInput.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        tag: 'Schedule for Maintenance',
        maintenanceComment: maintenanceCommentInput 
      }));
      setIsMaintenanceCommentDialogOpen(false);
    } else {
      toast({
        title: "Comment Required",
        description: "Please enter a maintenance comment to proceed.",
        variant: "destructive",
      });
    }
  };

  const handleMaintenanceCommentCancel = () => {
    setIsMaintenanceCommentDialogOpen(false);
    // Reset tag to previous value if it was maintenance
    if (formData.tag === 'Schedule for Maintenance') {
      setFormData(prev => ({ ...prev, tag: "Active" }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // Prevent going back if maintenance comment is required and not entered
      if (currentStep === 0 && formData.tag === 'Schedule for Maintenance' && !formData.maintenanceComment) {
        toast({
          title: "Maintenance Comment Required",
          description: "Please enter a maintenance comment before going back.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const getChangedFields = () => {
    if (!originalFormData) return [];
    const changes = [];
    
    Object.keys(formData).forEach(key => {
      if (key === 'courts' || key === 'slots' || key === 'spots') {
        if (JSON.stringify(formData[key]) !== JSON.stringify(originalFormData[key])) {
          changes.push(key);
        }
      } else if (formData[key] !== originalFormData[key]) {
        changes.push(key);
      }
    });
    
    return changes;
  };

  const handleConfirmChanges = () => {
    // Check if all required fields are filled
    const requiredFields = [
      { key: 'name', label: 'Facility Name' },
      { key: 'location', label: 'Location' },
      { key: 'sport', label: 'Sport' },
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
    const hasChanges = getChangedFields().length > 0;

    if (!hasChanges) {
      // No changes made, close modal directly
      setIsEditModalOpen(false);
      setEditingFacility(null);
      return;
    }

    // Save changes
    console.log("Updating facility:", editingFacility.id, "with data:", formData);
    setFacilities(prevFacilities => 
      prevFacilities.map(facility => 
        facility.id === editingFacility.id 
          ? { ...facility, ...formData }
          : facility
      )
    );
    toast({
      title: "Changes Published",
      description: `${formData.name} has been updated successfully.`,
    });
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleAddFacilityClick = () => {
    // Reset form data for new facility
    const initialData = {
      name: "",
      location: "",
      sport: "",
      size: "",
      capacity: "",
      minParticipants: "2",
      maxParticipants: "10",
      image: "",
      type: "indoor",
      tag: "Active",
      maintenanceComment: "",
      courts: [],
      slots: [],
      spots: []
    };
    setFormData(initialData);
    setOriginalFormData(JSON.parse(JSON.stringify(initialData)));
    setCurrentStep(0);
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
    setIsEditModalOpen(false);
    setEditingFacility(null);
  };

  const handleDeleteClick = (facility: any) => {
    setDeletingFacility(facility);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting facility:", deletingFacility.id);
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

  // Court management functions
  const handleAddCourt = () => {
    const newCourt = {
      id: Date.now().toString(),
      name: `Court ${formData.courts.length + 1}`,
      type: "Standard"
    };
    setFormData(prev => ({
      ...prev,
      courts: [...prev.courts, newCourt]
    }));
  };

  const handleCourtChange = (courtId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      courts: prev.courts.map(court => 
        court.id === courtId ? { ...court, [field]: value } : court
      )
    }));
  };

  const handleDeleteCourt = (courtId: string) => {
    setFormData(prev => ({
      ...prev,
      courts: prev.courts.filter(court => court.id !== courtId)
    }));
  };

  // Spot management functions
  const handleAddSpot = () => {
    const newSpot = {
      id: Date.now().toString(),
      name: `Spot ${formData.spots.length + 1}`,
      location: "",
      capacity: "1"
    };
    setFormData(prev => ({
      ...prev,
      spots: [...prev.spots, newSpot]
    }));
  };

  const handleSpotChange = (spotId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      spots: prev.spots.map(spot => 
        spot.id === spotId ? { ...spot, [field]: value } : spot
      )
    }));
  };

  const handleDeleteSpot = (spotId: string) => {
    setFormData(prev => ({
      ...prev,
      spots: prev.spots.filter(spot => spot.id !== spotId)
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

      {/* Edit Modal - Multi-step Wizard */}
      <Dialog open={isEditModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-[600px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Edit Facility - {steps[currentStep]}</DialogTitle>
            <DialogDescription>
              Step {currentStep + 1} of {steps.length}
            </DialogDescription>
          </DialogHeader>
          
          {/* Step Progress */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {/* Step 0: Facility Details */}
            {currentStep === 0 && (
              <>
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

                {/* First row: Facility Name | Location */}
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

                {/* Second row: Sport | Capacity */}
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

                {/* Third row: Min Participants | Max Participants */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minParticipants">Min Participants</Label>
                    <Input
                      id="minParticipants"
                      type="number"
                      min="1"
                      value={formData.minParticipants}
                      onChange={(e) => handleInputChange('minParticipants', e.target.value)}
                      placeholder="Enter minimum participants"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="1"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                      placeholder="Enter maximum participants"
                    />
                  </div>
                </div>

                {/* Fourth row: Tag and comment space below */}
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
                  
                  {formData.tag === 'Schedule for Maintenance' && formData.maintenanceComment && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <Label className="text-sm font-medium">Maintenance Comment</Label>
                      <p className="text-sm text-muted-foreground mt-1">{formData.maintenanceComment}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 1: Manage Courts */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Manage Courts</Label>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove courts for this facility</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddCourt}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Court
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.courts.map((court) => (
                    <div key={court.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`courtName-${court.id}`}>Court Name</Label>
                          <Input
                            id={`courtName-${court.id}`}
                            value={court.name}
                            onChange={(e) => handleCourtChange(court.id, 'name', e.target.value)}
                            placeholder="Enter court name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`courtType-${court.id}`}>Court Type</Label>
                          <Input
                            id={`courtType-${court.id}`}
                            value={court.type}
                            onChange={(e) => handleCourtChange(court.id, 'type', e.target.value)}
                            placeholder="Enter court type"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCourt(court.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Court
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {formData.courts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No courts added yet. Click "Add Court" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Manage Slots */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Manage Time Slots</Label>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove time slots for this facility</p>
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
                  {formData.slots.map((slot) => (
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
                          <Label htmlFor={`slotMinParticipants-${slot.id}`}>Min Participants</Label>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`slotMinParticipants-${slot.id}`}
                              type="number"
                              min="1"
                              value={slot.minParticipants}
                              onChange={(e) => handleSlotChange(slot.id, 'minParticipants', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`slotMaxParticipants-${slot.id}`}>Max Participants</Label>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`slotMaxParticipants-${slot.id}`}
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
                      <p>No time slots added yet. Click "Add Slot" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Manage Spots */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Manage Spots</Label>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove spots for this facility</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddSpot}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Spot
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.spots.map((spot) => (
                    <div key={spot.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`spotName-${spot.id}`}>Spot Name</Label>
                          <Input
                            id={`spotName-${spot.id}`}
                            value={spot.name}
                            onChange={(e) => handleSpotChange(spot.id, 'name', e.target.value)}
                            placeholder="Enter spot name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`spotLocation-${spot.id}`}>Location</Label>
                          <Input
                            id={`spotLocation-${spot.id}`}
                            value={spot.location}
                            onChange={(e) => handleSpotChange(spot.id, 'location', e.target.value)}
                            placeholder="Enter spot location"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`spotCapacity-${spot.id}`}>Capacity</Label>
                          <Input
                            id={`spotCapacity-${spot.id}`}
                            type="number"
                            min="1"
                            value={spot.capacity}
                            onChange={(e) => handleSpotChange(spot.id, 'capacity', e.target.value)}
                            placeholder="Enter capacity"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSpot(spot.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Spot
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {formData.spots.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No spots added yet. Click "Add Spot" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review Changes */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Review Changes</Label>
                  <p className="text-sm text-muted-foreground">Review all changes before publishing</p>
                </div>
                
                <div className="space-y-3">
                  {getChangedFields().length > 0 ? (
                    getChangedFields().map((field) => (
                      <div key={field} className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800 capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">From:</span>
                            <p className="font-mono bg-red-100 px-2 py-1 rounded mt-1">
                              {field === 'courts' || field === 'slots' || field === 'spots' 
                                ? `${originalFormData?.[field]?.length || 0} items`
                                : originalFormData?.[field] || 'Not set'
                              }
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">To:</span>
                            <p className="font-mono bg-green-100 px-2 py-1 rounded mt-1">
                              {field === 'courts' || field === 'slots' || field === 'spots'
                                ? `${formData[field].length} items`
                                : formData[field] || 'Not set'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Check className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No changes detected</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Confirm */}
            {currentStep === 5 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <Label className="text-base font-semibold">Ready to Publish</Label>
                  <p className="text-sm text-muted-foreground mt-2">
                    All changes have been reviewed and are ready to be published. 
                    Click "Publish Changes" to save your updates.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="button" onClick={handleConfirmChanges}>
                  <Check className="h-4 w-4 mr-2" />
                  Publish Changes
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Comment Dialog */}
      <Dialog open={isMaintenanceCommentDialogOpen} onOpenChange={() => setIsMaintenanceCommentDialogOpen(false)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Maintenance Comment Required</DialogTitle>
            <DialogDescription>
              Please enter a comment explaining the maintenance requirement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maintenanceComment">Comment (max 100 characters)</Label>
              <Input
                id="maintenanceComment"
                value={maintenanceCommentInput}
                onChange={(e) => setMaintenanceCommentInput(e.target.value)}
                placeholder="Enter maintenance comment..."
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {maintenanceCommentInput.length}/100 characters
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleMaintenanceCommentCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleMaintenanceCommentSave}>
              Save Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Facility Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
        <DialogContent className="sm:max-w-[500px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Add New Facility</DialogTitle>
            <DialogDescription>
              Add a new sports facility to Book Your Ground.
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Facility Name</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter facility name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-location">Location</Label>
                <Input
                  id="add-location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-sport">Sport</Label>
                <Input
                  id="add-sport"
                  value={formData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  placeholder="Enter sport type"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-capacity">Capacity</Label>
                <Input
                  id="add-capacity"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Enter capacity (e.g., 22 players)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-minParticipants">Min Participants</Label>
                <Input
                  id="add-minParticipants"
                  type="number"
                  min="1"
                  value={formData.minParticipants}
                  onChange={(e) => handleInputChange('minParticipants', e.target.value)}
                  placeholder="Enter minimum participants"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="add-maxParticipants">Max Participants</Label>
                <Input
                  id="add-maxParticipants"
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  placeholder="Enter maximum participants"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-type">Facility Type</Label>
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

            <div className="space-y-2">
              <Label htmlFor="add-tag">Tag</Label>
              <Select value={formData.tag} onValueChange={(value) => handleInputChange('tag', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent className="bg-background border z-50">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Schedule for Maintenance">Schedule for Maintenance</SelectItem>
                </SelectContent>
              </Select>
              
              {formData.tag === 'Schedule for Maintenance' && formData.maintenanceComment && (
                <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                  <Label className="text-sm font-medium">Maintenance Comment</Label>
                  <p className="text-sm text-muted-foreground mt-1">{formData.maintenanceComment}</p>
                </div>
              )}
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
      <Dialog open={isCancelConfirmDialogOpen} onOpenChange={() => setIsCancelConfirmDialogOpen(false)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to cancel without saving?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelConfirmDialogOpen(false)}>
              Stay
            </Button>
            <Button variant="destructive" onClick={() => {
              setIsCancelConfirmDialogOpen(false);
              setIsEditModalOpen(false);
              setEditingFacility(null);
            }}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
