import React from 'react';
import { Menu, User, Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-bold text-xl text-primary-600 hidden md:block">SmartOffer AI</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium leading-none">{user?.email || 'Admin User'}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.role || 'Administrator'}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <User className="h-4 w-4 text-primary-600" />
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 ml-2" title="Logout">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
