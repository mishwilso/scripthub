"use client";

import MainNavbar from "@/components/layout/MainNavbar";
import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";

import heroImage from "@/assets/vectors/knowledge-base.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white-light">
      <header className="sticky top-0 z-10">
        <MainNavbar />
      </header>
      <main className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h1>All your story pieces, finally in one place.</h1>
          <p>
            Explore new ideas without fear, keep every draft and version safe,
            and pull up your characters, places, and notes whenever you need
            them.
          </p>
          <p>
            Whether you&aposre worldbuilding or polishing a chapter, everything you
            create stays connected — all in one cozy, writer-friendly space.
          </p>

          
        </div>
        <div>
          <Image
            src={heroImage}
            alt="Girl reading book while sitting on a stack of books"
          />
        </div>
      </main>
    </div>
  );
}
