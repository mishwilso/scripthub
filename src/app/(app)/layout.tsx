'use client';
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header"

export default function AppLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col px-6 md:px-12 py-12 md:py-6 min-w-0">
            <header>
                <Header />
            </header>
            <main className="flex-1 flex w-full">
                {children}
            </main>
        </div>
    </div>
        
    )
}