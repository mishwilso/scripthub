'use client';

import Sidebar from '@/components/layout/Sidebar'
import WorksCarousel from '@/components/layout/WorksCarousel';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DashboardPage() {

  const {user, logout} = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col w-full">
      <WorksCarousel/>
    </div>
  );
}