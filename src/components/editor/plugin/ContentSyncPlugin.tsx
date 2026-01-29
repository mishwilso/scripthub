// bridge lexical editor with chapter editor context
// Direction A: User types in editor → update React context
// Direction B: User switches draft/chapter → update editor content

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapterEditor } from "@/context/ChapterEditorContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { useEffect, useRef } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export function ContentSyncPlugin() {
  const { content, updateContent, updateWordCount } = useChapterEditor();
  const [editor] = useLexicalComposerContext();
  const isExternalUpdate = useRef(false);
  // Handle content changes FROM the editor TO the chapter editor context
  const handleChange = () => {
    // skip if the change came from context to editor
    if (isExternalUpdate.current) return;

    editor.getEditorState().read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();

      // Count words
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

  // Handle content changes FROM the chapter context TO the editor (chapter switches)
  useEffect(() => {
    if (!content) {
      isExternalUpdate.current = true;
      editor.update(
        () => {
          const root = $getRoot();
          root.clear();
          root.append($createParagraphNode());
        },
        { discrete: true },
      );
      // Reset after microtask - editor.setEditorSate calls flushSync 
      // defering out of React's commit phase
      queueMicrotask(() => {
        isExternalUpdate.current = false;
      });
      return;
    }

    try {
      const parsedState = JSON.parse(content);
      const editorState = editor.parseEditorState(parsedState);

      const currentState = editor.getEditorState();
      if (JSON.stringify(currentState.toJSON()) !== content) {
        isExternalUpdate.current = true;
        // queueMicrotask defers setEditorState out of React's commit phase
        queueMicrotask(() => {
          editor.setEditorState(editorState);
          isExternalUpdate.current = false;
        });
      }
    } catch {
      // JSON parse failed — content is old plain text format, convert to paragraphs
      isExternalUpdate.current = true;
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        content.split("\n").forEach((text) => {
          const p = $createParagraphNode();
          p.append($createTextNode(text));
          root.append(p);
        });
      });
      queueMicrotask(() => {
        isExternalUpdate.current = false;
      });
    }
  }, [content, editor]);


  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />;
}
