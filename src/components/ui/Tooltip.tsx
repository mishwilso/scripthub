"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  className?: string;
}

export default function Tooltip({
  children,
  text,
  position = "right",
  disabled = false,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const tooltipRect = tooltipRef.current!.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + 8;
          break;
      }

      setTooltipPos({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, position]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`fixed px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap pointer-events-none transition-opacity z-9999 ${className}`}
            style={{
              top: `${tooltipPos.top}px`,
              left: `${tooltipPos.left}px`,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
