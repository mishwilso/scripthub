import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChapterEditor } from "@/context/ChapterEditorContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export function ContentSyncPlugin() {
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