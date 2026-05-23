import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const BookingFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', peopleCount: '1', specialNote: '', slotId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock slots for selection
  const availableSlots = [
    { id: 's1', time: '10:00 AM' },
    { id: 's3', time: '02:00 PM' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slotId) return alert('Please select a time slot.');

    setIsSubmitting(true);
    // Simulate POST /api/bookings
    setTimeout(() => {
      const mockRef = 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      navigate(`/confirmation/${mockRef}`);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">1. Select Time</h3>
            <div className="flex gap-4">
              {availableSlots.map(slot => (
                <label key={slot.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="slotId"
                    value={slot.id}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="px-4 py-2 border rounded-md peer-checked:bg-primary-50 peer-checked:border-primary-500 peer-checked:text-primary-700 hover:bg-gray-50 transition-colors">
                    {slot.time}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 mt-4">2. Your Details</h3>
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
              <Input label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <Input label="Number of People" type="number" min="1" max="10" name="peopleCount" value={formData.peopleCount} onChange={handleChange} required />

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Special Note (Optional)</label>
              <textarea
                name="specialNote" value={formData.specialNote} onChange={handleChange}
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Confirm Booking
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BookingFlow;
