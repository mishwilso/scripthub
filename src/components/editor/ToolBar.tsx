

import { TbArrowBackUp } from "react-icons/tb";
import { TbArrowForwardUp } from "react-icons/tb";

import { BsFonts } from "react-icons/bs";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CAN_REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_EDITOR} from "lexical";

import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $setBlocksType, $getSelectionStyleValueForProperty } from "@lexical/selection";
import { $createQuoteNode } from "@lexical/rich-text";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

import { $patchStyleText } from "@lexical/selection";

import Tooltip from "../ui/Tooltip";
import { useEffect, useState } from "react";


import {
  MdOutlineEdit,
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
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
  MdTitle,
  MdHorizontalRule
} from "react-icons/md";


export default function ToolBar() {

    // Button States
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    // Format States (currently working ✅)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isStrikethrough, setIsStrikethrough] = useState(false)
    const [isUnderlined, setIsUnderlined] = useState(false)

    // TODO: Add color picker popover states
    const [textColorPickerOpen, setTextColorPickerOpen] = useState(false);
    const [highlightColorPickerOpen, setHighlightColorPickerOpen] = useState(false);

    // TODO: Add current color states (detected from selection)
    const [currentTextColor, setCurrentTextColor] = useState('#78716C');
    const [currentHighlightColor, setCurrentHighlightColor] = useState('#FFFFFF');

    // TODO: Add link state
    const [isLink, setIsLink] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkModalOpen, setLinkModalOpen] = useState(false);

    // TODO: Add quote state
    const [isQuote, setIsQuote] = useState(false);

    const [editor] = useLexicalComposerContext();

    // TODO: implement handlers

    // Example function showing how $patchStyleText works (for reference)
    const setYellow = () => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            color: "yellow"
          });
        }
      });
    }

    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (
    //     event.key === 'x' && 
    //     (event.metaKey || event.ctrlKey) && 
    //     event.shiftKey
    //   ) {

    //     event.preventDefault;
    //     event.stopPropagation;

    //     editor.update(() => {
    //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
    //     })
        
    //   }

    //     return true;
    // }

    useEffect(() => {

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )

      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )

    }, [editor])

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            // Check if the selection has the 'bold' format ✅
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderlined(selection.hasFormat('underline'))
            setIsStrikethrough(selection.hasFormat('strikethrough'))

            // TODO: implement selection formatsL color, bgcolor, text alignment, link detection, quote detection
          }
        });
      });
    }, [editor]);

    // Detection: selection.hasFormat('strikethrough')




    return (
        <div className="overflow-scroll-gradient">
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="z-0 lg:fixed h-fit lg:bottom-0 lg:left-0 lg:right-0 lg:bg-secondary-base lg:rounded-2xl lg:mb-10 py-1 px-2 flex items-start lg:items-center justify-center divide-x-2 divide-secondary-dark lg:divide-white-base lg:w-fit mx-auto border-b border-neutral-dark/10 lg:border-b-0 w-max lg:shadow-[0_0_25px_rgba(0,0,0,0.25)]"> 
        
            <div className="flex items-start mr-2 gap-1">
                <Tool
                icon={<TbArrowBackUp size={20} />}
                label="Undo"
                tooltip={<p>Undo    <span className="tooltip">Ctrl</span> <span className="tooltip">Z</span></p>}
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                disabled={!canUndo}
                />

                <Tool
                icon={<TbArrowForwardUp size={20} />}
                label="Redo"
                tooltip={<p>Redo    <span className="tooltip">Shift</span> <span className="tooltip">Ctrl</span> <span className="tooltip">Z</span></p>}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                disabled={!canRedo}
                />
            </div>

            {/* Text Color and Highlight Color Section */}
            {/* TODO: Implement color picker popovers that appear above the toolbar */}
            {/* TODO: Update the color indicator bar to show currentTextColor/currentHighlightColor */}
            <div className="flex mx-2 gap-1">
                <Tool
                icon={<div className="flex flex-col"><MdTitle size={20} /> <div className="w-full h-1 rounded-full  border-[1px] border-black" style={{backgroundColor: currentTextColor}}></div> </div>}
                label="Text Color"
                onClick={() => console.log("Color")}
                // TODO: Add color picker popover component here
                />

                <Tool
                icon={<div className="flex flex-col"><MdOutlineEdit size={20} /> <div className="w-full h-1 rounded-full bg-white-base border-[1px] border-black"></div> </div>}
                // TODO: Update icon to show current highlight color:
                label="Highlight Color"
                onClick={() => console.log("Highlight")}
                
                />
            </div>

            <div className="flex mx-2 gap-1">
                <Tool
                icon={<MdFormatBold size={20} />}
                label="Bold"
                tooltip={<p>Bold    <span className="tooltip">Ctrl</span> <span className="tooltip">B</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                active={isBold}
                />

                <Tool
                icon={<MdFormatItalic size={20} />}
                label="Italic"
                tooltip={<p>Italic    <span className="tooltip">Ctrl</span> <span className="tooltip">I</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                active={isItalic}
                />

                <Tool
                icon={<MdFormatUnderlined size={20} />}
                label="Underline"
                tooltip={<p>Underline    <span className="tooltip">Ctrl</span> <span className="tooltip">U</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                active={isUnderlined}
                />

                <Tool
                icon={<MdStrikethroughS size={20} />}
                label="Strikethrough"
                tooltip={<p>Strikethrough    <span className="tooltip">Shift</span> <span className="tooltip">Ctrl</span> <span className="tooltip">X</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                active={isStrikethrough}
                />
            </div>

            {/* Insert Elements Section */}
            <div className="flex mx-2 gap gap-1">
                <Tool
                icon={<MdLink size={20} />}
                label="Link"
                onClick={() => console.log("Link")}
                
                // TODO: Add active state: active={isLink}
                // TODO: Show link modal/popover for URL input
                
                />

                <Tool
                icon={<MdImage size={20} />}
                label="Image"
                onClick={() => console.log("Image")}
                // TODO: Open file picker dialog
                // TODO: After file selected, insert ImageNode into editor
                // TODO: Requires custom ImageNode implementation
                // See: https://lexical.dev/docs/concepts/nodes
                />

                <Tool
                icon={<MdFormatQuote size={20} />}
                label="Quote"
                onClick={() => console.log("Quote")}
                
                // TODO: Add active state: active={isQuote}
                // TODO: Toggle quote off if already in quote block
                />

                <Tool
                icon={<MdHorizontalRule size={20} />}
                label="Divider"
                onClick={() => console.log("Divider")}
                
                // Needs: import { INSERT_HORIZONTAL_RULE_COMMAND }
                // And register HorizontalRuleNode in editor config
                />
            </div>

            {/* Indentation Section */}
            <div className="flex ml-2 mr-3 gap-1">
                <Tool
                icon={<MdFormatIndentDecrease size={20} />}
                label="Decrease Indent"
                onClick={() => console.log("Decrease Indent")}
                
                // Uses: editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                />

                <Tool
                icon={<MdFormatIndentIncrease size={20} />}
                label="Increase Indent"
                onClick={() => console.log("Increase Indent")}
                
                // Uses: editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                />
            </div>
        
            </div>
        </div>
        </div>
        
    )
}

interface ToolOptionProps {
  icon: React.ReactNode;
  label: string;
  tooltip?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

function Tool({
  icon,
  label,
  tooltip,
  onClick,
  disabled,
  active
}: ToolOptionProps) {
    return(
            <Tooltip text={tooltip || label} position="top">
              <button
                className={`relative flex items-center justify-center h-10 rounded-md transition-colors 
                  overflow-hidden gap-3 w-full disabled:opacity-55 border
                
                  lg:text-white-base enabled:hover:bg-neutral-light enabled:hover:lg:text-secondary-base 
                  delay-60 duration-300 ml-2 text-secondary-dark 
                  p-1.5 
                  
                  ${active ? "bg-[#344A39]  border-neutral-light/50" : "border-transparent"}
                  `}
                aria-label={label}
                onClick={onClick}
                disabled={disabled}
              >
                  {/* Icon - stays in fixed position */}
                  <span className="shrink-0" aria-label={label}>
                    {icon}
                  </span>
              </button>
            </Tooltip>
    )
}