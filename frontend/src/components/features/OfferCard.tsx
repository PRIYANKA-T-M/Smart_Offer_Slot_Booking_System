import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface OfferCardProps {
  offer: any;
  onBook?: (e?: any) => void;
}

export const OfferCard = ({ offer, onBook }: OfferCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{offer.title || 'Offer Title'}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-1">{offer.description || 'Description goes here'}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">${offer.offerPrice}</span>
            {offer.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${offer.originalPrice}</span>
            )}
          </div>
          {onBook && <Button onClick={(e) => onBook(e)}>Book</Button>}
        </div>
      </div>
    </Card>
  );
};
