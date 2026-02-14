import { useChapterEditor } from "@/context/ChapterEditorContext";
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
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { TextNode, ParagraphNode } from "lexical";
import { CaptionNode } from "./nodes/CaptionNode";

export default function ChapterEditor() {
  const { wordCount, saveContent } = useChapterEditor();

  // Desktop: Independent sidebar states (saved to localStorage)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

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
  // Load sidebar states from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line 
    setLeftSidebarOpen(
      getFromLocalStorage<boolean>("editor-left-sidebar", false),
    );

    setRightSidebarOpen(
      getFromLocalStorage<boolean>("editor-right-sidebar", false),
    );
  }, []);

  useEffect(() => {
    setToLocalStorage<boolean>("editor-left-sidebar", leftSidebarOpen);
  }, [leftSidebarOpen]);

  useEffect(() => {
    setToLocalStorage<boolean>("editor-right-sidebar", rightSidebarOpen);
  }, [rightSidebarOpen]);

  useEffect(() => {
    const handleKeyCombination = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        await saveContent();
        console.log("Combo Ctrl/Cmd + s detected - Save action triggered");
      }
    };

    window.addEventListener("keydown", handleKeyCombination);

    return () => window.removeEventListener("keydown", handleKeyCombination);
  }, [saveContent]);

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
      underlineStrikethrough: "editor-textUnderlineStrikethrough",
      code: "editor-text-code",
    },
    paragraph: "editor-paragraph",
    heading: {
      h1: "editor-heading-h1",
      h2: "editor-heading-h2",
      h3: "editor-heading-h3",
      h4: "editor-heading-h4",
      h5: "editor-heading-h5",
      h6: "editor-heading-h6",
    },
    caption: "editor-caption",
    list: {
      nested: {
        listitem: "editor-nested-listitem",
      },
      ol: "editor-ol",
      ul: "editor-ul",
      listitem: "editor-listitem",
    },
    quote: 'editor-quote',
    code: 'editor-code',
    codeHighlight: {
      atrule: 'editor-tokenAttr',
      attr: 'editor-tokenAttr',
      boolean: 'editor-tokenProperty',
      builtin: 'editor-tokenSelector',
      cdata: 'editor-tokenComment',
      char: 'editor-tokenSelector',
      class: 'editor-tokenFunction',
      'class-name': 'editor-tokenFunction',
      comment: 'editor-tokenComment',
      constant: 'editor-tokenProperty',
      deleted: 'editor-tokenProperty',
      doctype: 'editor-tokenComment',
      entity: 'editor-tokenOperator',
      function: 'editor-tokenFunction',
      important: 'editor-tokenVariable',
      inserted: 'editor-tokenSelector',
      keyword: 'editor-tokenAttr',
      namespace: 'editor-tokenVariable',
      number: 'editor-tokenProperty',
      operator: 'editor-tokenOperator',
      prolog: 'editor-tokenComment',
      property: 'editor-tokenProperty',
      punctuation: 'editor-tokenPunctuation',
      regex: 'editor-tokenVariable',
      selector: 'editor-tokenSelector',
      string: 'editor-tokenSelector',
      symbol: 'editor-tokenProperty',
      tag: 'editor-tokenProperty',
      url: 'editor-tokenOperator',
      variable: 'editor-tokenVariable',
    },
    image: 'editor-image',
    link: 'editor-link',
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
      CodeHighlightNode,
      HeadingNode,
      QuoteNode,
      TextNode,
      ParagraphNode,
      CaptionNode,
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

        <div className="flex flex-col flex-1 min-w-0 h-full">
          <div
            className="shrink-0 z-10 bg-white-base overflow-hidden transition-all duration-300"
            style={{
              maxHeight: showHeader ? "200px" : "0px",
            }}
          >
            <EditorHeader
              onToggleLeftSideBar={toggleMobileLeftSidebar}
              onToggleRightSideBar={toggleMobileRightSidebar}
              wordCount={wordCount}
            />
          </div>

          <div
            className="flex-1 overflow-y-auto"
            style={{ overflowAnchor: "none" }}
            onScroll={handleScroll}
          >
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
