'use client';

import Sidebar from '@/components/layout/Sidebar'
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

    </div>
  );
}