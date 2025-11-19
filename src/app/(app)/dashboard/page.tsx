'use client';

import MainNavBar from '@/components/layout/MainNavbar'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {

  const {user, logout} = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    logout()
    router.push("/")
  }

  return (
    <div>
      <MainNavBar />
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard, {user?.email}!</p>
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}