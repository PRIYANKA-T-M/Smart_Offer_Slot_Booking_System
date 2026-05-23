import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Account Preferences</h2>
        <div className="space-y-4 max-w-md">
          <Input label="Admin Email" type="email" defaultValue="admin@example.com" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
          <Button>Update Credentials</Button>
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Notification Settings</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" defaultChecked />
            <span>Email notifications for new bookings</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" defaultChecked />
            <span>Daily summary reports</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
            <span>SMS alerts for cancellations</span>
          </label>
          <Button variant="outline" className="mt-2">Save Preferences</Button>
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-red-600">Danger Zone</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  );
};

export default Settings;
