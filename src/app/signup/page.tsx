"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";

import heroImage from "@/assets/vectors/knowledge-base.png";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <header className="sticky top-0 z-10">
        <MainNavbar/>
      </header>
      <main className="flex-1 flex px-6 md:px-12 py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row md:gap-4 items-center">
                  {/* Sign up Card */}
                  {/* Photo Slide Show */}
        </div>
      </main>
    </div>
  )
}
