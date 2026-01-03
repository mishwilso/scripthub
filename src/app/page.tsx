"use client";

import { useState } from "react";
import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import DeveloperModal from "@/components/ui/DeveloperModal";
import Image from "next/image";
import { FaLeaf } from "react-icons/fa";

import heroImage from "@/assets/vectors/knowledge-base.png";

export default function HomePage() {
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-10">
        <MainNavbar />
      </header>
      <main className="flex-1 flex items-center justify-center px-6 md:px-12  py-12 md:py-6">
        <div className="w-full max-w-[1025px] flex flex-col md:flex-row md:gap-4 items-center">
          {/* Text column */}
          <div className="flex-1 flex flex-col items-start">
            <h1 className="text-3xl md:text-6xl text-neutral-dark font-bold pb-4">
              All your story <br/>pieces, finally in one place.
            </h1>
            <p className="text-neutral-dark pb-2">
              Explore new ideas without fear, keep every draft and version safe,
              and pull up your characters, places, and notes whenever you need
              them.
            </p>
            <p className="text-neutral-dark pb-20">
              Whether you&apos;re worldbuilding or polishing a chapter, everything
              you create stays connected — all in one cozy, writer-friendly
              space.
            </p>

            <CustomLink href="/signup" color="secondary" responsive={false} fullWidth>
              <p className="px-10">Get Started</p>
            </CustomLink>
          </div>

          {/* Image column */}
          <div className="w-full md:w-1/2 relative h-64 md:h-96 mt-8 md:mt-0">
            <Image
              src={heroImage}
              alt="Girl reading book while sitting on a stack of books"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>

      {/* Developer Button - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-10">
        <div className="relative group">
          <button
            onClick={() => setIsDeveloperModalOpen(true)}
            className="developer-button flex items-center justify-center w-12 h-12 rounded-md shadow-lg"
            aria-label="Meet the Developer"
          >
            <FaLeaf size={20} color="#FFFFFF" />
          </button>
          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Meet the Developer
          </div>
        </div>
      </div>

      {/* Developer Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </div>
  );
}
