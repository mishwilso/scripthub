import ebook from "@/assets/vectors/ebook-download.png";
import collab from "@/assets/vectors/smart-people-2.png";
import creative from "@/assets/vectors/being-creative.png";
import Image from "next/image";

import { useState, useEffect } from "react";

const slides = [
  {
    image: ebook,
    text: "Write with confidence.</br><b>Branch your drafts,</b> explore wild ideas, and <b>merge only what you love.</b>",
    alt: "Girl looking at phone with large phone behind her",
  },
  {
    image: collab,
    text: "Writing doesn’t have to be lonely.Invite co-writers and editors, track who changed what, and keep every version in one place.",
    alt: "Two people holding vooks standing back to back",
  },
  {
    image: creative,
    text: "Keep your story world at your fingertips.Characters, locations, and lore are all one click away as you write.",
    alt: "Person standing on book wholding a paintbrush and art tools floating behind them",
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }

  function prevIndex() {
    setCurrentIndex((prev) => (prev - 1) % slides.length);
  }

  function jumpIndex(idx: number) {
    setCurrentIndex(idx);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer); // Cleanup
  }, [currentIndex]);

  return (
    <div>
      <Image src={slides[currentIndex].image} alt={slides[currentIndex].alt} />

      <div>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => jumpIndex(index)}
            className={
              currentIndex === index
                ? "w-8 h-2 bg-primary-base rounded-full"
                : "w-2 h-2 bg-primary-dark/10 rounded-full transition ease-in-out duration-300 delay-60 hover:scale-105"
            }
          />
        ))}
      </div>

      <p>{slides[currentIndex].text}</p>
    </div>
  );
}
