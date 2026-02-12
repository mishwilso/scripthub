import { LexicalEditor } from "lexical";
import {
  HeadingTag,
  headingOptions,
  fontStyleOptions,
  fontWeightOptions,
} from "./constants";
import { useFormatState } from "./useFormatState";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

import SpacingControl from "./SpacingControl";
import { TextColorPicker, HighlightColorPicker } from "./ColorPicker";
import { TbTextColor, TbHighlight, TbLineHeight } from "react-icons/tb";

interface TextSectionProps {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  format: ReturnType<typeof useFormatState>;
  editor: LexicalEditor;
}

export default function TextSection({
  isOpen,
  onToggle,
  format,
  editor,
}: TextSectionProps) {
  // ==========================================================================
  // STATE - Dropdown Visibility
  // ==========================================================================
  const [headingOpen, setHeadingOpen] = useState(false);
  const [fontStyleOpen, setFontStyleOpen] = useState(false);
  const [fontWeightOpen, setFontWeightOpen] = useState(false);
  const [lineSpacingOpen, setLineSpacingOpen] = useState(false);

  // ==========================================================================
  // COLOR PICKER - Position State & Refs
  // ==========================================================================
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);
    const [textColorPickerPosition, setTextColorPickerPosition] = useState({ top: 0, left: 0 });
    const [highlightColorPickerPosition, setHighlightColorPickerPosition] = useState({ top: 0, left: 0 });

    const textColorButtonRef = useRef<HTMLButtonElement>(null);
    const highlightColorButtonRef = useRef<HTMLButtonElement>(null);
    const textColorPickerRef = useRef<HTMLDivElement>(null);
    const highlightColorPickerRef = useRef<HTMLDivElement>(null);

  // Keep click outside handler in parent
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        colorPickerOpen &&
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(target) &&
        textColorButtonRef.current &&
        !textColorButtonRef.current.contains(target)
      ) {
        setColorPickerOpen(false);
      }
      if (
        highlightPickerOpen &&
        highlightColorPickerRef.current &&
        !highlightColorPickerRef.current.contains(target) &&
        highlightColorButtonRef.current &&
        !highlightColorButtonRef.current.contains(target)
      ) {
        setHighlightPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [colorPickerOpen, highlightPickerOpen]);

  return (
    <>
      <TextColorPicker
        isOpen={colorPickerOpen}
        position={textColorPickerPosition}
        selectedColor={format.text.selectedTextColor}
        onColorSelect={format.text.applyTextColor}
        pickerRef={textColorPickerRef}
      />

      <HighlightColorPicker
        isOpen={highlightPickerOpen}
        position={highlightColorPickerPosition}
        selectedColor={format.text.selectedHighlightColor}
        onColorSelect={format.text.applyHighlightColor}
        pickerRef={highlightColorPickerRef}
      />

      <div className="border-b border-neutral-dark/10">
        {/* ================================================================== */}
        {/* TEXT SECTION - Heading, Font, Size, Spacing, Colors                */}
        {/* ================================================================== */}
        <button
          onClick={() => {
            onToggle(!isOpen);
            console.log("TEXT section toggled:", !isOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>TEXT</span>
          <span className="text-lg">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="px-4 py-3 space-y-3 animate-fade-in">
            {/* Heading Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setHeadingOpen(!headingOpen);
                  console.log("Heading dropdown toggled:", !headingOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">P</span>
                  <span className="text-sm text-neutral-dark">
                    {format.text.selectedHeading} ({format.text.fontSize})
                  </span>
                </div>
                <FiChevronDown
                  className={`transition-transform ${
                    headingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {headingOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {headingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        // setSelectedHeading(option.label);
                        // setFontSize(option.size);
                        // setSelectedFontWeight(getWeightLabel(option.weight));
                        setHeadingOpen(false);
                        format.text.applyHeading(option.value);
                        console.log("Selected heading:", option.label);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {option.value.toUpperCase()}
                        </span>
                        <span className="text-sm text-neutral-dark">
                          {option.label} ({option.size})
                        </span>
                      </div>
                      {format.text.selectedHeading === option.label && (
                        <span className="text-primary-base">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Style Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFontStyleOpen(!fontStyleOpen);
                  console.log("Font style dropdown toggled:", !fontStyleOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">
                  {format.text.selectedFontStyle}
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    fontStyleOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {fontStyleOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontStyleOptions.map((font) => (
                    <button
                      key={font.label}
                      onClick={() => {
                        //setSelectedFontStyle(font.label);
                        setFontStyleOpen(false);
                        format.text.applyFontStyle(font.value);
                        console.log("Selected font style:", font.label);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">
                        {font.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Weight Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFontWeightOpen(!fontWeightOpen);
                  console.log("Font weight dropdown toggled:", !fontWeightOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">
                  {format.text.selectedFontWeight}
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    fontWeightOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {fontWeightOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontWeightOptions.map((weight) => (
                    <button
                      key={weight.label}
                      onClick={() => {
                        // setSelectedFontWeight(weight);
                        // setFontWeightOpen(false);
                        format.text.applyFontWeight(weight.label);
                        console.log("Selected font weight:", weight);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">
                        {weight.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    // setFontSize(Math.max(8, fontSize - 1));
                    format.text.applyFontSize(format.text.fontSize - 1);
                    console.log(
                      "Font size decreased to:",
                      format.text.fontSize - 1,
                    );
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="flex items-center justify-center px-3">
                  <span className="text-sm font-medium">
                    {format.text.fontSize}
                  </span>
                </div>
                <button
                  onClick={() => {
                    // setFontSize(Math.min(72, format.text.fontSize + 1));
                    format.text.applyFontSize(format.text.fontSize + 1);
                    console.log(
                      "Font size increased to:",
                      format.text.fontSize + 1,
                    );
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setLineSpacingOpen(!lineSpacingOpen);
                    console.log(
                      "Line spacing dropdown toggled:",
                      !lineSpacingOpen,
                    );
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors border-r border-neutral-dark/20"
                >
                  <TbLineHeight size={18} />
                </button>
                <button
                  onClick={() => {
                    setLineSpacingOpen(!lineSpacingOpen);
                    console.log("Line spacing options toggled");
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <FiChevronDown
                    className={`transition-transform ${
                      lineSpacingOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Line Spacing Options */}
            {lineSpacingOpen && (
              <div className="space-y-2 pl-2 border-l-2 border-neutral-dark/20 animate-fade-in">
                <SpacingControl
                  label="Letter Spacing"
                  value={format.text.letterSpacing}
                  unit="em"
                  onChange={format.text.applyLetterSpacing}
                  step={0.01}
                  min={-0.05}
                  max={0.5}
                />
                <SpacingControl
                  label="Line Height"
                  value={format.text.lineHeight}
                  unit=""
                  onChange={format.text.applyLineHeight}
                  step={0.1}
                  min={0.8}
                  max={3}
                />
                <SpacingControl
                  label="Word Spacing"
                  value={format.text.wordSpacing}
                  unit="em"
                  onChange={format.text.applyWordSpacing}
                  step={0.05}
                  min={0}
                  max={1}
                />
                {/* TODO: Need Custom Node to allow for margin bottom modification */}
                {/* <SpacingControl
                label="Paragraph Spacing"
                value={paragraphSpacing}
                unit="em"
                onChange={format.text.applyParagraphSpacing}
                step={0.25}
                min={0}
                max={4}
                /> */}
              </div>
            )}

            {/* Text Color and Highlight */}
            <div className="flex flex-row gap-2 relative">
              <button
                ref={textColorButtonRef}
                onClick={() => {
                  if (!colorPickerOpen && textColorButtonRef.current) {
                    const rect =
                      textColorButtonRef.current.getBoundingClientRect();
                    setTextColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setColorPickerOpen(!colorPickerOpen);
                  setHighlightPickerOpen(false);
                  console.log("Text color picker toggled:", !colorPickerOpen);
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbTextColor size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{ backgroundColor: format.text.selectedTextColor }}
                ></div>
              </button>

              <button
                ref={highlightColorButtonRef}
                onClick={() => {
                  if (!highlightPickerOpen && highlightColorButtonRef.current) {
                    const rect =
                      highlightColorButtonRef.current.getBoundingClientRect();
                    setHighlightColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setHighlightPickerOpen(!highlightPickerOpen);
                  setColorPickerOpen(false);
                  console.log(
                    "Highlight color picker toggled:",
                    !highlightPickerOpen,
                  );
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbHighlight size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{
                    backgroundColor: format.text.selectedHighlightColor,
                  }}
                ></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
