'use client';

import MainNavbar from "@/components/layout/MainNavbar"
import DeveloperModal from "@/components/ui/DeveloperModal";
import { Suspense, useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { FaLeaf } from "react-icons/fa";

export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>){
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

    return (
        <Suspense fallback={<div><LoadingOverlay/></div>}>
        <div className="min-h-screen flex flex-col relative">
            <header className="sticky top-0 z-10">
                <MainNavbar />
            </header>
            <main className="flex-1 flex justify-center items-center px-6 md:px-12 py-12 md:py-6">
                {children}
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
        </Suspense>
    )
}