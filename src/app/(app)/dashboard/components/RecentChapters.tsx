
import Image, { StaticImageData } from "next/image";

import no_chapters from "@/assets/vectors/no-chapters.png";


export default function RecentChapters(){

    const movies = []

    return (
        <section className="flex flex-col">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-semibold text-secondary-dark">
                    Continue Writing
                  </h2>
                  <p className="text-sm text-secondary-dark">
                    Jump back into your recent works
                  </p>
                </div>
              </div>
              <div className="border-b-2 border-[#917F74]/39 mt-2"></div>
              {/* Carousel Time */}
              {movies.length > 0 ? (
                <div
                  className="flex overflow-x-scroll w-full gap-8 pt-6 pl-1 h-72"
                >
            
                </div>
              ) : (
                <div className="flex flex-col gap-3 items-center justify-center w-full h-64">
                  <Image
                    src={no_chapters}
                    alt="Girl uploading pages from her phone in a cloud holding a book"
                    width={100}
                    height={100}
                  />
                  <div className="text-center">
                    <h3>Nothing to continue...yet</h3>
                    <p>
                      Once you start writing chapters, you can pick up right where you left off.
                    </p>
                  </div> 
                </div>
              )}
            </section>
    )
}