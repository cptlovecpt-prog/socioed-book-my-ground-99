import { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  facilityName: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  image: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  participants: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  removeBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

const generateBookingId = () => {
  return 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-ABC123",
      facilityName: "Football Ground",
      sport: "Football",
      date: "Today",
      time: "14:00 - 16:00",
      location: "Near K block",
      participants: "18/22 joined",
      status: "Upcoming",
      image: "/lovable-uploads/3a13d82d-5544-4379-a3e4-a65a065f42f8.png"
    },
    {
      id: "BK-XYZ789",
      facilityName: "Tennis Court",
      sport: "Tennis",
      date: "Tomorrow",
      time: "10:00 - 12:00",
      location: "Near K block",
      participants: "3/8 joined",
      status: "Upcoming",
      image: "/lovable-uploads/fdffe92f-f5b1-4ab3-9e26-bf822ff29b7e.png"
    },
    {
      id: "BK-DEF456",
      facilityName: "Swimming Pool",
      sport: "Swimming",
      date: "Dec 12",
      time: "08:00 - 10:00",
      location: "N block",
      participants: "12/35 joined",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop"
    }
  ]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: generateBookingId(),
      status: 'Upcoming'
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const removeBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, removeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};