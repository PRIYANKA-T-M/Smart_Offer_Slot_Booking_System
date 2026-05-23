import React, { useEffect } from 'react';
import { StatsCard } from '../components/common/StatsCard';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../components/common/Table';
import { Tags, Activity, Calendar, Users, Briefcase, Percent } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { Loader } from '../components/common/Loader';

const Dashboard = () => {
  const { metrics, isLoading, setMetrics, setLoading } = useDashboardStore();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      // Simulate GET /api/dashboard/summary
      setTimeout(() => {
        setMetrics({
          totalOffers: 24,
          activeOffers: 12,
          todaysBookings: 8,
          capacity: 100,
          bookedSeats: 45,
          availableSeats: 55,
          conversionRate: 15.4
        });
        setLoading(false);
      }, 800);
    };
    fetchDashboard();
  }, [setMetrics, setLoading]);

  if (isLoading || !metrics) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Offers" value={metrics.totalOffers} icon={Tags} trend="+2 this week" />
        <StatsCard title="Active Offers" value={metrics.activeOffers} icon={Activity} />
        <StatsCard title="Today's Bookings" value={metrics.todaysBookings} icon={Calendar} trend="+12% from yesterday" />
        <StatsCard title="Total Capacity" value={metrics.capacity} icon={Briefcase} />
        <StatsCard title="Booked Seats" value={metrics.bookedSeats} icon={Users} />
        <StatsCard title="Available Seats" value={metrics.availableSeats} icon={Users} />
        <StatsCard title="Conversion Rate" value={`${metrics.conversionRate}%`} icon={Percent} trend="+2.1% this month" />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <Table>
          <TableHeader>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Offer</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>John Doe {i}</TableCell>
                <TableCell>Spa Package {i}</TableCell>
                <TableCell>Today, 2:00 PM</TableCell>
                <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmed</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
