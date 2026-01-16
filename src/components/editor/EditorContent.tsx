/**
 * EditorContent - Lexical-based chapter editor
 *
 * Replaced CodeMirror on 2026-01-02 to enable better support for:
 * - Tracked changes with inline accept/reject
 * - Split-pane merge view
 * - Custom change decorations
 *
 * Current features:
 * - Rich text editing with basic formatting
 * - Bold (Ctrl+B or **text**), Italic (Ctrl+I or *text*), Underline (Ctrl+U or __text__)
 * - Word count tracking
 * - Content sync with ChapterEditorContext
 *
 * Future: Will add custom nodes for InsertionNode, DeletionNode for merge UI
 */

"use client";

import dynamic from "next/dynamic";

// Lexical core
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin"

// Plugins
import { ContentSyncPlugin } from "./plugin/ContentSyncPlugin";
import {
  StrikethroughPlugin,
  STRIKTHROUGH_TRANSFORMER,
} from "./plugin/StrikethroughPlugin";

import { TRANSFORMERS } from "@lexical/markdown";

// Styles
import "./EditorContent.css";

/**
 * LexicalEditor - The actual Lexical editor component
 */
function LexicalEditor() {
  return (
    <div className="editor-container">
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="editor-content-editable" />
        }
        placeholder={
          <div className="editor-placeholder">
            Start writing your chapter...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />

      {/* Undo/Redo support */}
      <HistoryPlugin />

      {/* Markdown shortcuts: **bold**, *italic*, __underline__ */}
      <MarkdownShortcutPlugin
        transformers={[...TRANSFORMERS, STRIKTHROUGH_TRANSFORMER]}
      />

      {/* Sync content with ChapterEditorContext */}
      <ContentSyncPlugin />

      {/* Adds Strikethrough Command to EDitor */}
      <StrikethroughPlugin />

      {/* Adds Lists*/}
      <ListPlugin />

    </div>
  );
}

/**
 * Default export - Dynamically loads the Lexical editor only on client
 * This prevents SSR hydration mismatches since Lexical is a client-only library
 */
const EditorContent = dynamic(() => Promise.resolve(LexicalEditor), {
  ssr: false,
  loading: () => <div className="editor-loading" />,
});

export default EditorContent;
