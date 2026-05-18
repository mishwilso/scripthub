import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useFormatState } from "./useFormatState";
import { getButtonClass } from "./constants";

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
  MdFormatClear
} from "react-icons/md";

// ---- Lexical Core ----
import {
  FORMAT_TEXT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  INDENT_CONTENT_COMMAND,
} from "lexical";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useEffect, useRef, useState } from "react";
import { LinkModal } from "./LinkModal";


interface StylingSectionProps {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  format: ReturnType<typeof useFormatState>;
  editor: LexicalEditor;
}

export default function StylingSection({isOpen, onToggle, format, editor} : StylingSectionProps){

    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [linkModalPosition, setLinkModalPosition] = useState({ top: 0, left: 0 });
    const [url, setUrl] = useState("");
    const linkModalRef = useRef<HTMLDivElement>(null);

    // Keep click outside handler in parent
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (linkModalOpen && 
            linkModalRef.current && 
            !linkModalRef.current.contains(target)
        ) {
        setLinkModalOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [linkModalOpen]);

    const openLinkModal = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const nativeSelection = window.getSelection();
                const range = nativeSelection?.getRangeAt(0);

                if (range) {
                    const rect = range.getBoundingClientRect();
                    setLinkModalPosition({
                        top: rect.bottom + window.scrollY + 8,
                        left: rect.left + window.scrollX,
                    });
                }
            }
        });

        setLinkModalOpen(true);
    };

    const handleLinkSubmit = (url: string) => {
        format.styling.applyLink(url);
        setLinkModalOpen(false);
    }

    return (
        <>

            <LinkModal
                isOpen={linkModalOpen}
                position={linkModalPosition}
                onSubmit={handleLinkSubmit}
                isLink={format.styling.isLink}
                url={url}
                setUrl={setUrl}
                onRemove={() => {
                    format.styling.removeLink();
                    setLinkModalOpen(false);
                }}
                linkModalRef={linkModalRef}
            />


        <div className="border-b border-neutral-dark/10">
        {/* ================================================================== */}
        {/* STYLING SECTION - Bold, Italic, Lists, Quote, Code, etc.         */}
        {/* ================================================================== */}
        <button
            onClick={() => {
            onToggle(!isOpen);
            console.log("STYLING section toggled:", !isOpen);
            }}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
            <span>STYLING</span>
            <span className="text-lg">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
            <div className="px-4 py-3 space-y-3 animate-fade-in">
            {/* Bold, Italic, Strikethrough, Underline */}
            <div className="grid grid-cols-4 gap-2">
                <button
                onClick={() =>
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                }
                className={getButtonClass(format.styling.isBold)}
                >
                <MdFormatBold size={20} />
                </button>
                <button
                onClick={() =>
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                }
                className={getButtonClass(format.styling.isItalic)}
                >
                <MdFormatItalic size={20} />
                </button>
                <button
                onClick={() =>
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
                }
                className={getButtonClass(format.styling.isStrikethrough)}
                >
                <MdFormatStrikethrough size={20} />
                </button>
                <button
                onClick={() =>
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                }
                className={getButtonClass(format.styling.isUnderline)}
                >
                <MdFormatUnderlined size={20} />
                </button>
            </div>

            {/* Lists and Indents */}
            {/* TODO: Add list state detection - check if current block is in a list */}
            <div className="grid grid-cols-4 gap-2">
                <button
                onClick={() =>
                    format.styling.isUnorderedList
                    ? editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
                    : editor.dispatchCommand(
                        INSERT_UNORDERED_LIST_COMMAND,
                        undefined,
                        )
                }
                className={getButtonClass(format.styling.isUnorderedList)}
                >
                <MdFormatListBulleted size={20} />
                </button>
                <button
                onClick={
                    format.styling.isOrderedList
                    ? () =>
                        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
                    : () =>
                        editor.dispatchCommand(
                            INSERT_ORDERED_LIST_COMMAND,
                            undefined,
                        )
                }
                className={getButtonClass(format.styling.isOrderedList)}
                >
                <MdFormatListNumbered size={20} />
                </button>
                <button
                onClick={() =>
                    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
                }
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatIndentIncrease size={20} />
                </button>
                <button
                onClick={() =>
                    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
                }
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatIndentDecrease size={20} />
                </button>
            </div>

            {/* Quote, Code, Link, Image */}
            <div className="grid grid-cols-4 gap-2">

                <button
                    onClick={format.styling.applyQuote}
                    className={getButtonClass(format.styling.isQuote)}
                    >
                    <MdFormatQuote size={20} />
                </button>

                <button
                    onClick={format.styling.applyCode}
                    className={getButtonClass(format.styling.isCode)}
                    >
                    <MdCode size={20} />
                </button>
                
                <button
                onClick={openLinkModal}
                // TODO: Open a modal/popover to enter URL, then:
                // editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
                // If already a link, use: editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdLink size={20} />
                </button>
                <button
                onClick={() => console.log("Clear formatting clicked")}
                // TODO: Implement clearFormatting() function (see notes at top of file)
                // Should clear: bold, italic, underline, strikethrough, color, background-color, font-size, font-family, font-weight
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatClear size={20} />
                </button>
            </div>

            {/* Image and Clear Formatting */}
            <div className="grid grid-cols-4 gap-2">
                <button
                onClick={() => console.log("Image clicked")}
                // TODO: Open file picker or image URL modal
                // Then insert image node into editor
                // May need custom ImageNode - see Lexical ImageNode plugin
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdImage size={20} />
                </button>
                <button
                onClick={() => console.log("Clear formatting clicked")}
                // TODO: Same as above - implement clearFormatting()
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatClear size={20} />
                </button>
            </div>
            </div>
        )}
        </div>

        </>
    )
}
