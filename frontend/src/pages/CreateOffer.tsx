import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { apiMap } from '../services/api';

const CreateOffer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', originalPrice: '', offerPrice: '',
    startDate: '', endDate: '', capacity: '', terms: '', bookingLimits: ''
  });
  const [businessId, setBusinessId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await apiMap.business.get();
        const list = res.data || [];
        if (list.length > 0) {
          setBusinessId(list[0].id);
        } else {
          // Auto create a default business profile if none exists
          const defaults = {
            name: 'Default Wellness Center',
            businessType: 'Wellness & Spa',
            ownerName: 'Admin Owner',
            phone: '555-0199',
            email: 'business@example.com',
            address: '100 Spa Blvd',
            city: 'New York',
            openingTime: '09:00:00',
            closingTime: '18:00:00',
            logo: 'logo.png'
          };
          const createRes = await apiMap.business.create(defaults);
          setBusinessId(createRes.data?.id || createRes.data);
        }
      } catch (err) {
        console.error('Failed to get business profile', err);
        // Fallback hardcoded GUID
        setBusinessId('11111111-1111-1111-1111-111111111111');
      }
    };
    fetchBusiness();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const discount = formData.originalPrice && formData.offerPrice
    ? Math.round(((Number(formData.originalPrice) - Number(formData.offerPrice)) / Number(formData.originalPrice)) * 100)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Parse datetimes into DateOnly (YYYY-MM-DD) and TimeSpan (HH:MM:SS) for backend
    const [startDateVal, startTimeVal] = formData.startDate.split('T');
    const [endDateVal, endTimeVal] = formData.endDate.split('T');

    if (!startDateVal || !endDateVal) {
      setError('Please select valid start and end dates.');
      setIsLoading(false);
      return;
    }

    const offerRequest = {
      businessId: businessId || '11111111-1111-1111-1111-111111111111',
      title: formData.title,
      description: formData.description,
      category: formData.category,
      originalPrice: Number(formData.originalPrice),
      offerPrice: Number(formData.offerPrice),
      startDate: startDateVal,
      endDate: endDateVal,
      startTime: startTimeVal ? `${startTimeVal}:00` : '09:00:00',
      endTime: endTimeVal ? `${endTimeVal}:00` : '18:00:00',
      totalCapacity: Number(formData.capacity),
      maxBookingPerCustomer: Number(formData.bookingLimits || 1),
      termsAndConditions: formData.terms
    };

    try {
      // 1. Create the offer
      const response = await apiMap.offers.create(offerRequest);
      const offerId = response.data?.id || response.data?.Id || response.data;

      if (offerId) {
        // 2. Automatically generate an initial slot for the offer
        await apiMap.slots.create({
          offerId,
          slotDate: startDateVal,
          startTime: startTimeVal ? `${startTimeVal}:00` : '09:00:00',
          endTime: endTimeVal ? `${endTimeVal}:00` : '18:00:00',
          capacity: Number(formData.capacity)
        });
      }

      alert('Offer published successfully with an initial slot!');
      navigate('/offers');
    } catch (err: any) {
      console.error('Failed to create offer or slots:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create offer. Ensure Offer Price is lower than Original Price.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Offer</h1>
        <Button variant="outline" onClick={() => navigate('/offers')}>Cancel</Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 font-medium">
              {error}
            </div>
          )}
          <Input label="Offer Title" name="title" value={formData.title} onChange={handleChange} required />


          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange} required
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 min-h-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Category" name="category" value={formData.category} onChange={handleChange} required />
            <Input label="Capacity" type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />

            <Input label="Original Price ($)" type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} required />
            <Input label="Offer Price ($)" type="number" name="offerPrice" value={formData.offerPrice} onChange={handleChange} required />

            {discount > 0 && (
              <div className="md:col-span-2 text-sm text-green-600 font-medium">Calculated Discount: {discount}%</div>
            )}

            <Input label="Start Date" type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
            <Input label="End Date" type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />

            <Input label="Booking Limits (per user)" type="number" name="bookingLimits" value={formData.bookingLimits} onChange={handleChange} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Terms & Conditions</label>
            <textarea
              name="terms" value={formData.terms} onChange={handleChange} required
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 min-h-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit">Publish Offer</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateOffer;
