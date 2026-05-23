import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

const PublicNavbar = () => {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 z-10 sticky top-0">
      <Link to="/" className="font-bold text-2xl text-primary-600">SmartOffer</Link>
      <nav className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="ghost">Business Login</Button>
        </Link>
        <Button>Sign Up</Button>
      </nav>
    </header>
  );
};

export default PublicNavbar;
