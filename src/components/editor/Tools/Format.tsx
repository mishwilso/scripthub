import { useState, useRef, useEffect } from "react";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatIndentIncrease,
  MdFormatIndentDecrease,
  MdFormatQuote,
  MdCode,
  MdLink,
  MdImage,
  MdFormatClear,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,

} from "react-icons/md";
import { TbTextColor, TbHighlight, TbLineHeight } from "react-icons/tb";

import { FiChevronLeft, FiChevronDown, FiCheck } from 'react-icons/fi';

export default function Format ({isOpen}: {isOpen: boolean}) {
  const [textOpen, setTextOpen] = useState(true);
  const [stylingOpen, setStylingOpen] = useState(false);
  const [alignmentOpen, setAlignmentOpen] = useState(false);

  // Dropdown states for TEXT section
  const [headingOpen, setHeadingOpen] = useState(false);
  const [fontStyleOpen, setFontStyleOpen] = useState(false);
  const [fontWeightOpen, setFontWeightOpen] = useState(false);
  const [lineSpacingOpen, setLineSpacingOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);

  // Current selections
  const [selectedHeading, setSelectedHeading] = useState('Paragraph');
  const [selectedFontStyle, setSelectedFontStyle] = useState('Literata');
  const [selectedFontWeight, setSelectedFontWeight] = useState('Regular');
  const [fontSize, setFontSize] = useState(16);
  const [selectedTextColor, setSelectedTextColor] = useState('#5e4c3b');
  const [selectedHighlightColor, setSelectedHighlightColor] = useState('#FFFFFF');

  // Position state for color pickers
  const [textColorPickerPosition, setTextColorPickerPosition] = useState({ top: 0, left: 0 });
  const [highlightColorPickerPosition, setHighlightColorPickerPosition] = useState({ top: 0, left: 0 });

  // Refs for color picker positioning and click outside detection
  const textColorButtonRef = useRef<HTMLButtonElement>(null);
  const highlightColorButtonRef = useRef<HTMLButtonElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const highlightColorPickerRef = useRef<HTMLDivElement>(null);

  // Close color pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close text color picker if clicking outside
      if (
        colorPickerOpen &&
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(target) &&
        textColorButtonRef.current &&
        !textColorButtonRef.current.contains(target)
      ) {
        setColorPickerOpen(false);
      }

      // Close highlight color picker if clicking outside
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerOpen, highlightPickerOpen]);

  const headingOptions = [
    { label: 'Paragraph', value: 'p', size: 16 },
    { label: 'Heading 1', value: 'h1', size: 32 },
    { label: 'Heading 2', value: 'h2', size: 24 },
    { label: 'Heading 3', value: 'h3', size: 20 },
    { label: 'Heading 4', value: 'h4', size: 18 },
    { label: 'Caption', value: 'caption', size: 12 },
  ];

  const fontStyles = ['Literata', 'Arial', 'Times New Roman', 'Courier New'];
  const fontWeights = ['Light', 'Regular', 'Medium', 'Semi Bold', 'Bold'];

  const text_colors = [
    { name: 'Purple', value: '#A855F7' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Black', value: '#5e4c3b' },
    { name: 'White', value: '#FFFFFF' },
  ];

  const highlight_colors = [
    { name: 'Purple', value: '#A855F7' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Black', value: '#5e4c3b' },
    { name: 'White', value: '#FFFFFF' },
  ];

  return (
    <div className="flex flex-col overflow-y-auto mb-20 relative">
      <h2 className="text-xl font-semibold py-5 px-4">Format</h2>

      {/* Text Color Picker Modal - Positioned absolutely */}
      {colorPickerOpen && (
        <div
          ref={textColorPickerRef}
          className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
          style={{
            top: `${textColorPickerPosition.top}px`,
            left: `${textColorPickerPosition.left}px`,
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {text_colors.map((color) => {
              const isSelected = selectedTextColor === color.value;
              return (
                <button
                  key={color.name}
                  onClick={() => {
                    console.log(`Text color selected:`, color.name);
                    setSelectedTextColor(color.value);
                  }}
                  className="relative w-10 h-10 rounded-full hover:scale-110 transition-all duration-200 flex items-center justify-center"
                  style={{
                    padding: isSelected ? '3px' : '0px',
                    backgroundColor: isSelected ? color.value : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  title={color.name}
                >
                  <div
                    className="w-full h-full rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: color.value,
                      border: isSelected ? 'none' : '2px solid rgba(94, 76, 59, 0.2)',
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCheck size={16} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Highlight Color Picker Modal - Positioned absolutely */}
      {highlightPickerOpen && (
        <div
          ref={highlightColorPickerRef}
          className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
          style={{
            top: `${highlightColorPickerPosition.top}px`,
            left: `${highlightColorPickerPosition.left}px`,
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {highlight_colors.map((color) => {
              const isSelected = selectedHighlightColor === color.value;
              const isRemoveOption = color.name === 'White';

              return (
                <button
                  key={color.name}
                  onClick={() => {
                    console.log(
                      isRemoveOption ? 'Highlight removed' : `Highlight color selected: ${color.name}`
                    );
                    setSelectedHighlightColor(color.value);
                  }}
                  className="relative w-10 h-10 rounded-full hover:scale-110 transition-all duration-200 flex items-center justify-center"
                  style={{
                    padding: isSelected ? '3px' : '0px',
                    backgroundColor: isSelected ? color.value : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  title={isRemoveOption ? 'Remove highlight' : color.name}
                >
                  <div
                    className="relative w-full h-full rounded-full transition-all duration-200 flex items-center justify-center"
                    style={{
                      backgroundColor: color.value,
                      border: isSelected ? 'none' : '2px solid rgba(94, 76, 59, 0.2)',
                    }}
                  >
                    {isRemoveOption && (
                      <div
                        className="w-6 h-0.5 rotate-45"
                        style={{ backgroundColor: '#EF4444' }}
                      ></div>
                    )}
                  </div>
                  {isSelected && !isRemoveOption && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCheck size={16} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TEXT Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setTextOpen(!textOpen);
            console.log('TEXT section toggled:', !textOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>TEXT</span>
          <span className="text-lg">{textOpen ? '−' : '+'}</span>
        </button>
        {textOpen && (
          <div className="px-4 py-3 space-y-3 animate-fade-in">
            {/* Heading Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setHeadingOpen(!headingOpen);
                  console.log('Heading dropdown toggled:', !headingOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">P</span>
                  <span className="text-sm text-neutral-dark">{selectedHeading} ({fontSize})</span>
                </div>
                <FiChevronDown className={`transition-transform ${headingOpen ? 'rotate-180' : ''}`} />
              </button>
              {headingOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {headingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedHeading(option.label);
                        setFontSize(option.size);
                        setHeadingOpen(false);
                        console.log('Selected heading:', option.label);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{option.value.toUpperCase()}</span>
                        <span className="text-sm text-neutral-dark">{option.label} ({option.size})</span>
                      </div>
                      {selectedHeading === option.label && <span className="text-primary-base">✓</span>}
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
                  console.log('Font style dropdown toggled:', !fontStyleOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">{selectedFontStyle}</span>
                <FiChevronDown className={`transition-transform ${fontStyleOpen ? 'rotate-180' : ''}`} />
              </button>
              {fontStyleOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontStyles.map((font) => (
                    <button
                      key={font}
                      onClick={() => {
                        setSelectedFontStyle(font);
                        setFontStyleOpen(false);
                        console.log('Selected font style:', font);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">{font}</span>
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
                  console.log('Font weight dropdown toggled:', !fontWeightOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">{selectedFontWeight}</span>
                <FiChevronDown className={`transition-transform ${fontWeightOpen ? 'rotate-180' : ''}`} />
              </button>
              {fontWeightOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontWeights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => {
                        setSelectedFontWeight(weight);
                        setFontWeightOpen(false);
                        console.log('Selected font weight:', weight);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">{weight}</span>
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
                  setFontSize(Math.max(8, fontSize - 1));
                  console.log('Font size decreased to:', fontSize - 1);
                }}
                className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <span className="text-lg">−</span>
              </button>
              <div className="flex items-center justify-center px-3">
                <span className="text-sm font-medium">{fontSize}</span>
              </div>
              <button
                onClick={() => {
                  setFontSize(Math.min(72, fontSize + 1));
                  console.log('Font size increased to:', fontSize + 1);
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
                    console.log('Line spacing dropdown toggled:', !lineSpacingOpen);
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors border-r border-neutral-dark/20"
                >
                  <TbLineHeight size={18} />
                </button>
                <button
                  onClick={() => {
                    setLineSpacingOpen(!lineSpacingOpen);
                    console.log('Line spacing options toggled');
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <FiChevronDown className={`transition-transform ${lineSpacingOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
 
            {/* Line Spacing Options */}
            {lineSpacingOpen && (
              <div className="space-y-2 pl-2 border-l-2 border-neutral-dark/20 animate-fade-in">
                {['Letter Spacing', 'Line Height', 'Word Spacing', 'Paragraph Spacing'].map((spacing) => (
                  <div key={spacing} className="flex items-center gap-2">
                    <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                      <button
                        onClick={() => console.log(`${spacing} decreased`)}
                        className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                      >
                        <span className="text-sm">−</span>
                      </button>
                      <button
                        onClick={() => console.log(`${spacing} increased`)}
                        className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                    <span className="flex-1 text-xs text-neutral-dark">{spacing}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Text Color and Highlight */}
            <div className="flex flex-row gap-2 relative">
              <button
                ref={textColorButtonRef}
                onClick={() => {
                  if (!colorPickerOpen && textColorButtonRef.current) {
                    const rect = textColorButtonRef.current.getBoundingClientRect();
                    setTextColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setColorPickerOpen(!colorPickerOpen);
                  setHighlightPickerOpen(false);
                  console.log('Text color picker toggled:', !colorPickerOpen);
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbTextColor size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{ backgroundColor: selectedTextColor }}
                ></div>
              </button>

              <button
                ref={highlightColorButtonRef}
                onClick={() => {
                  if (!highlightPickerOpen && highlightColorButtonRef.current) {
                    const rect = highlightColorButtonRef.current.getBoundingClientRect();
                    setHighlightColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setHighlightPickerOpen(!highlightPickerOpen);
                  setColorPickerOpen(false);
                  console.log('Highlight color picker toggled:', !highlightPickerOpen);
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbHighlight size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{ backgroundColor: selectedHighlightColor }}
                ></div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STYLING Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setStylingOpen(!stylingOpen);
            console.log('STYLING section toggled:', !stylingOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>STYLING</span>
          <span className="text-lg">{stylingOpen ? '−' : '+'}</span>
        </button>
        {stylingOpen && (
          <div className="px-4 py-3 space-y-3 animate-fade-in">
            {/* Bold, Italic, Strikethrough, Underline */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log('Bold clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatBold size={20} />
              </button>
              <button
                onClick={() => console.log('Italic clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatItalic size={20} />
              </button>
              <button
                onClick={() => console.log('Strikethrough clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatStrikethrough size={20} />
              </button>
              <button
                onClick={() => console.log('Underline clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatUnderlined size={20} />
              </button>
            </div>

            {/* Lists and Indents */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log('Bulleted list clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatListBulleted size={20} />
              </button>
              <button
                onClick={() => console.log('Numbered list clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatListNumbered size={20} />
              </button>
              <button
                onClick={() => console.log('Indent increase clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatIndentIncrease size={20} />
              </button>
              <button
                onClick={() => console.log('Indent decrease clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatIndentDecrease size={20} />
              </button>
            </div>

            {/* Quote, Code, Link, Image */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log('Quote clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatQuote size={20} />
              </button>
              <button
                onClick={() => console.log('Code block clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdCode size={20} />
              </button>
              <button
                onClick={() => console.log('Link clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdLink size={20} />
              </button>
              <button
                onClick={() => console.log('Clear formatting clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatClear size={20} />
              </button>
            </div>

            {/* Image and Clear Formatting */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log('Image clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdImage size={20} />
              </button>
              <button
                onClick={() => console.log('Clear formatting clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatClear size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ALIGNMENT Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setAlignmentOpen(!alignmentOpen);
            console.log('ALIGNMENT section toggled:', !alignmentOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>ALIGNMENT</span>
          <span className="text-lg">{alignmentOpen ? '−' : '+'}</span>
        </button>
        {alignmentOpen && (
          <div className="px-4 py-3 animate-fade-in">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log('Align left clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignLeft size={20} />
              </button>
              <button
                onClick={() => console.log('Align center clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignCenter size={20} />
              </button>
              <button
                onClick={() => console.log('Align right clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignRight size={20} />
              </button>
              <button
                onClick={() => console.log('Align justify clicked')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignJustify size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
