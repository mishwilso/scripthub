"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";

import heroImage from "@/assets/vectors/knowledge-base.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
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

            <CustomLink href="/signup" color="secondary" responsive={false}>
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
    </div>
  );
}
