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

import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  TextFormatType,
} from "lexical";
import { useChapterEditor } from "@/context/ChapterEditorContext";

// Lexical core
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import {
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_EDITOR,
} from "lexical";

import { TRANSFORMERS, $convertFromMarkdownString } from "@lexical/markdown";

// Styles
import "./EditorContent.css";

/**
 * ContentSyncPlugin - Syncs content with ChapterEditorContext
 */
function ContentSyncPlugin() {
  const { content, updateContent, updateWordCount } = useChapterEditor();
  const [editor] = useLexicalComposerContext();

  // Handle content changes FROM the editor TO the context
  const handleChange = () => {
    editor.getEditorState().read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();

      // Count words (same logic as CodeMirror version)
      const wordCount = textContent
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      updateWordCount(wordCount);

      // Serialize the full editor state (includes formatting)
      const editorState = editor.getEditorState();
      const serializedState = JSON.stringify(editorState.toJSON());
      updateContent(serializedState);
    });
  };

  // Handle content changes FROM the context TO the editor (chapter switches)
  useEffect(() => {
    if (!content) return;

    try {
      // Try to parse as JSON (new format with formatting)
      const parsedState = JSON.parse(content);
      const editorState = editor.parseEditorState(parsedState);

      // Only update if the state is actually different
      const currentState = editor.getEditorState();
      if (JSON.stringify(currentState.toJSON()) !== content) {
        editor.setEditorState(editorState);
      }
    } catch {
      // If parsing fails, content is in old plain text format
      // Convert it to paragraphs for backward compatibility
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        const paragraphs = content.split("\n");
        paragraphs.forEach((paragraphText) => {
          const paragraph = $createParagraphNode();
          const textNode = $createTextNode(paragraphText);
          paragraph.append(textNode);
          root.append(paragraph);
        });
      });
    }
  }, [content, editor]);

  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />;
}

const STRIKTHROUGH_TRANSFORMER = {
  format: ["strikethrough"] as TextFormatType[],
  tag: "~~",
  type: "text-format" as const,
};

export function StrikethroughPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload: KeyboardEvent) => {
        const event = payload;

        if (
          event.key.toLowerCase() === "x" &&
          (event.metaKey || event.ctrlKey) &&
          event.shiftKey
        ) {
          event.preventDefault();
          console.log("Strikethrough Triggered");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          return true; // Indicates command was handled
        }

        return false; // Let other handlers process it
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}

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
