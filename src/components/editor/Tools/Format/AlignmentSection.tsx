import { LexicalEditor } from "lexical";
import { useFormatState } from "./useFormatState";

// ---- Icons ----
import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";

interface AlignmentSectionProps {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  format: ReturnType<typeof useFormatState>;
  editor: LexicalEditor;
}

export default function AlignmentSection({ isOpen, onToggle, format, editor }: AlignmentSectionProps){
    return (
        
        <div className="border-b border-neutral-dark/10">
        {/* ================================================================== */}
        {/* ALIGNMENT SECTION - Left, Center, Right, Justify                 */}
        {/* ================================================================== */}
        <button
            onClick={() => {
            onToggle(!isOpen);
            console.log("ALIGNMENT section toggled:", !isOpen);
            }}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
            <span>ALIGNMENT</span>
            <span className="text-lg">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
            <div className="px-4 py-3 animate-fade-in">
            {/* TODO: Add active state detection for current alignment */}
            {/* TODO: Use currentAlignment state to highlight active button */}
            <div className="grid grid-cols-4 gap-2">
                <button
                onClick={() => console.log("Align left clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
                // TODO: Add active class: ${currentAlignment === 'left' ? 'bg-primary-base/20 border-primary-base' : ''}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatAlignLeft size={20} />
                </button>
                <button
                onClick={() => console.log("Align center clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatAlignCenter size={20} />
                </button>
                <button
                onClick={() => console.log("Align right clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatAlignRight size={20} />
                </button>
                <button
                onClick={() => console.log("Align justify clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                <MdFormatAlignJustify size={20} />
                </button>
            </div>
            </div>
        )}
        </div>
    )
}