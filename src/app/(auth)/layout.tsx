'use client';

import MainNavbar from "@/components/layout/MainNavbar"

export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-10">
                <MainNavbar />
            </header>
            <main className="flex-1 flex justify-center items-center px-6 md:px-12 py-12 md:py-6">
                {children}
            </main>
        </div>
    )
}