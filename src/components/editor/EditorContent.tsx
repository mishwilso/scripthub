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
 * - Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U)
 * - Word count tracking
 * - Content sync with ChapterEditorContext
 *
 * Future: Will add custom nodes for InsertionNode, DeletionNode for merge UI
 */

"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { $getRoot } from "lexical";
import { useChapterEditor } from "@/context/ChapterEditorContext";

// Lexical core
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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
      updateContent(textContent);
    });
  };

  // Handle content changes FROM the context TO the editor (chapter switches)
  useEffect(() => {
    const currentText = editor.getEditorState().read(() => {
      return $getRoot().getTextContent();
    });

    // Only update if content is different (avoid infinite loops)
    if (currentText !== content) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        // For now, just set plain text - we'll add formatting support later
        root.append(
          root.importJSON({
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: content,
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          })
        );
      });
    }
  }, [content, editor]);

  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />;
}

/**
 * LexicalEditor - The actual Lexical editor component
 */
function LexicalEditor() {
  const theme = {
    text: {
      bold: "editor-text-bold",
      italic: "editor-text-italic",
      underline: "editor-text-underline",
    },
    paragraph: "editor-paragraph",
  };

  const initialConfig = {
    namespace: "ScriptHubEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-content-editable"
              style={{
                fontSize: "16px",
                fontFamily: "Georgia, serif",
                lineHeight: "1.6",
                padding: "1.5rem",
                maxWidth: "800px",
                margin: "0 auto",
                minHeight: "100vh",
                caretColor: "#8b5a3c",
                outline: "none",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            />
          }
          placeholder={
            <div
              className="editor-placeholder"
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                maxWidth: "800px",
                margin: "0 auto",
                color: "#999",
                fontSize: "16px",
                fontFamily: "Georgia, serif",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              Start writing your chapter...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Undo/Redo support */}
        <HistoryPlugin />

        {/* Sync content with ChapterEditorContext */}
        <ContentSyncPlugin />
      </div>

      <style jsx global>{`
        .editor-container {
          flex: 1;
          min-height: 100vh;
          position: relative;
          z-index: 0;
        }

        .editor-content-editable {
          position: relative;
        }

        /* Format styling */
        .editor-text-bold {
          font-weight: bold;
        }

        .editor-text-italic {
          font-style: italic;
        }

        .editor-text-underline {
          text-decoration: underline;
        }

        .editor-paragraph {
          margin: 0;
        }
      `}</style>
    </LexicalComposer>
  );
}

/**
 * Default export - Dynamically loads the Lexical editor only on client
 * This prevents SSR hydration mismatches since Lexical is a client-only library
 */
const EditorContent = dynamic(() => Promise.resolve(LexicalEditor), {
  ssr: false,
  loading: () => (
    <div
      className="editor-container"
      style={{
        flex: 1,
        minHeight: "100vh",
        position: "relative",
        zIndex: 0,
      }}
    />
  ),
});

export default EditorContent;
