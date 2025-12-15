"use client";

import DashboardHero from "../../../components/dashboard/DashboardHero";
import BooksCarousel from "@/components/dashboard/BooksCarousel";
import RecentChapters from "@/components/dashboard/RecentChapters";
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
    <div className="mt-6 flex flex-col w-full gap-6">
      <DashboardHero />
      <BooksCarousel />
      <RecentChapters />
    </div>
  );
}
