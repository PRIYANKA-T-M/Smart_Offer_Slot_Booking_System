import { create } from 'zustand';

export interface Booking {
  id: string;
  offerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  peopleCount: number;
  specialNote?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingRef: string;
  slotId: string;
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  isLoading: boolean;
  setBookings: (bookings: Booking[]) => void;
  setCurrentBooking: (booking: Partial<Booking> | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  currentBooking: null,
  isLoading: false,
  setBookings: (bookings) => set({ bookings }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  setLoading: (isLoading) => set({ isLoading }),
}));
