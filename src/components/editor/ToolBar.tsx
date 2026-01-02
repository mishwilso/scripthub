import { TbArrowBackUp } from "react-icons/tb";
import { TbArrowForwardUp } from "react-icons/tb";

import { BsFonts } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

import { MdFormatBold } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdStrikethroughS } from "react-icons/md";
import { MdFormatUnderlined } from "react-icons/md";

import { AiOutlineLink } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { MdFormatQuote } from "react-icons/md";
import { RxDividerHorizontal } from "react-icons/rx";

import { MdFormatIndentDecrease } from "react-icons/md";
import { MdFormatIndentIncrease } from "react-icons/md";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, CAN_REDO_COMMAND} from "lexical";
import { $patchStyleText } from "@lexical/selection";

import Tooltip from "../ui/Tooltip";
import { useEffect, useState } from "react";



export default function ToolBar() {

    // Button States
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    const [editor] = useLexicalComposerContext();

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

    // Detection: selection.hasFormat('strikethrough')



    return (
        <div className="overflow-scroll-gradient">
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="z-20 lg:fixed h-fit lg:bottom-0 lg:left-0 lg:right-0 lg:bg-secondary-base lg:rounded-2xl lg:mb-10 py-1 px-2 flex items-start lg:items-center justify-center divide-x-2 divide-secondary-dark lg:divide-white-base lg:w-fit mx-auto border-b border-neutral-dark/10 lg:border-b-0 w-max lg:shadow-[0_0_25px_rgba(0,0,0,0.25)]"> 
        
            <div className="flex items-start">
                <Tool
                icon={<TbArrowBackUp size={20} />}
                label="Undo"
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                disabled={!canUndo}
                />

                <Tool
                icon={<TbArrowForwardUp size={20} />}
                label="Redo"
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                disabled={!canRedo}
                />
            </div>

            <div className="flex mx-2">
              <Tool
                icon={<BsFonts className="" size={20} />}
                label="Undo"
                onClick={() => console.log("Format")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<div className="flex flex-col"><BsFonts size={20} /> <div className="w-full h-1 rounded-full bg-white-base border-[1px] border-black"></div> </div>}
                label="Color"
                onClick={() => console.log("Color")}
                />

                <Tool
                icon={<div className="flex flex-col"><MdOutlineEdit size={20} /> <div className="w-full h-1 rounded-full bg-white-base border-[1px] border-black"></div> </div>}
                label="Highlight"
                onClick={() => console.log("Highlight")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<MdFormatBold size={20} />}
                label="Bold Ctrl + B"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                />

                <Tool
                icon={<MdFormatItalic size={20} />}
                label="Italic"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                />

                <Tool
                icon={<MdFormatUnderlined size={20} />}
                label="Underline"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                />

                <Tool
                icon={<MdStrikethroughS size={20} />}
                label="Strikethrough"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<AiOutlineLink size={20} />}
                label="Link"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<FiImage size={20} />}
                label="Image"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<MdFormatQuote size={20} />}
                label="Qoute"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<RxDividerHorizontal size={20} />}
                label="Divider"
                onClick={() => console.log("Redo")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<MdFormatIndentDecrease size={20} />}
                label="Undo"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<MdFormatIndentIncrease size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
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
  onClick?: () => void;
  disabled?: boolean;
}

function Tool({
  icon,
  label,
  onClick,
  disabled,
}: ToolOptionProps) {
    return(
            <Tooltip text={label} position="top">
              <button
                className={`relative flex items-center justify-center h-10 rounded-md transition-colors 
                  overflow-hidden gap-3 w-full disabled:opacity-55
                  
                  lg:text-white-base enabled:hover:bg-neutral-light enabled:hover:lg:text-secondary-base 
                  delay-60 duration-300 ml-2 text-secondary-dark 
                  p-2 
                  
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