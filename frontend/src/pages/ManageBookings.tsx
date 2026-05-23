import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/common/Table';
import { Search } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { Loader } from '../components/common/Loader';

const MOCK_BOOKINGS = [
  { id: '1', bookingRef: 'BK-1001', customerName: 'Alice Smith', offerTitle: 'Spa Retreat', status: 'pending', date: '2024-06-01' },
  { id: '2', bookingRef: 'BK-1002', customerName: 'Bob Johnson', offerTitle: 'Yoga Class', status: 'confirmed', date: '2024-06-02' },
  { id: '3', bookingRef: 'BK-1003', customerName: 'Charlie Brown', offerTitle: 'Dinner', status: 'cancelled', date: '2024-06-03' },
];

const ManageBookings = () => {
  const { bookings, setBookings, isLoading, setLoading } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulate GET /api/bookings
    setTimeout(() => {
      setBookings(MOCK_BOOKINGS as any);
      setLoading(false);
    }, 500);
  }, [setBookings, setLoading]);

  const updateStatus = (id: string, newStatus: string) => {
    // Simulate PUT /api/bookings/{id}/status
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
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
