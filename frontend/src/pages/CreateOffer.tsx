import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const CreateOffer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', originalPrice: '', offerPrice: '',
    startDate: '', endDate: '', capacity: '', terms: '', bookingLimits: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const discount = formData.originalPrice && formData.offerPrice
    ? Math.round(((Number(formData.originalPrice) - Number(formData.offerPrice)) / Number(formData.originalPrice)) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate POST /api/offers
    alert('Offer created successfully!');
    navigate('/offers');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Offer</h1>
        <Button variant="outline" onClick={() => navigate('/offers')}>Cancel</Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
