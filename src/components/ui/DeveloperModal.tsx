"use client";

import { useEffect } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white-input border border-neutral-dark/20 rounded-lg shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-neutral-light/30 transition-colors"
            aria-label="Close modal"
          >
            <CgClose size={20} className="text-neutral-dark" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-bold text-secondary-dark">Meet the Developer</h2>

            <div className="text-neutral-dark leading-relaxed space-y-3">
              <p>Hi, I&apos;m <span className="font-semibold text-secondary-dark">Mish Wilson</span>!</p>

              <p>
                I&apos;m a CS graduate with a love for web development and design.
                I&apos;m passionate about learning new technologies and creating tools that make a difference.
              </p>

              <p>
                Thank you for visiting ScriptHub. I hope it helps bring your stories to life!
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3 w-full pt-4">
              <a
                href="https://github.com/mishwilso/scripthub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-4 py-3 bg-neutral-dark text-white rounded-md hover:bg-neutral-dark/90 transition-colors"
              >
                <FaGithub size={20} />
                <span className="font-medium">View on GitHub</span>
              </a>

              <a
                href="mailto:mishwilsonk@gmail.com"
                className="flex items-center justify-center gap-3 px-4 py-3 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors text-neutral-dark"
              >
                <FaEnvelope size={20} />
                <span className="font-medium">mishwilsonk@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
