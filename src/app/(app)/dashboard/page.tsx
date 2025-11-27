"use client";

import Sidebar from "@/components/layout/Sidebar";
import BooksCarousel from "@/app/(app)/dashboard/components/BooksCarousel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full">
      <BooksCarousel />
    </div>
  );
}
