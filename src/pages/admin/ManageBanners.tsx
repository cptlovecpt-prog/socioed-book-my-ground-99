import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Camera, AlertTriangle } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { HERO_IMAGES } from "@/constants/images";

export default function ManageBanners() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmChangesDialogOpen, setIsConfirmChangesDialogOpen] = useState(false);
  const [isConfirmAddDialogOpen, setIsConfirmAddDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [deletingBanner, setDeletingBanner] = useState<any>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  const [banners, setBanners] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=400&fit=crop",
      title: "Cricket Ground",
      description: "Professional cricket grounds with world-class facilities",
      status: "Active"
    },
    {
      id: 2,
      image: HERO_IMAGES.PICKLEBALL,
      title: "Pickleball Courts",
      description: "Modern pickleball courts for competitive matches",
      status: "Active"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1200&h=400&fit=crop",
      title: "Table Tennis",
      description: "Professional table tennis facilities for tournaments",
      status: "Active"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
      title: "Gym & Swimming Pool",
      description: "State-of-the-art gym and aquatic facilities",
      status: "Active"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=400&fit=crop",
      title: "Badminton Courts",
      description: "Professional badminton courts for competitive play",
      status: "Active"
    }
  ]);

  const handleEditClick = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      image: banner.image
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
    // Check if there are any changes
    const hasChanges = 
      formData.title !== editingBanner.title ||
      formData.description !== editingBanner.description ||
      formData.image !== editingBanner.image;

    if (!hasChanges) {
      // No changes made, close modal directly
      setIsEditModalOpen(false);
      setEditingBanner(null);
      return;
    }

    // Changes detected, show confirmation dialog
    setIsConfirmChangesDialogOpen(true);
  };

  const handleSaveChanges = () => {
    console.log("Updating banner:", editingBanner.id, "with data:", formData);
    // Update the banner in the state
    setBanners(prevBanners => 
      prevBanners.map(banner => 
        banner.id === editingBanner.id 
          ? { ...banner, ...formData }
          : banner
      )
    );
    toast({
      title: "Changes Saved",
      description: `${formData.title} banner has been updated successfully.`,
    });
    setIsConfirmChangesDialogOpen(false);
    setIsEditModalOpen(false);
    setEditingBanner(null);
  };

  const handleCancelSave = () => {
    setIsConfirmChangesDialogOpen(false);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingBanner(null);
  };

  const handleDeleteClick = (banner: any) => {
    setDeletingBanner(banner);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting banner:", deletingBanner.id);
    // Remove the banner from the state
    setBanners(prevBanners => 
      prevBanners.filter(banner => banner.id !== deletingBanner.id)
    );
    toast({
      title: "Banner Deleted",
      description: `${deletingBanner.title} banner has been permanently deleted.`,
      variant: "destructive",
    });
    setIsDeleteDialogOpen(false);
    setDeletingBanner(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeletingBanner(null);
  };

  const handleAddBannerClick = () => {
    // Reset form data for new banner
    setFormData({
      title: "",
      description: "",
      image: ""
    });
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleConfirmAdd = () => {
    setIsConfirmAddDialogOpen(true);
  };

  const handleSaveNewBanner = () => {
    console.log("Adding new banner with data:", formData);
    // Add the banner to the state
    const newId = Math.max(...banners.map(b => b.id)) + 1;
    setBanners(prev => [...prev, { ...formData, id: newId, status: "Active" }]);
    toast({
      title: "Banner Added",
      description: `${formData.title} banner has been added to the carousel successfully.`,
    });
    setIsConfirmAddDialogOpen(false);
    setIsAddModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsConfirmAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Banners</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage hero carousel banners
          </p>
        </div>
        <Button onClick={handleAddBannerClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="aspect-[3/1] relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant={banner.status === "Active" ? "default" : "secondary"}
              >
                {banner.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{banner.title}</CardTitle>
              <CardDescription>{banner.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-4 border-t">
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(banner)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <div className="w-px bg-border h-8"></div>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteClick(banner)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
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
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>
              Make changes to the banner details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Image Section */}
            <div className="space-y-2">
              <Label>Banner Image</Label>
              <div 
                className="relative aspect-[3/1] rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-colors overflow-hidden"
                onClick={handleImageClick}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Banner"
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
                Maximum image size allowed is 50kb in .jpeg, .jpg or .png format only. Recommended size: 1200x400px
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Banner Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter banner title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Banner Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter banner description"
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

      {/* Add Banner Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={handleAddModalClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Banner</DialogTitle>
            <DialogDescription>
              Add a new banner to the carousel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Image Section */}
            <div className="space-y-2">
              <Label>Banner Image</Label>
              <div 
                className="relative aspect-[3/1] rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-colors overflow-hidden"
                onClick={handleImageClick}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Banner"
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
                Maximum image size allowed is 50kb in .jpeg, .jpg or .png format only. Recommended size: 1200x400px
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Banner Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter banner title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Banner Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter banner description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleAddModalClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAdd}>
              Add Banner
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
              Delete Banner
            </DialogTitle>
            <DialogDescription>
              This action will permanently delete <strong>{deletingBanner?.title}</strong> banner. 
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
              Are you sure you want to save the changes made to <strong>{editingBanner?.title}</strong> banner?
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

      {/* Add Banner Confirmation Dialog */}
      <Dialog open={isConfirmAddDialogOpen} onOpenChange={handleCancelAdd}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Add Banner</DialogTitle>
            <DialogDescription>
              Are you sure you want to add <strong>{formData.title}</strong> banner to the carousel?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelAdd}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewBanner}>
              Yes, Add Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}