'use client';
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header"

export default function AppLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
    <div className="min-h-screen flex flex-col">
        <Sidebar />
        <div className="mt-16 md:mt-0 md:ml-16 px-6 md:px-12  py-12 md:py-6">
            <header>
                <Header />
            </header>
            <main className="flex-1 flex">
                
                {children}
            </main>
        </div>
    </div>
        
    )
}