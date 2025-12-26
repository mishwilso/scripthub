import {
  ChapterEditorProvider,
  useChapterEditor,
} from "@/context/ChapterEditorContext";
import EditorHeader from "./EditorHeader";
import BranchSidebar from "./BranchSidebar";
import ToolsSidebar from "./ToolsSidebar";

import { getFromLocalStorage, setToLocalStorage } from '@/lib/utils/localStorage'

import {useState, useEffect} from 'react'

export default function ChapterEditor() {
  const { chapter } = useChapterEditor();

  // Desktop: Independent sidebar states (saved to localStorage)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(getFromLocalStorage('editor-left-sidebar', true))
  const [rightSidebarOpen, setRightSidebarOpen] = useState(getFromLocalStorage('editor-right-sidebar', false))
  
  // Mobile: Which sidebar is open (only one at a time)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<'left' | 'right' | null>(null)
  
  // Toggle functions for desktop
  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen)
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen)
  


  // Toggle functions for mobile (from header)
  const toggleMobileLeftSidebar = () => {
    setMobileSidebarOpen(mobileSidebarOpen === 'left' ? null : 'left')
  }
  
  const toggleMobileRightSidebar = () => {
    setMobileSidebarOpen(mobileSidebarOpen === 'right' ? null : 'right')
  }

  useEffect(() => {
      setToLocalStorage('editor-left-sidebar', leftSidebarOpen)
    }, [leftSidebarOpen])

  useEffect(() => {
      setToLocalStorage('editor-right-sidebar', rightSidebarOpen)
    }, [rightSidebarOpen])
  


  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      <BranchSidebar
        isOpen={leftSidebarOpen}
        mobileOpen={mobileSidebarOpen === 'left'}
        onToggle={toggleLeftSidebar}
        onClose={() => setMobileSidebarOpen(null)}
      />

      <div className="flex-1 min-w-0">
        <EditorHeader
          onToggleLeftSideBar={toggleMobileLeftSidebar}
          onToggleRightSideBar={toggleMobileRightSidebar}
        />
      </div>

      <ToolsSidebar
        isOpen={rightSidebarOpen}
        mobileOpen={mobileSidebarOpen === 'right'}
        onToggle={toggleRightSidebar}
        onClose={() => setMobileSidebarOpen(null)}
      />
    </div>
  );
}
