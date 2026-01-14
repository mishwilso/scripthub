import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextFormatType, COMMAND_PRIORITY_EDITOR, KEY_MODIFIER_COMMAND, FORMAT_TEXT_COMMAND } from "lexical";

export const STRIKTHROUGH_TRANSFORMER = {
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