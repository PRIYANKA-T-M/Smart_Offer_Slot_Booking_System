import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Loader } from '../components/common/Loader';
import { MapPin, Clock, Info, Calendar as CalendarIcon } from 'lucide-react';
import { apiMap } from '../services/api';

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      setIsLoading(true);
      try {
        const [offerRes, slotsRes] = await Promise.all([
          apiMap.offers.getById(id!),
          apiMap.slots.getByOffer(id!)
        ]);

        const o = offerRes.data;
        const slotsData = slotsRes.data || [];

        setOffer({
          id,
          title: o.title || 'Offer Details',
          businessName: o.business?.name || 'Local Business',
          description: o.description || 'No description provided.',
          terms: o.termsAndConditions || o.terms || 'Standard terms apply.',
          location: o.business?.address || o.location || 'See business page',
          offerPrice: o.offerPrice ?? o.price ?? 0,
          originalPrice: o.originalPrice ?? 0,
          discountPercentage: o.originalPrice && o.offerPrice ? Math.round(((o.originalPrice - o.offerPrice) / o.originalPrice) * 100) : 0,
          slots: slotsData.map((s: any) => ({
            id: s.id,
            time: s.startTime ? s.startTime.substring(0, 5) : 'Any Time',
            available: (s.capacity - (s.bookedCount || s.booked || 0)) > 0
          }))
        });
      } catch (err) {
        console.error('Failed to fetch offer details, using mock:', err);
        setOffer({
          id,
          title: 'Full Body Massage Package',
          businessName: 'Relax Spa Center',
          description: 'Enjoy a 60-minute full body deep tissue massage with aromatherapy. Perfect for relieving stress and muscle tension.',
          terms: 'Must be booked 24h in advance. Non-refundable. Please arrive 15 minutes early.',
          location: '123 Wellness Ave, New York, NY 10001',
          offerPrice: 50,
          originalPrice: 100,
          discountPercentage: 50,
          slots: [
            { id: 's1', time: '10:00 AM', available: true },
            { id: 's2', time: '11:30 AM', available: false },
            { id: 's3', time: '02:00 PM', available: true },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOffer();
  }, [id]);

  if (isLoading) return <div className="p-8"><Loader /></div>;
  if (!offer) return <div className="p-8 text-center text-red-500">Offer not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8 object-cover"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{offer.title}</h1>
            <p className="text-gray-500 text-lg mt-1">by {offer.businessName}</p>
          </div>

          <div className="flex gap-4">
            <span className="text-3xl font-bold text-primary-600">${offer.offerPrice}</span>
            <span className="text-xl text-gray-400 line-through mt-2">${offer.originalPrice}</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold self-center">
              {offer.discountPercentage}% OFF
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Info className="h-5 w-5"/> Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{offer.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Terms & Conditions</h3>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
              <li>{offer.terms}</li>
            </ul>
          </div>
        </div>

        <div>
          <Card className="p-6 sticky top-24 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                <p className="text-sm">{offer.location}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                <p className="text-sm">Available slots today</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Select a Time</h4>
              <div className="grid grid-cols-2 gap-2">
                {offer.slots.map((slot: any) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    className={`p-2 text-sm rounded border text-center transition-colors ${
                      slot.available
                        ? 'border-primary-500 text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed dark:border-gray-800 dark:bg-gray-900'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-4" size="lg" onClick={() => navigate(`/offers/${id}/book`)}>
              Book Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
