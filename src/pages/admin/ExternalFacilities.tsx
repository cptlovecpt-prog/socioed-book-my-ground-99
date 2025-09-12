import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MapPin, Users, Calendar, Settings, AlertCircle } from 'lucide-react';
import { externalApiService, type Facility } from '@/services/externalApi';
import { useToast } from '@/hooks/use-toast';
import { TokenManager } from '@/components/admin/TokenManager';

export const ExternalFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showClosureModal, setShowClosureModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const { toast } = useToast();

  const [createForm, setCreateForm] = useState({
    sport_id: 1,
    name: '',
    location: '',
    facility_type: 'Outdoor',
    quantity: 1,
    length_meters: 0,
    width_meters: 0,
    max_students_per_slot: 20,
    establishment_year: new Date().getFullYear()
  });

  const [closureForm, setClosureForm] = useState({
    closure_type: 'maintenance' as 'maintenance' | 'event' | 'emergency',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    reason: ''
  });

  useEffect(() => {
    setHasToken(externalApiService.hasAuthToken());
    if (externalApiService.hasAuthToken()) {
      loadFacilities();
    }
  }, []);

  const loadFacilities = async () => {
    setLoading(true);
    try {
      const response = await externalApiService.getFacilities();
      if (response.success) {
        setFacilities(response.data);
      }
    } catch (error: any) {
      if (error.message.includes('Session expired') || error.message.includes('Authentication token not found')) {
        setHasToken(false);
        toast({
          title: "Session Expired",
          description: "Please login again to continue",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load facilities",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBooking = async (facility: Facility) => {
    try {
      await externalApiService.toggleFacilityBooking(facility.id, !facility.is_bookable);
      toast({
        title: "Success",
        description: `${facility.name} booking status updated`,
      });
      loadFacilities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (facility: Facility) => {
    try {
      await externalApiService.toggleFacilityActive(facility.id, !facility.is_active);
      toast({
        title: "Success",
        description: `${facility.name} status updated`,
      });
      loadFacilities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update facility status",
        variant: "destructive",
      });
    }
  };

  const handleCreateFacility = async () => {
    try {
      await externalApiService.createFacility(createForm);
      toast({
        title: "Success",
        description: "Facility created successfully",
      });
      setShowCreateModal(false);
      setCreateForm({
        sport_id: 1,
        name: '',
        location: '',
        facility_type: 'Outdoor',
        quantity: 1,
        length_meters: 0,
        width_meters: 0,
        max_students_per_slot: 20,
        establishment_year: new Date().getFullYear()
      });
      loadFacilities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create facility",
        variant: "destructive",
      });
    }
  };

  const handleCreateClosure = async () => {
    if (!selectedFacility) return;
    
    try {
      await externalApiService.createFacilityClosure(selectedFacility.id, closureForm);
      toast({
        title: "Success",
        description: "Facility closure created successfully",
      });
      setShowClosureModal(false);
      setClosureForm({
        closure_type: 'maintenance',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        reason: ''
      });
      loadFacilities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create facility closure",
        variant: "destructive",
      });
    }
  };

  if (!hasToken) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <TokenManager onTokenSet={() => {
            setHasToken(true);
            loadFacilities();
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">External Facilities Management</h1>
          <p className="text-muted-foreground">Manage facilities from BU Sports API</p>
        </div>
        
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Facility</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="Facility name"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={createForm.location}
                  onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                  placeholder="Location"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select 
                  value={createForm.facility_type} 
                  onValueChange={(value) => setCreateForm({ ...createForm, facility_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                    <SelectItem value="Indoor">Indoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Length (m)</Label>
                  <Input
                    type="number"
                    value={createForm.length_meters}
                    onChange={(e) => setCreateForm({ ...createForm, length_meters: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Width (m)</Label>
                  <Input
                    type="number"
                    value={createForm.width_meters}
                    onChange={(e) => setCreateForm({ ...createForm, width_meters: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Max Students per Slot</Label>
                <Input
                  type="number"
                  value={createForm.max_students_per_slot}
                  onChange={(e) => setCreateForm({ ...createForm, max_students_per_slot: Number(e.target.value) })}
                />
              </div>
              <Button onClick={handleCreateFacility} className="w-full">
                Create Facility
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="text-center">Loading facilities...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                  <div className="flex gap-1">
                    <Badge variant={facility.is_active ? "default" : "secondary"}>
                      {facility.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant={facility.is_bookable ? "default" : "destructive"}>
                      {facility.is_bookable ? "Bookable" : "Not Bookable"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {facility.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {facility.max_students_per_slot} students/slot
                  </div>
                  <div className="text-sm">
                    Sport: {facility.sport_name} • {facility.facility_type}
                  </div>
                  <div className="text-sm">
                    Size: {facility.length_meters}m × {facility.width_meters}m
                  </div>
                </div>

                <div className="flex flex-col space-y-3 pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Status</span>
                    <Switch
                      checked={facility.is_active}
                      onCheckedChange={() => handleToggleActive(facility)}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Booking Enabled</span>
                    <Switch
                      checked={facility.is_bookable}
                      onCheckedChange={() => handleToggleBooking(facility)}
                      disabled={!facility.is_active}
                    />
                  </div>
                </div>

                <Dialog open={showClosureModal && selectedFacility?.id === facility.id} onOpenChange={(open) => {
                  setShowClosureModal(open);
                  if (open) setSelectedFacility(facility);
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Closure
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Facility Closure</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Closure Type</Label>
                        <Select 
                          value={closureForm.closure_type} 
                          onValueChange={(value: any) => setClosureForm({ ...closureForm, closure_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={closureForm.start_date}
                            onChange={(e) => setClosureForm({ ...closureForm, start_date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={closureForm.end_date}
                            onChange={(e) => setClosureForm({ ...closureForm, end_date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Start Time (Optional)</Label>
                          <Input
                            type="time"
                            value={closureForm.start_time}
                            onChange={(e) => setClosureForm({ ...closureForm, start_time: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>End Time (Optional)</Label>
                          <Input
                            type="time"
                            value={closureForm.end_time}
                            onChange={(e) => setClosureForm({ ...closureForm, end_time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Reason</Label>
                        <Textarea
                          value={closureForm.reason}
                          onChange={(e) => setClosureForm({ ...closureForm, reason: e.target.value })}
                          placeholder="Reason for closure..."
                        />
                      </div>
                      <Button onClick={handleCreateClosure} className="w-full">
                        Schedule Closure
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {facilities.length === 0 && !loading && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No facilities found</h3>
          <p className="text-muted-foreground">Create your first facility to get started.</p>
        </div>
      )}
    </div>
  );
};