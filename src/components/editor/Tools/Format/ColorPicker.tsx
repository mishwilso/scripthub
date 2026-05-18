import { createPortal } from "react-dom";
import { FiCheck } from "react-icons/fi";
import { text_colors, highlight_colors } from "./constants";

// ============================================================================
// TYPES
// ============================================================================
interface TextColorPickerProps {
  isOpen: boolean;
  position: { top: number; left: number };
  selectedColor: string;
  onColorSelect: (color: string) => void;
  pickerRef: React.RefObject<HTMLDivElement | null> ;
}

interface HighlightColorPickerProps {
  isOpen: boolean;
  position: { top: number; left: number };
  selectedColor: string;
  onColorSelect: (color: string) => void; 
  pickerRef: React.RefObject<HTMLDivElement | null>;
}

interface ColorOption {
  name: string;
  value: string;
  shades?: string[];
}

// ============================================================================
// TEXT COLOR PICKER
// ============================================================================
export function TextColorPicker({
  isOpen,
  position,
  selectedColor,
  onColorSelect,
  pickerRef,
}: TextColorPickerProps) {
  if (!isOpen) return null;

  const content = (
    <div
      ref={pickerRef}
      className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Main colors */}
      <div className="grid grid-cols-5 gap-2">
        {text_colors.map((color: ColorOption) => {
          const isColorFamilySelected = color.shades?.includes(selectedColor);
          return (
            <button
              key={color.name}
              onClick={() => onColorSelect(color.value)}
              className="relative w-6 h-6 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
              style={{
                padding: isColorFamilySelected ? "2px" : "0px",
                border: isColorFamilySelected
                  ? `2px solid ${color.value}`
                  : "none",
                transition: "all 0.2s ease-in-out",
              }}
              title={color.name}
            >
              <div
                className="w-full h-full rounded-full transition-all duration-150"
                style={{
                  backgroundColor: color.value,
                  border: isColorFamilySelected
                    ? "none"
                    : "2px solid rgba(94, 76, 59, 0.2)",
                }}
              />
              {isColorFamilySelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiCheck size={12} color="white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Shade variations */}
      {text_colors.find((c: ColorOption) => c.shades?.includes(selectedColor)) && (
        <>
          <div className="w-full h-px bg-neutral-dark/20 my-3" />
          <div className="flex gap-2 justify-center">
            {text_colors
              .find((c: ColorOption) => c.shades?.includes(selectedColor))
              ?.shades?.map((shade: string, index: number) => {
                const isSelected = selectedColor === shade;
                return (
                  <button
                    key={index}
                    onClick={() => onColorSelect(shade)}
                    className="relative w-6 h-12 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
                    style={{
                      padding: isSelected ? "2px" : "0px",
                      border: isSelected ? `2px solid ${shade}` : "none",
                    }}
                    title={`Shade ${index + 1}`}
                  >
                    <div
                      className="w-full h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: shade,
                        border: isSelected
                          ? "none"
                          : "1px solid rgba(94, 76, 59, 0.15)",
                      }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiCheck size={10} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );

  return createPortal(content, document.body);
}

// ============================================================================
// HIGHLIGHT COLOR PICKER
// ============================================================================
export function HighlightColorPicker({
  isOpen,
  position,
  selectedColor,
  onColorSelect,
  pickerRef,
}: HighlightColorPickerProps) {
  if (!isOpen) return null;

  const content = (
    <div
      ref={pickerRef}
      className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="grid grid-cols-5 gap-2">
        {highlight_colors.map((color: ColorOption) => {
          const isSelected = selectedColor === color.value;
          const isRemoveOption = color.name === "White";

          return (
            <button
              key={color.name}
              onClick={() => onColorSelect(color.value)}
              className="relative w-6 h-6 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
              style={{
                padding: isSelected ? "2px" : "0px",
                border: isSelected ? `2px solid ${color.value}` : "none",
                transition: "all 0.2s ease-in-out",
              }}
              title={isRemoveOption ? "Remove highlight" : color.name}
            >
              <div
                className="relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center"
                style={{
                  backgroundColor: color.value,
                  border: isSelected
                    ? "none"
                    : "2px solid rgba(94, 76, 59, 0.2)",
                }}
              >
                {isRemoveOption && (
                  <div
                    className="w-5 h-0.5 rotate-45"
                    style={{ backgroundColor: "#EF4444" }}
                  ></div>
                )}
              </div>
              {isSelected && !isRemoveOption && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiCheck size={12} color="white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}