import bookImage from "@/assets/test_book_cover.jpg"
import Image from "next/image"

export default function Book({coverImage, title, color="#EF6C65"}: {coverImage?:string, title:string, color?:string}){

    const blurAmount = '10px'

    return (
        <div className="relative flex" title={title}>
            {coverImage 
            ? <div className="relative overflow-hidden w-32 h-48 rounded-l-[5px] rounded-r-[2px]"> 
                <Image src={coverImage} alt="book cover image" fill style={{ objectFit: 'cover' }}/>   
                </div> 
            : <div className={`flex flex-col w-32 h-48 rounded-l-[5px] rounded-r-[3px] bg-[${color}] items-center justify-evenly`}>
                <div className="rounded-md bg-[#FFEDED] h-14 w-24"></div>
                <div className="flex flex-col gap-4">
                    <div className="rounded-md bg-[#FFEDED] h-2 w-24"></div>
                    <div className="rounded-md bg-[#FFEDED] h-2 w-24"></div>
                </div>
              </div> 
            }

            <div 
            className="mt-1 h-[185px] w-2 bg-[#e9e1d8] border-t border-b border-neutral-dark"
            style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)' }}
            />

            <div className="mt-3.5 h-[166px] w-[1.5px] bg-amber-900"></div>
            <div className="absolute h-48 w-2 bg-black/15 rounded-l-[5px]" style={{ backdropFilter: `blur(${blurAmount})`, boxShadow: 'inset -1px 0px 3.1px 0px rgba(0, 0, 0, 0.35)' }}>
                
            </div>
  
        </div>
    )
}