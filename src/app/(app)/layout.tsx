'use client';
import Sidebar from "@/components/layout/Sidebar";


export default function AppLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
    <div>
        <Sidebar />
        <main className="mt-16 md:mt-0 md:ml-16 flex-1 flex px-6 md:px-12  py-12 md:py-6">
            
            {children}
        </main>
    </div>
        
    )
}