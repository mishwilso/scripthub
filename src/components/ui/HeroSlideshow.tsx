import ebook from "@/assets/vectors/ebook-download.png";
import collab from "@/assets/vectors/smart-people-2.png";
import creative from "@/assets/vectors/being-creative.png";
import Image from "next/image";

import { useState, useEffect } from "react";

const slides = [
  {
    image: ebook,
    text: (
      <p>
        Write with confidence.
        <br />
        <b>Branch your drafts,</b> explore wild ideas, and{" "}
        <b>merge only what you love.</b>
      </p>
    ),
    alt: "Girl looking at phone with large phone behind her",
  },
  {
    image: collab,
    text: (
      <p>
        Writing doesn&apos;t have to be lonely.
        <br />
        <b>Invite co-writers and editors,</b>
        track <b>who changed what,</b> and keep every version in one place.
      </p>
    ),
    alt: "Two people holding vooks standing back to back",
  },
  {
    image: creative,
    text: (
      <p>
        Keep your story world at your fingertips.
        <br />
        <b>Characters, locations, and lore</b> are all <b>one click away</b> as
        you write.
      </p>
    ),
    alt: "Person standing on book wholding a paintbrush and art tools floating behind them",
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }

  function jumpIndex(idx: number) {
    setCurrentIndex(idx);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer); // Cleanup
  }, [currentIndex]);

  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="w-64 h-64 md:w-96 md:h-96 relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                  : index < currentIndex
                  ? "opacity-0 -translate-x-full pointer-events-none"
                  : "opacity-0 translate-x-full pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={
                currentIndex === index
                  ? "w-8 h-4 bg-primary-base rounded-full"
                  : "w-4 h-4 bg-primary-dark/10 rounded-full transition ease-in-out duration-300 delay-60 hover:scale-115 hover:bg-primary-dark/30"
              }
            />
          ))}
        </div>

        <div className="w-64 md:w-96 text-center text-secondary-dark mt-4">
          {slides[currentIndex].text}
        </div>
      </div>
    </div>
  );
}
