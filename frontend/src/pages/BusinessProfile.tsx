import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useBusinessStore } from '../store/useBusinessStore';
import { Loader } from '../components/common/Loader';
import { apiMap } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const BusinessProfile = () => {
  const { profile, isLoading, setProfile, setLoading } = useBusinessStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '', type: '', owner: '', phone: '', email: '', address: '', city: '', openingTime: '', closingTime: ''
  });


  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      try {
        const response = await apiMap.business.get();
        const businesses = response.data || [];
        
        // Find a business that belongs to this user, or just grab the first one
        let myBusiness = businesses.find((b: any) => b.ownerId === user?.id || b.email === user?.email);
        if (!myBusiness && businesses.length > 0) {
          myBusiness = businesses[0];
        }

        if (myBusiness) {
          const mapped = {
            id: myBusiness.id,
            name: myBusiness.name || '',
            type: myBusiness.businessType || myBusiness.type || '',
            owner: myBusiness.ownerName || myBusiness.owner || '',
            phone: myBusiness.phone || '',
            email: myBusiness.email || '',
            address: myBusiness.address || '',
            city: myBusiness.city || '',
            openingTime: myBusiness.openingTime ? myBusiness.openingTime.substring(0, 5) : '09:00',
            closingTime: myBusiness.closingTime ? myBusiness.closingTime.substring(0, 5) : '18:00'
          };
          setProfile(mapped);
          setFormData(mapped);
        } else {
          // No business found, prepopulate with defaults
          const defaults = {
            name: 'My Business',
            type: 'Wellness',
            owner: user?.email.split('@')[0] || 'Owner',
            phone: '123-456-7890',
            email: user?.email || 'business@example.com',
            address: '123 Main St',
            city: 'New York',
            openingTime: '09:00',
            closingTime: '18:00'
          };
          setFormData({ ...defaults, id: '' } as any);
        }
      } catch (err) {
        console.error('Failed to fetch business profile, using fallback:', err);
        const fallback = {
          id: '1', name: 'Relax Spa', type: 'Wellness', owner: 'Jane Doe',
          phone: '123-456-7890', email: 'hello@relaxspa.com', address: '123 Zen Street',
          city: 'New York', openingTime: '09:00', closingTime: '18:00'
        };
        setProfile(fallback);
        setFormData(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [setProfile, setLoading, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert time to HH:MM:SS format for .NET TimeSpan
    const requestData = {
      name: formData.name,
      businessType: formData.type,
      ownerName: formData.owner,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      openingTime: formData.openingTime.length === 5 ? `${formData.openingTime}:00` : formData.openingTime,
      closingTime: formData.closingTime.length === 5 ? `${formData.closingTime}:00` : formData.closingTime,
      logo: 'logo.png'
    };

    try {
      if (profile?.id) {
        await apiMap.business.update(profile.id, requestData);
        setProfile({ ...profile, ...formData });
        alert('Profile updated successfully!');
      } else {
        const createRes = await apiMap.business.create(requestData);
        const newId = createRes.data?.id || createRes.data;
        const savedProfile = { ...formData, id: newId };
        setProfile(savedProfile);
        setFormData(savedProfile);
        alert('Profile created successfully!');
      }
    } catch (err) {
      console.error('Failed to save business profile:', err);
      // Fallback update on error
      setProfile({ ...profile, ...formData, id: profile?.id || '1' });
      alert('Failed to connect to backend, but profile updated locally.');
    } finally {
      setLoading(false);
    }
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
