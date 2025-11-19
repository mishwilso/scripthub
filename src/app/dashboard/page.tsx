'use client';

import MainNavBar from '@/components/layout/MainNavbar'
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {

  const {user} = useAuth();

  return (
    <div>
      <MainNavBar />
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard, {user?.email}!</p>
    </div>
  );
}