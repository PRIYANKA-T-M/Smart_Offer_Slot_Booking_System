import React from 'react';
import { Card } from '../common/Card';

export const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{booking.customerName}</h4>
          <p className="text-sm text-gray-500">{booking.bookingRef}</p>
        </div>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{booking.status}</span>
      </div>
    </Card>
  );
};
