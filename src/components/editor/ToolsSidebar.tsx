"use client";

import { FiSidebar } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

import { BsFonts } from "react-icons/bs";

import { FiChevronLeft, FiChevronDown } from 'react-icons/fi';
import { LuBook } from "react-icons/lu";
import { FiTable } from "react-icons/fi";
import { SlMagnifier } from "react-icons/sl";
import { FiEdit3 } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaRegComments } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { TbUpload } from "react-icons/tb";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DeveloperModal from "@/components/ui/DeveloperModal";
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
  MdTitle
} from "react-icons/md";
import { TbTextColor, TbHighlight, TbLineHeight } from "react-icons/tb";


import ToolOption from "./ToolOption";

import { useState } from "react";

interface ToolsSidebarProps {
  isOpen: boolean; // Desktop state
  mobileOpen: boolean; // Mobile state
  onToggle: () => void; // Desktop toggle
  onClose: () => void; // Mobile close
}

export default function ToolsSidebar({
  isOpen,
  mobileOpen,
  onToggle,
  onClose,
}: ToolsSidebarProps) {

  return (
    <>
      {/* Mobile Slide Drawer */}
      <aside
        className={`lg:hidden fixed z-40 inset-y-0 right-0 w-72
                    bg-white-input border-l border-neutral-dark/20
                    transform transition-transform duration-300
                    ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ToolsDetails isOpen={mobileOpen} isMobile />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar - needs to be sticky to take up space and stay in place :) */}
      <aside
        className={`hidden lg:flex lg:sticky top-0 shrink-0 h-screen
                    bg-white-input border-l border-neutral-dark/20
                    transition-all duration-300 ease-in-out group/toolsbar overflow-hidden
                    ${isOpen ? "w-72" : "w-14"}`}
      >
        <ToolsDetails isOpen={isOpen} onToggle={onToggle} />
      </aside>
    </>
  );
}

interface ToolsDetailsProps {
  isOpen: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export function ToolsDetails({
  isOpen,
  onToggle,
  isMobile = false,
}: ToolsDetailsProps) {

  const [activeView, setActiveView] = useState<string>('menu');


  return (
    <nav className="flex flex-col w-full h-full">
      {/* Mobile Header */}
      <div className="md:hidden"></div>

      {/* Desktop Header */}
      <div className="hidden md:flex relative items-center justify-between h-14 px-4 py-5 border-b border-neutral-dark/10 overflow-hidden shrink-0">
        {activeView !== 'menu' && (
          <button onClick={() => setActiveView('menu')}>
            <FiChevronLeft />
          </button>
        )}

        {/* Header Title - only show when open */}
        {activeView === 'menu' && 
        <h2
          className={`text-lg font-semibold text-secondary-dark transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Tools
        </h2>
        }

        {/* Toggle button - shows on sidebar hover */}
        {!isMobile && onToggle && (
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-light transition-all shrink-0 ${
              isOpen
                ? "opacity-0 group-hover/toolsbar:opacity-100"
                : "absolute left-1/2 -translate-x-1/2 opacity-100"
            }`}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FiSidebar
              size={18}
              className="text-secondary-dark/70 hover:text-primary-base transition-colors"
            />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 h-full">
        {activeView === 'menu' && <ToolMenu onSelectTool={setActiveView} isOpen={isOpen}/>}
        {activeView === 'format' && <Format isOpen={isOpen} />}
        {activeView !== 'menu' && activeView !=='format' && <Placeholder isOpen={isOpen} />}
      </div>
      
    </nav>
  );
}


const ToolMenu = ({onSelectTool, isOpen}: {onSelectTool: (tool: string) => void, isOpen: boolean}) => {
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

  return (
    <>
      {/* Tools Content Area - Fixed height to fit on screen */}
      <div className="flex flex-col px-0.5 py-2 gap-2">
        <ToolOption
          icon={<LuBook size={20} />}
          label="World Building"
          isOpen={isOpen}
          altText="World Building"
          onClick={() => onSelectTool('worldbuilding')}
        />
        <ToolOption
          icon={<MdTitle size={20} />}
          label="Format"
          isOpen={isOpen}
          altText="Format"
          onClick={() => onSelectTool('format')}
        />
        <ToolOption
          icon={<FiTable size={20} />}
          label="Outline"
          isOpen={isOpen}
          altText="Outline"
          onClick={() => onSelectTool('outline')}
        />
        <ToolOption
          icon={<SlMagnifier size={20} />}
          label="Find and Replace"
          isOpen={isOpen}
          altText="Find and Replace"
          onClick={() => onSelectTool('find')}
        />
        <ToolOption
          icon={<FiEdit3 size={20} />}
          label="Spell Check"
          isOpen={isOpen}
          altText="Spell Check"
          onClick={() => onSelectTool('spellcheck')}
        />
        <ToolOption
          icon={<RxCounterClockwiseClock size={20} />}
          label="Version History"
          isOpen={isOpen}
          altText="Version History"
          onClick={() => onSelectTool('history')}
        />
        <ToolOption
          icon={<FaRegComments size={20} />}
          label="Comment"
          isOpen={isOpen}
          altText="Comment"
          onClick={() => onSelectTool('comment')}
        />
        <ToolOption
          icon={<FiUsers size={20} />}
          label="Collaborators"
          isOpen={isOpen}
          altText="Collaborators"
          onClick={() => onSelectTool('collaborators')}
        />
        <ToolOption
          icon={<TbUpload size={20} />}
          label="Share and Export"
          isOpen={isOpen}
          altText="Share and Export"
          onClick={() => onSelectTool('export')}
        />
        <ToolOption
          icon={<AiOutlineInfoCircle size={20} />}
          label="Draft Info"
          isOpen={isOpen}
          altText="Draft Info"
          onClick={() => onSelectTool('info')}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer - Green Leaf Button at Bottom Right */}
      <div className="px-2 pb-2 flex justify-end shrink-0">
        <div className="relative group">
          <button
            onClick={() => setIsDeveloperModalOpen(true)}
            className="developer-button flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Meet the Developer"
          >
            <FaLeaf size={18} color="#FFFFFF" />
          </button>
          {/* Tooltip - only show when closed */}
          {!isOpen && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-dark text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              Meet the Developer
            </div>
          )}
        </div>
      </div>

      {/* Developer Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </>
  );
};

interface ToolPage {
  isOpen: boolean;
}

const Placeholder = ({ isOpen }: ToolPage) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1"> 
    </div>
  )
}

const Format = ({isOpen}: ToolPage) => {
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

  const colors = [
    { name: 'Purple', value: '#A855F7' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'White', value: '#FFFFFF' },
  ];

  return (
    <div className="flex flex-col overflow-y-auto mb-20">
      <h2 className="text-xl font-semibold py-5 px-4">Format</h2>

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
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setColorPickerOpen(!colorPickerOpen);
                  setHighlightPickerOpen(false);
                  console.log('Text color picker toggled:', !colorPickerOpen);
                }}
                className="flex flex-col gap-1 items-center justify-center w-14 h-14 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbTextColor size={20} />
                <div className="w-6 h-1 rounded-full bg-neutral-dark border-[1px] border-black"></div>
              </button>
              <button
                onClick={() => {
                  setHighlightPickerOpen(!highlightPickerOpen);
                  setColorPickerOpen(false);
                  console.log('Highlight color picker toggled:', !highlightPickerOpen);
                }}
                className="flex flex-col gap-1 items-center justify-center w-14 h-14 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbHighlight size={20} />
                <div className="w-6 h-1 rounded-full bg-white-base border-[1px] border-black"></div>
              </button>
            </div>

            {/* Color Picker Modal */}
            {(colorPickerOpen || highlightPickerOpen) && (
              <div className="p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input animate-fade-in">
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        console.log(`${highlightPickerOpen ? 'Highlight' : 'Text'} color selected:`, color.name);
                        setColorPickerOpen(false);
                        setHighlightPickerOpen(false);
                      }}
                      className="w-10 h-10 rounded-full border-2 border-neutral-dark/20 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
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
