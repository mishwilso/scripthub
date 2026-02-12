import TextSection from "./TextSection";
import StylingSection from "./StylingSection";
import AlignmentSection from "./AlignmentSection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useFormatState } from "./useFormatState";
import { useState } from "react";

export default function Format({ isOpen }: { isOpen: boolean }) {
  const [editor] = useLexicalComposerContext();
  const format = useFormatState(editor);

  // ==========================================================================
// STATE - Section Toggles
// ==========================================================================
const [textOpen, setTextOpen] = useState(true);
const [stylingOpen, setStylingOpen] = useState(false);
const [alignmentOpen, setAlignmentOpen] = useState(false);
  
  return (
    <div>
      <TextSection format={format} editor={editor} isOpen={textOpen} onToggle={setTextOpen} />
      <StylingSection format={format} editor={editor} isOpen={stylingOpen} onToggle={setStylingOpen} />
      <AlignmentSection format={format} editor={editor} isOpen={alignmentOpen} onToggle={setAlignmentOpen} />
    </div>
  );
}