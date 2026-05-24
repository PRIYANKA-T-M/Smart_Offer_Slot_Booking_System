import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OfferCard } from '../components/features/OfferCard';
import { Input } from '../components/common/Input';
import { useOffersStore } from '../store/useOffersStore';
import { Loader } from '../components/common/Loader';
import { apiMap } from '../services/api';

const MOCK_PUBLIC_OFFERS = [
  { id: '1', title: 'Full Body Massage', businessName: 'Relax Spa', offerPrice: 50, originalPrice: 100, discountPercentage: 50, expiryTimer: '2 days', slots: 5, category: 'Wellness', type: 'Service' },
  { id: '2', title: 'Haircut & Styling', businessName: 'Chic Salon', offerPrice: 30, originalPrice: 60, discountPercentage: 50, expiryTimer: '5 hours', slots: 2, category: 'Beauty', type: 'Service' },
  { id: '3', title: 'Dinner for Two', businessName: 'Gourmet Resto', offerPrice: 80, originalPrice: 120, discountPercentage: 33, expiryTimer: '1 week', slots: 10, category: 'Dining', type: 'Food' },
];

const PublicListing = () => {
  const navigate = useNavigate();
  const { offers, setOffers, isLoading, setLoading } = useOffersStore();
  const [filters, setFilters] = useState({ type: '', category: '', date: '', maxPrice: '', availableOnly: false });

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await apiMap.offers.getAll();
        const rawOffers = response.data || [];
        const mapped = rawOffers.map((o: any) => ({
          id: o.id,
          title: o.title || '',
          businessName: o.business?.name || 'Local Business',
          offerPrice: o.offerPrice ?? o.price ?? 0,
          originalPrice: o.originalPrice ?? 0,
          discountPercentage: o.originalPrice && o.offerPrice ? Math.round(((o.originalPrice - o.offerPrice) / o.originalPrice) * 100) : 0,
          expiryTimer: o.endDate ? new Date(o.endDate).toLocaleDateString() : 'N/A',
          slots: o.totalCapacity ?? o.capacity ?? 10,
          category: o.category || 'General',
          type: 'Service'
        }));
        setOffers(mapped);
      } catch (err) {
        console.error('Failed to fetch public offers, using mock:', err);
        setOffers(MOCK_PUBLIC_OFFERS as any);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [setOffers, setLoading]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Business Type</label>
            <select className="w-full mt-1 border rounded-md p-2" onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="">All</option>
              <option value="Service">Service</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select className="w-full mt-1 border rounded-md p-2" onChange={(e) => setFilters({...filters, category: e.target.value})}>
              <option value="">All</option>
              <option value="Wellness">Wellness</option>
              <option value="Beauty">Beauty</option>
              <option value="Dining">Dining</option>
            </select>
          </div>
          <Input label="Date" type="date" onChange={(e) => setFilters({...filters, date: e.target.value})} />
          <Input label="Max Price ($)" type="number" onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} />
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" onChange={(e) => setFilters({...filters, availableOnly: e.target.checked})} />
            <span className="text-sm">Available only</span>
          </label>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Exclusive Offers</h1>
        {isLoading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer: any) => (
              <div key={offer.id} className="relative group cursor-pointer" onClick={() => navigate(`/offers/${offer.id}`)}>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-10">
                  {offer.discountPercentage}% OFF
                </div>
                <OfferCard offer={{...offer, description: `By ${offer.businessName} • ${offer.slots} slots left • Ends in ${offer.expiryTimer}`}} onBook={(e: any) => { e?.stopPropagation(); navigate(`/offers/${offer.id}/book`); }} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicListing;
