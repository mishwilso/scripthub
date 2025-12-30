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


import Tooltip from "../ui/Tooltip";



export default function ToolBar() {


    return (
        <div className="overflow-scroll-gradient">
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="z-20 lg:fixed h-fit lg:bottom-0 lg:left-0 lg:right-0 lg:bg-secondary-base lg:rounded-2xl lg:mb-10 py-1 px-2 flex items-start lg:items-center justify-center divide-x-2 divide-white-base lg:w-fit mx-auto border-b border-neutral-dark/10 lg:border-b-0 w-max lg:shadow-[0_0_25px_rgba(0,0,0,0.25)]"> 
        
            <div className="flex items-start">
                <Tool
                icon={<TbArrowBackUp size={20} />}
                label="Undo"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<TbArrowForwardUp size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<BsFonts size={20} />}
                label="Undo"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<MdOutlineEdit size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<MdFormatBold size={20} />}
                label="Undo"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<MdFormatItalic size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<MdStrikethroughS size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<MdFormatUnderlined size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />
            </div>

            <div className="flex mx-2">
                <Tool
                icon={<AiOutlineLink size={20} />}
                label="Undo"
                onClick={() => console.log("Undo")}
                />

                <Tool
                icon={<FiImage size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<MdFormatQuote size={20} />}
                label="Redo"
                onClick={() => console.log("Redo")}
                />

                <Tool
                icon={<RxDividerHorizontal size={20} />}
                label="Redo"
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
}

function Tool({
  icon,
  label,
  onClick,
}: ToolOptionProps) {
    return(
            <Tooltip text={label} position="top">
              <button
                className={`relative flex items-center justify-between h-10 rounded-md transition-colors overflow-hidden gap-3 w-full`}
                aria-label={label}
                onClick={onClick}
              >
                <div className="flex items-center gap-3">
                  {/* Icon - stays in fixed position */}
                  <span className="lg:text-white-base hover:bg-neutral-light hover:lg:text-secondary-base transition-colors delay-60 duration-300 ml-2 text-secondary-dark flex items-center justify-center p-2 shrink-0 rounded-lg" aria-label={label}>
                    {icon}
                  </span>
        
                </div>
              </button>
            </Tooltip>
    )
}