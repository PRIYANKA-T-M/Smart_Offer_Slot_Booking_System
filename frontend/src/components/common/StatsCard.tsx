import React from 'react';
import { Card } from './Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          {trend && (
            <p className="mt-2 text-sm text-primary-600 dark:text-primary-500">{trend}</p>
          )}
        </div>
        <div className="rounded-full bg-primary-50 p-3 dark:bg-primary-900/20">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-500" />
        </div>
      </div>
    </Card>
  );
};
