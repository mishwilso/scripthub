import bookGif from "@/assets/animations/open-book-brown.gif";

import Image from "next/image";

interface LoadingOverlayProps {
  message?: string;
  isVisible?: boolean;
}

export default function LoadingOverlay({
  message = "Loading...",
  isVisible = true,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-secondary-dark/30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="flex flex-col items-center  p-8 rounded-lg">
        <Image src={bookGif} alt="Loading animation" width={150} height={150} unoptimized />
        <p className="text-lg font-medium text-secondary-dark animate-pulse">
          {message}
        </p>
      </div>
      <a
        href="https://www.flaticon.com/free-animated-icons/open-book"
        title="open book animated icons"
        className="absolute bottom-4 text-xs text-secondary-dark/60 hover:text-secondary-dark/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open book animated icons created by Freepik - Flaticon
      </a>
    </div>
  );
}
