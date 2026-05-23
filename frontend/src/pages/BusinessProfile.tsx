import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useBusinessStore } from '../store/useBusinessStore';
import { Loader } from '../components/common/Loader';

const BusinessProfile = () => {
  const { profile, isLoading, setProfile, setLoading } = useBusinessStore();
  const [formData, setFormData] = useState({
    name: '', type: '', owner: '', phone: '', email: '', address: '', city: '', openingTime: '', closingTime: ''
  });

  useEffect(() => {
    // Simulate GET /api/business
    setLoading(true);
    setTimeout(() => {
      const data = {
        id: '1', name: 'Relax Spa', type: 'Wellness', owner: 'Jane Doe',
        phone: '123-456-7890', email: 'hello@relaxspa.com', address: '123 Zen Street',
        city: 'New York', openingTime: '09:00', closingTime: '18:00'
      };
      setProfile(data);
      setFormData(data);
      setLoading(false);
    }, 600);
  }, [setProfile, setLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate PUT /api/business/{id}
    setProfile({ ...profile, ...formData, id: profile?.id || '1' });
    alert('Profile saved successfully!');
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Business Profile</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Business Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Business Type" name="type" value={formData.type} onChange={handleChange} required />
            <Input label="Owner Name" name="owner" value={formData.owner} onChange={handleChange} required />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
            <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
            <div className="md:col-span-2">
              <Input label="Full Address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <Input label="Opening Time" type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required />
            <Input label="Closing Time" type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BusinessProfile;
