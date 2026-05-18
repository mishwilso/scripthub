import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

// ============================================================================
// TYPES
// ============================================================================
interface LinkProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onSubmit: (url: string) => void;
  isLink: boolean;
  url: string;
  setUrl: (url: string) => void;
  onRemove: () => void;
  linkModalRef: React.RefObject<HTMLDivElement | null>;
}

export function LinkModal({
  isOpen,
  position,
  onSubmit,
  isLink,
  onRemove,
  url,
  setUrl,
  linkModalRef,
}: LinkProps) {
  if (!isOpen) return null;

  const content = (
    <div
      ref={linkModalRef}
      className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Link input and options would go here */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste a link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-base"
        />
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSubmit(url)}
            className="px-4 py-2 bg-neutral-base text-secondary-dark hover:bg-secondary-base hover:text-white-base rounded-md transition-colors">
            Apply
          </button>
          {/* // if selected is a link, show remove button? */}
          {isLink && (
            <button 
            onClick={() => onRemove()}
            className="px-4 py-2 bg-neutral-base text-secondary-dark rounded-md hover:bg-secondary-base hover:text-white-base transition-colors">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
