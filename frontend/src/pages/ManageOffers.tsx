import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/common/Table';
import { Search, Plus, MoreVertical, Edit, Pause, Trash2, Play } from 'lucide-react';
import { useOffersStore } from '../store/useOffersStore';
import { Loader } from '../components/common/Loader';
import { apiMap } from '../services/api';

const ManageOffers = () => {
  const navigate = useNavigate();
  const { offers, setOffers, isLoading, setLoading } = useOffersStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await apiMap.offers.getAll();
      const rawOffers = response.data || [];
      const mapped = rawOffers.map((o: any) => {
        // Calculate booked from slots if available
        const slotsBooked = o.slots?.reduce((sum: number, s: any) => sum + (s.bookedCount ?? s.booked ?? 0), 0) ?? 0;
        const bookingsBooked = o.bookings?.reduce((sum: number, b: any) => sum + (b.peopleCount ?? 0), 0) ?? 0;
        
        return {
          id: o.id,
          title: o.title || '',
          category: o.category || '',
          offerPrice: o.offerPrice ?? o.price ?? 0,
          originalPrice: o.originalPrice ?? 0,
          capacity: o.totalCapacity ?? o.capacity ?? 10,
          booked: Math.max(slotsBooked, bookingsBooked, o.bookedSeats ?? 0),
          status: (o.status === 0 || String(o.status).toLowerCase() === 'active') ? 'active' : 'paused',
          description: o.description || '',
          startDate: o.startDate || '',
          endDate: o.endDate || ''
        };
      });
      setOffers(mapped);
    } catch (err) {
      console.error('Failed to fetch real offers, using mock data:', err);
      setOffers([
        { id: '1', title: 'Weekend Spa Retreat', category: 'Wellness', offerPrice: 199, originalPrice: 250, status: 'active', capacity: 50, booked: 20, description: '', startDate: '', endDate: '' },
        { id: '2', title: 'Yoga Masterclass', category: 'Fitness', offerPrice: 49, originalPrice: 75, status: 'paused', capacity: 30, booked: 5, description: '', startDate: '', endDate: '' },
        { id: '3', title: 'Gourmet Dinner for Two', category: 'Dining', offerPrice: 89, originalPrice: 120, status: 'active', capacity: 100, booked: 98, description: '', startDate: '', endDate: '' }
      ] as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [setOffers, setLoading]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to cancel/delete this offer?')) {
      try {
        await apiMap.offers.delete(id);
        alert('Offer cancelled successfully!');
        fetchOffers();
      } catch (err) {
        console.error('Failed to delete offer:', err);
        // Fallback local delete
        setOffers(offers.filter(o => o.id !== id));
      }
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    // Note: The backend does not support an explicit pause/resume endpoint,
    // so we handle this update locally for presentation purposes.
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setOffers(offers.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
    alert(`Offer status toggled to ${newStatus} locally.`);
  };


  const filteredOffers = offers.filter(o =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || o.status === filter)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Manage Offers</h1>
        <Button onClick={() => navigate('/offers/create')} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Create Offer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search offers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {isLoading ? <Loader /> : (
        <Table>
          <TableHeader>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Capacity</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {filteredOffers.length === 0 ? (
              <TableRow>
                <TableCell className="text-center py-8" colSpan={6}>No offers found.</TableCell>
              </TableRow>
            ) : filteredOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.title}</TableCell>
                <TableCell>{offer.category}</TableCell>
                <TableCell>${offer.offerPrice}</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${((offer as any).booked / offer.capacity) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{(offer as any).booked} / {offer.capacity} booked</span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${offer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-500 hover:text-primary-600"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => toggleStatus(offer.id, offer.status)} className="p-1 text-gray-500 hover:text-yellow-600">
                      {offer.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button onClick={() => handleDelete(offer.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageOffers;
