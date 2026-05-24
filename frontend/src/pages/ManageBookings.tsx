import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/common/Table';
import { Search } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { Loader } from '../components/common/Loader';
import { apiMap } from '../services/api';

const mapBackendStatus = (status: any) => {
  if (status === 0 || status === 'Pending') return 'pending';
  if (status === 1 || status === 'Confirmed') return 'confirmed';
  if (status === 2 || status === 'Completed') return 'completed';
  if (status === 3 || status === 'Cancelled') return 'cancelled';
  return String(status).toLowerCase();
};

const mapToBackendStatus = (status: string) => {
  if (status === 'pending') return 'Pending';
  if (status === 'confirmed') return 'Confirmed';
  if (status === 'completed') return 'Completed';
  if (status === 'cancelled') return 'Cancelled';
  return status;
};

const ManageBookings = () => {
  const { bookings, setBookings, isLoading, setLoading } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await apiMap.bookings.getAll();
      const rawBookings = response.data || [];
      const mapped = rawBookings.map((b: any) => ({
        id: b.id,
        bookingRef: b.bookingReference || b.bookingRef || 'N/A',
        customerName: b.customerName || 'N/A',
        offerTitle: b.offer?.title || b.offerTitle || 'N/A',
        status: mapBackendStatus(b.bookingStatus ?? b.status),
        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'
      }));
      setBookings(mapped);
    } catch (err) {
      console.error('Failed to fetch bookings from backend, using fallback:', err);
      setBookings([
        { id: '1', bookingRef: 'BK-1001', customerName: 'Alice Smith', offerTitle: 'Spa Retreat', status: 'pending', date: '2024-06-01' },
        { id: '2', bookingRef: 'BK-1002', customerName: 'Bob Johnson', offerTitle: 'Yoga Class', status: 'confirmed', date: '2024-06-02' },
        { id: '3', bookingRef: 'BK-1003', customerName: 'Charlie Brown', offerTitle: 'Dinner', status: 'cancelled', date: '2024-06-03' }
      ] as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [setBookings, setLoading]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const backendStatus = mapToBackendStatus(newStatus);
      await apiMap.bookings.updateStatus(id, backendStatus);
      alert(`Booking status updated to ${newStatus}!`);
      fetchBookings();
    } catch (err) {
      console.error('Failed to update booking status in backend:', err);
      // Fallback local update
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingRef?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Bookings</h1>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by customer name or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>

      {isLoading ? <Loader /> : (
        <Table>
          <TableHeader>
            <TableHeaderCell>Reference</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Offer</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking: any) => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono text-sm">{booking.bookingRef}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.offerTitle}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell>
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="text-sm border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirm</option>
                    <option value="cancelled">Cancel</option>
                    <option value="completed">Complete</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageBookings;
