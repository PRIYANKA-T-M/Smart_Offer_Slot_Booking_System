import React from 'react';

export const QRComponent = ({ value }: { value: string }) => {
  return <div className="p-4 bg-white border inline-block rounded-lg">QR: {value}</div>;
};
