import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from './components/layout/AppLayout';
import PublicLayout from './components/layout/PublicLayout';

// Public Pages
import PublicListing from './pages/PublicListing';
import OfferDetail from './pages/OfferDetail';
import BookingFlow from './pages/BookingFlow';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminLogin from './pages/AdminLogin';

// Protected Pages
import Dashboard from './pages/Dashboard';
import BusinessProfile from './pages/BusinessProfile';
import ManageOffers from './pages/ManageOffers';
import CreateOffer from './pages/CreateOffer';
import ManageBookings from './pages/ManageBookings';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicListing />} />
          <Route path="/offers/:id" element={<OfferDetail />} />
          <Route path="/offers/:id/book" element={<BookingFlow />} />
          <Route path="/confirmation/:ref" element={<BookingConfirmation />} />
        </Route>

        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Routes (Admin/Business) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business" element={<BusinessProfile />} />
          <Route path="/offers" element={<ManageOffers />} />
          <Route path="/offers/create" element={<CreateOffer />} />
          <Route path="/bookings" element={<ManageBookings />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
