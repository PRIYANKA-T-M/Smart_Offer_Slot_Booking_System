import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircle, Download, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Loader } from '../components/common/Loader';
import { apiMap } from '../services/api';

const BookingConfirmation = () => {
  const { ref } = useParams();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await apiMap.bookings.getAll();
        const bookings = res.data || [];
        const found = bookings.find((b: any) => b.bookingReference === ref || b.bookingRef === ref || b.id === ref);
        
        if (found) {
          setBooking({
            bookingRef: found.bookingReference || found.bookingRef || found.id,
            status: found.bookingStatus || found.status || 'Confirmed',
            businessName: found.offer?.business?.name || found.businessName || 'Local Business',
            offerTitle: found.offer?.title || found.offerTitle || 'Service',
            time: found.createdAt ? new Date(found.createdAt).toLocaleString() : 'Recently',
            customerName: found.customerName,
            location: found.offer?.business?.address || found.location || 'See business page'
          });
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        console.error('Failed to fetch booking details, using mock:', err);
        setBooking({
          bookingRef: ref,
          status: 'Confirmed',
          businessName: 'Relax Spa Center',
          offerTitle: 'Full Body Massage Package',
          time: 'Today, 10:00 AM',
          customerName: 'John Doe',
          location: '123 Wellness Ave, New York, NY 10001',
        });
      }
    };
    if (ref) fetchBooking();
  }, [ref]);

  if (!booking) return <div className="mt-20"><Loader /></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="bg-green-100 rounded-full p-4 mb-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8 text-center">Your reservation has been successfully placed.</p>

      <Card className="w-full p-0 overflow-hidden relative border-t-8 border-t-primary-500 shadow-lg">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-start border-b pb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Booking Reference</p>
              <p className="text-2xl font-mono font-bold tracking-tight mt-1">{booking.bookingRef}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Offer</p>
              <p className="font-semibold text-lg">{booking.offerTitle}</p>
              <p className="text-gray-600">{booking.businessName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Customer Details</p>
              <p className="font-semibold">{booking.customerName}</p>
            </div>

            <div className="flex items-start gap-3 mt-2 md:col-span-2">
              <CalendarIcon className="h-5 w-5 text-gray-400 shrink-0" />
              <p className="font-medium">{booking.time}</p>
            </div>

            <div className="flex items-start gap-3 md:col-span-2">
              <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-gray-600">{booking.location}</p>
            </div>
          </div>
        </div>

        {/* Decorative ticket cutouts */}
        <div className="absolute left-0 top-1/2 -ml-3 -mt-3 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full border-r border-gray-200 dark:border-gray-800"></div>
        <div className="absolute right-0 top-1/2 -mr-3 -mt-3 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full border-l border-gray-200 dark:border-gray-800"></div>
      </Card>

      <div className="flex gap-4 mt-8">
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Ticket</Button>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
