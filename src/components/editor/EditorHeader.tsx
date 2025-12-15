'use client'
// TODO:
// Chapter Name
// Word Count
// Fun Stuff
// Mobile sidebar toggles
// Branch name
// Commit Button
// Merge Button



import IconButton from "@/components/ui/IconButton"
import { FaCodeBranch } from "react-icons/fa6";

interface EditorHeaderProps {
    onToggleLeftSideBar: () => void
    onToggleRightSideBar: () => void
}

export default function EditorHeader({
    onToggleLeftSideBar,
    onToggleRightSideBar
}: EditorHeaderProps ){
    return (
        <header>
            <div>
                {/* Mobile only left side bar toggle */}
                <IconButton 
                onClick={onToggleLeftSideBar} 
                altText="Toggle Branch Tools"
                className="lg:hidden">
                    <FaCodeBranch size={24} />
                </IconButton>

                {/* Chapter title */}
                <h1 className="font-medium text-lg">
                    
                </h1>


            </div>
        </header>
    )
}