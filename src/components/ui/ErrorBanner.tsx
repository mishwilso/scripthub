"use client";

import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface ErrorBannerProps {
  message: string | null;
  onClose: () => void;
  duration?: number; // Auto-dismiss duration in ms (optional)
}

export default function ErrorBanner({
  message,
  onClose,
  duration,
}: ErrorBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
  setIsClosing(true);
  // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  useEffect(() => {
    if (message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      setIsClosing(false);

      // Auto-dismiss after duration if specified
      if (duration) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [message, duration]);

 

  if (!message || !isVisible) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-40 max-w-md w-full ${
        isClosing ? "error-banner-exit" : "error-banner-enter"
      }`}
    >
      <div className="bg-negative-base text-white-base rounded-lg shadow-lg p-4 flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Error</h3>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white-base/20 rounded transition-colors"
          aria-label="Close error message"
        >
          <FaXmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
