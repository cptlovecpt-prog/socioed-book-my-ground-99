import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, Share2, QrCode, ChevronLeft, ChevronRight, X, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBookings } from "@/contexts/BookingContext";
import { format, addDays, isSameDay } from "date-fns";

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  capacity: number;
}

interface ParticipantData {
  enrollmentId: string;
}

type BookingStep = 'date-selection' | 'slot-selection' | 'participant-count' | 'participant-details' | 'confirmation';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean;
  facility: {
    id: string;
    name: string;
    sport: string;
    location: string;
  } | null;
}

// Sport configuration with max participants
const sportConfig: { [key: string]: number } = {
  'Football': 22,
  'Cricket': 22,
  'Basketball': 10,
  'Volleyball': 12,
  'Tennis': 8,
  'Badminton': 4,
  'Table Tennis': 4,
  'Swimming': 35,
  'Chess': 10,
  'Padel': 4,
  'Squash': 6,
  'Gym': 40,
  'Pickleball': 4,
  'Basket Court': 18
};

// Generate 45-minute slots for morning (6:30 AM - 9:30 AM) and evening (5:30 PM - 10:00 PM)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let id = 1;

  // Morning slots: 6:30 AM to 9:30 AM
  const morningStart = new Date();
  morningStart.setHours(6, 30, 0, 0);
  
  for (let i = 0; i < 4; i++) {
    const startTime = new Date(morningStart);
    startTime.setMinutes(startTime.getMinutes() + (i * 45));
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 45);
    
    // Create different slot states: fully available, partially available, or full
    const random = Math.random();
    let available: number;
    
    if (random < 0.4) {
      available = 15; // Fully available
    } else if (random < 0.8) {
      available = Math.floor(Math.random() * 8) + 3; // Partially available (3-10)
    } else {
      available = 0; // Full
    }
    
    slots.push({
      id: id.toString(),
      time: `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`,
      available: available,
      capacity: 15
    });
    id++;
  }

  // Evening slots: 5:30 PM to 10:00 PM
  const eveningStart = new Date();
  eveningStart.setHours(17, 30, 0, 0);
  
  for (let i = 0; i < 6; i++) {
    const startTime = new Date(eveningStart);
    startTime.setMinutes(startTime.getMinutes() + (i * 45));
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 45);
    
    // Create different slot states: fully available, partially available, or full
    const random = Math.random();
    let available: number;
    
    if (random < 0.4) {
      available = 15; // Fully available
    } else if (random < 0.8) {
      available = Math.floor(Math.random() * 8) + 3; // Partially available (3-10)
    } else {
      available = 0; // Full
    }
    
    slots.push({
      id: id.toString(),
      time: `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`,
      available: available,
      capacity: 15
    });
    id++;
  }

  return slots;
};

export const BookingModal = ({ isOpen, onClose, facility, isSignedIn }: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('date-selection');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [participants, setParticipants] = useState<ParticipantData[]>([{ enrollmentId: '' }]);
  const [sendEmailConfirmation, setSendEmailConfirmation] = useState<boolean>(false);
  const [shareToken] = useState("BK-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const handleDialogClose = (open: boolean) => {
    if (!open && currentStep !== 'confirmation') {
      setShowExitConfirm(true);
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    resetModal();
  };
  
  const { toast } = useToast();
  const { addBooking, bookings } = useBookings();
  
  const timeSlots = generateTimeSlots();
  const maxParticipants = facility ? sportConfig[facility.sport] || 10 : 10;

  // Generate dates for the next week initially
  const [dateRange, setDateRange] = useState(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  });

  const canNavigateForward = dateRange[dateRange.length - 1] < addDays(new Date(), 59);
  const canNavigateBackward = dateRange[0] > new Date();

  const navigateDatesForward = () => {
    if (canNavigateForward) {
      const newDates = [];
      for (let i = 7; i < 14; i++) {
        const date = addDays(dateRange[0], i);
        if (date <= addDays(new Date(), 59)) {
          newDates.push(date);
        }
      }
      if (newDates.length > 0) {
        setDateRange(newDates);
      }
    }
  };

  const navigateDatesBackward = () => {
    if (canNavigateBackward) {
      const newDates = [];
      const startDate = addDays(dateRange[0], -7);
      for (let i = 0; i < 7; i++) {
        const date = addDays(startDate, i);
        if (date >= new Date()) {
          newDates.push(date);
        }
      }
      if (newDates.length > 0) {
        setDateRange(newDates);
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep('slot-selection');
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    setCurrentStep('participant-count');
  };

  const handleParticipantCountSelect = (count: number) => {
    setParticipantCount(count);
    const newParticipants = Array.from({ length: count }, (_, i) => 
      participants[i] || { enrollmentId: '' }
    );
    setParticipants(newParticipants);
    setCurrentStep('participant-details');
  };

  const handleEnrollmentIdChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].enrollmentId = value;
    setParticipants(updatedParticipants);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !facility) return;
    
    if (!isSignedIn) {
      toast({
        title: "Please Sign-In to continue with booking",
        duration: 3000,
      });
      return;
    }

    // Check if user already has 4 upcoming bookings
    const upcomingBookings = bookings.filter(booking => booking.status === 'Upcoming');
    if (upcomingBookings.length >= 4) {
      toast({
        title: "You already have 4 upcoming bookings, please complete one booking before booking any more slots",
        duration: 4000,
      });
      return;
    }

    // Validate enrollment IDs
    const hasEmptyIds = participants.some(p => !p.enrollmentId.trim());
    if (hasEmptyIds) {
      toast({
        title: "Please enter all enrollment IDs",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const selectedTimeSlot = timeSlots.find(s => s.id === selectedSlot);
    if (selectedTimeSlot) {
      // Add the booking to context
      addBooking({
        facilityName: facility.name,
        sport: facility.sport,
        location: facility.location,
        date: isSameDay(selectedDate, new Date()) ? "Today" : 
              isSameDay(selectedDate, addDays(new Date(), 1)) ? "Tomorrow" :
              format(selectedDate, 'MMM dd, yyyy'),
        time: selectedTimeSlot.time,
        image: getImageForFacility(facility),
        participants: `${participantCount} participant${participantCount > 1 ? 's' : ''}`
      });
    }
    
    setCurrentStep('confirmation');
    toast({
      title: "Booking Confirmation",
      description: "Your booking is confirmed. Check your e-mail for booking details",
      duration: 5000,
    });
  };

  const resetModal = () => {
    setCurrentStep('date-selection');
    setSelectedDate(new Date());
    setSelectedSlot(null);
    setParticipantCount(1);
    setParticipants([{ enrollmentId: '' }]);
    setSendEmailConfirmation(false);
    onClose();
  };

  const getImageForFacility = (facility: any) => {
    // Map facility types to their images - this could be improved with proper image mapping
    const sportImages: { [key: string]: string } = {
      'Football': '/lovable-uploads/3a13d82d-5544-4379-a3e4-a65a065f42f8.png',
      'Cricket': '/lovable-uploads/ab1aee87-6cbc-4ad4-ab3e-a52aae6cf731.png',
      'Tennis': '/lovable-uploads/fdffe92f-f5b1-4ab3-9e26-bf822ff29b7e.png',
      'Basketball': '/lovable-uploads/8ba8443e-fd66-4b90-842c-e8cea7b3b146.png',
      'Volleyball': '/lovable-uploads/f5824fb2-7c1a-4759-89eb-628b108960b7.png',
      'Swimming': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop',
      'Badminton': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop',
      'Chess': '/lovable-uploads/02fe3dda-03b5-4600-9dec-0565eb90e485.png',
      'Padel': '/lovable-uploads/30c311d0-0531-4989-b2cf-446fa8a581ed.png',
      'Squash': '/lovable-uploads/de8033c6-2e20-42bf-8b5e-88753e101116.png',
      'Table Tennis': 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&h=300&fit=crop',
      'Gym': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Pickleball': '/lovable-uploads/75efefc8-6f39-47ce-b08c-18e3336f2ada.png'
    };
    return sportImages[facility.sport] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop';
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Join my booking: ${window.location.origin}/join/${shareToken}`);
    toast({
      title: "Share Link Copied!",
      description: "Your friends can now join your booking using this link.",
    });
  };

  const handleGoBack = () => {
    switch (currentStep) {
      case 'slot-selection':
        setCurrentStep('date-selection');
        break;
      case 'participant-count':
        setCurrentStep('slot-selection');
        break;
      case 'participant-details':
        setCurrentStep('participant-count');
        break;
      default:
        break;
    }
  };

  const handleShareWhatsApp = () => {
    const message = `🏆 Sports Booking Confirmed!\n\nFacility: ${facility?.name}\nSport: ${facility?.sport}\nDate: ${format(selectedDate, 'MMM dd, yyyy')}\nTime: ${timeSlots.find(s => s.id === selectedSlot)?.time}\nParticipants: ${participantCount}\nShare Code: ${shareToken}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareEmail = () => {
    const participantEmails = participants.map(p => `${p.enrollmentId}@example.com`).join(',');
    const subject = encodeURIComponent('Sports Booking Confirmation');
    const body = encodeURIComponent(`Sports Booking Confirmed!\n\nFacility: ${facility?.name}\nSport: ${facility?.sport}\nDate: ${format(selectedDate, 'MMM dd, yyyy')}\nTime: ${timeSlots.find(s => s.id === selectedSlot)?.time}\nParticipants: ${participantCount}\nShare Code: ${shareToken}`);
    const mailtoUrl = `mailto:${participantEmails}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  };

  if (!facility) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'date-selection':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Select Date</h3>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={navigateDatesBackward}
                  disabled={!canNavigateBackward}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {dateRange.map((date) => (
                    <Button
                      key={date.toISOString()}
                      variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDateSelect(date)}
                      className="flex flex-col p-2 h-auto"
                    >
                      <span className="text-xs font-medium">
                        {format(date, 'EEE')}
                      </span>
                      <span className="text-sm">
                        {format(date, 'dd')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(date, 'MMM')}
                      </span>
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={navigateDatesForward}
                  disabled={!canNavigateForward}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'slot-selection':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(selectedDate, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{facility.sport}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Available Time Slots</h3>
              <div className="grid gap-2">
                {timeSlots.map((slot) => {
                  const isAvailable = slot.available > 0;
                  
                  return (
                    <div
                      key={slot.id}
                      onClick={() => isAvailable && handleSlotSelect(slot.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isAvailable 
                          ? 'border-border hover:border-primary/50' 
                          : 'border-border bg-muted cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {slot.available === 0 ? (
                            <Badge variant="destructive">No Slots Available</Badge>
                          ) : slot.available === slot.capacity ? (
                            <Badge className="bg-green-500 text-white hover:bg-green-600">
                              Fully Available
                            </Badge>
                          ) : (
                            <Badge className="bg-purple-500 text-white hover:bg-purple-600">
                              {slot.available}/{slot.capacity} Spots Available
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'participant-count':
        return (
          <div className="space-y-6">
            <h3 className="font-medium">Select Number of Participants</h3>
            
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: Math.min(maxParticipants, 20) }, (_, i) => i + 1).map((count) => (
                <Button
                  key={count}
                  variant={participantCount === count ? "default" : "outline"}
                  onClick={() => handleParticipantCountSelect(count)}
                  className="aspect-square"
                >
                  {count}
                </Button>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground">
              Maximum {maxParticipants} participants allowed for {facility.sport}
            </p>
          </div>
        );

      case 'participant-details':
        return (
          <div className="space-y-6">
            <h3 className="font-medium">Enter Enrollment IDs</h3>
            
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {participants.map((participant, index) => (
                <div key={index}>
                  <Label htmlFor={`enrollment-${index}`}>
                    Participant {index + 1} Enrollment ID
                  </Label>
                  <Input
                    id={`enrollment-${index}`}
                    value={participant.enrollmentId}
                    onChange={(e) => handleEnrollmentIdChange(index, e.target.value)}
                    placeholder="Enter enrollment ID"
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-confirmation"
                checked={sendEmailConfirmation}
                onCheckedChange={(checked) => setSendEmailConfirmation(checked as boolean)}
              />
              <Label htmlFor="email-confirmation" className="text-sm">
                Send mail confirmation
              </Label>
            </div>
            
            <Button 
              onClick={handleConfirmBooking}
              className="w-full bg-gradient-primary"
            >
              Confirm Booking
            </Button>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-600 mb-2">Booking Confirmed!</h3>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-32 h-32 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center">
                <QrCode className="h-16 w-16 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">Show this QR code at entry</p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Facility:</span>
                <span className="font-medium">{facility.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="font-medium">{format(selectedDate, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time:</span>
                <span className="font-medium">{timeSlots.find(s => s.id === selectedSlot)?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Participants:</span>
                <span className="font-medium">{participantCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Share Code:</span>
                <span className="font-mono font-medium">{shareToken}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleShareWhatsApp} variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share on WhatsApp
              </Button>
              <Button onClick={handleShareEmail} variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Share on E-mail
              </Button>
            </div>
            
            <Button onClick={resetModal} className="w-full">
              Done
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {currentStep !== 'date-selection' && currentStep !== 'confirmation' && (
                <Button variant="ghost" size="sm" onClick={handleGoBack}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              Book {facility.name}
            </DialogTitle>
          </DialogHeader>
          
          {renderStepContent()}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit the booking process?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit}>Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};