import {
  ChapterEditorProvider,
  useChapterEditor,
} from "@/context/ChapterEditorContext";
import EditorHeader from "./EditorHeader";
import BranchSidebar from "./BranchSidebar";
import ToolsSidebar from "./ToolsSidebar";
import ToolBar from "./ToolBar";

import EditorContent from "./EditorContent";

import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/lib/utils/localStorage";

import { useState, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { TextNode, ParagraphNode } from "lexical";
import { CaptionNode } from "./nodes/CaptionNode";

export default function ChapterEditor() {
  const { wordCount, updateWordCount, content, updateContent } =
    useChapterEditor();

  // Desktop: Independent sidebar states (saved to localStorage)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(
    getFromLocalStorage("editor-left-sidebar", false)
  );
  const [rightSidebarOpen, setRightSidebarOpen] = useState(
    getFromLocalStorage("editor-right-sidebar", false)
  );

  // Mobile: Which sidebar is open (only one at a time)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<
    "left" | "right" | null
  >(null);

  // Header visibility state for scroll behavior
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle functions for desktop
  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  // Toggle functions for mobile (from header)
  const toggleMobileLeftSidebar = () => {
    setMobileSidebarOpen(mobileSidebarOpen === "left" ? null : "left");
  };

  const toggleMobileRightSidebar = () => {
    setMobileSidebarOpen(mobileSidebarOpen === "right" ? null : "right");
  };

  useEffect(() => {
    setToLocalStorage("editor-left-sidebar", leftSidebarOpen);
  }, [leftSidebarOpen]);

  useEffect(() => {
    setToLocalStorage("editor-right-sidebar", rightSidebarOpen);
  }, [rightSidebarOpen]);

  useEffect(() => {
    const handleKeyCombination = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        console.log("Combo Ctrl/Cmd + K detected - Save action triggered");
      };
    };

    window.addEventListener("keydown", handleKeyCombination);

    return () => window.removeEventListener("keydown", handleKeyCombination);

  }, []);

  // Handle scroll to show/hide header
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;

    if (currentScrollY < 10) {
      // At the top, always show header
      setShowHeader(true);
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down, hide header
      setShowHeader(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up, show header
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  // Edicator Plugin
  const theme = {
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
      strikethrough: "editor-text-strikethrough",
      underlineStrikethrough: 'editor-textUnderlineStrikethrough',
    },
    paragraph: "editor-paragraph",
    heading: {
      h1: 'editor-heading-h1',
      h2: 'editor-heading-h2',
      h3: 'editor-heading-h3',
      h4: 'editor-heading-h4',
      h5: 'editor-heading-h5',
      h6: 'editor-heading-h6',
    },
    caption: "editor-caption",

  };

  const initialConfig = {
    namespace: "ScriptHubEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
    nodes: [
        LinkNode,
        AutoLinkNode,
        ListNode,
        ListItemNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        HorizontalRuleNode,
        CodeNode,
        HeadingNode,
        LinkNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        TextNode,
        ParagraphNode,
        CaptionNode
      ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
        <BranchSidebar
          isOpen={leftSidebarOpen}
          mobileOpen={mobileSidebarOpen === "left"}
          onToggle={toggleLeftSidebar}
          onClose={() => setMobileSidebarOpen(null)}
        />

        <div className="flex flex-col flex-1 min-w-0 h-full relative">
          <div
            className="top-0 left-0 right-0 transition-transform duration-300 z-10 bg-white-base"
            style={{
              transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
              position: showHeader ? 'relative' : 'absolute',
            }}
          >
            <EditorHeader
              onToggleLeftSideBar={toggleMobileLeftSidebar}
              onToggleRightSideBar={toggleMobileRightSidebar}
              wordCount={wordCount}
            />
          </div>

          <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
            <EditorContent />
          </div>

          <ToolBar />
        </div>

        <ToolsSidebar
          isOpen={rightSidebarOpen}
          mobileOpen={mobileSidebarOpen === "right"}
          onToggle={toggleRightSidebar}
          onClose={() => setMobileSidebarOpen(null)}
        />
      </div>
    </LexicalComposer>
  );
}
