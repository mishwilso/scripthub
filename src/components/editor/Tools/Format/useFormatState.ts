// useFormatState.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import { LexicalEditor } from "lexical";
import { $getSelection, $isRangeSelection } from "lexical";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import { $isHeadingNode, $createHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType } from "@lexical/utils";
import { ListNode } from "@lexical/list";
import { $createParagraphNode } from "lexical";
import { $createCaptionNode } from "../../nodes/CaptionNode";
import {
  headingOptions,
  fontStyleOptions,
  fontWeightOptions,
} from "./constants";
import type { HeadingTag } from "./constants";

export function useFormatState(editor: LexicalEditor) {
  // ==========================================================================
  // STATE - Current Selection Values
  // ==========================================================================
  const [selectedHeading, setSelectedHeading] = useState("Paragraph");
  const [selectedFontStyle, setSelectedFontStyle] = useState("Georgia");
  const [selectedFontWeight, setSelectedFontWeight] = useState("Regular");
  const [fontSize, setFontSize] = useState(16);
  const [selectedTextColor, setSelectedTextColor] = useState("#78716C");
  const [selectedHighlightColor, setSelectedHighlightColor] =
    useState("#FFFFFF");

  // ==========================================================================
  // STATE - Text Format Toggles
  // ==========================================================================
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [currentAlignment, setCurrentAlignment] = useState<
    "left" | "center" | "right" | "justify"
  >("left");
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  // ==========================================================================
  // STATE - Spacing Values
  // ==========================================================================
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [wordSpacing, setWordSpacing] = useState(0);

  // ==========================================================================
  // HELPER
  // ==========================================================================
  const getWeightLabel = useCallback((weight: number): string => {
    return (
      fontWeightOptions.find((opt) => opt.value === weight)?.label ?? "Regular"
    );
  }, []);

  // ==========================================================================
  // EDITOR UPDATE LISTENER - Syncs UI state with editor selection
  // ==========================================================================
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        // Heading
        if ($isHeadingNode(element)) {
          const tag = element.getTag();
          setSelectedHeading(
            headingOptions.find((opt) => opt.value === tag)?.label ??
              "Paragraph",
          );
        } else if (element?.getType() === "caption") {
          setSelectedHeading("Caption");
        } else {
          setSelectedHeading("Paragraph");
        }

        // Font style
        const fontStyle = $getSelectionStyleValueForProperty(
          selection,
          "font-family",
          "",
        );
        setSelectedFontStyle(
          fontStyleOptions.find((opt) => opt.value === fontStyle)?.label ??
            "Georgia",
        );

        // Text formats
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));
        setIsStrikethrough(selection.hasFormat("strikethrough"));

        // Lists
        const listNode = $getNearestNodeOfType(anchorNode, ListNode);
        if (listNode) {
          const listType = listNode.getListType();
          setIsUnorderedList(listType === "bullet");
          setIsOrderedList(listType === "number");
        } else {
          setIsUnorderedList(false);
          setIsOrderedList(false);
        }

        // Font size (inline or from block)
        const inlineFont = $getSelectionStyleValueForProperty(
          selection,
          "font-size",
          "",
        );
        if (inlineFont) {
          setFontSize(parseInt(inlineFont));
        } else {
          const parent = selection.anchor.getNode().getParent();
          if ($isHeadingNode(parent)) {
            setFontSize(
              headingOptions.find((opt) => opt.value === parent.getTag())
                ?.size ?? 16,
            );
          } else if (parent?.getType() === "caption") {
            setFontSize(12);
          } else {
            setFontSize(16);
          }
        }

        // Font weight
        const inlineWeight = $getSelectionStyleValueForProperty(
          selection,
          "font-weight",
          "",
        );
        if (inlineWeight) {
          setSelectedFontWeight(getWeightLabel(parseInt(inlineWeight)));
        } else {
          const parent = selection.anchor.getNode().getParent();
          let blockType = "p";
          if ($isHeadingNode(parent)) blockType = parent.getTag();
          else if (parent?.getType() === "caption") blockType = "caption";
          setSelectedFontWeight(
            getWeightLabel(
              headingOptions.find((opt) => opt.value === blockType)?.weight ??
                400,
            ),
          );
        }

        // Spacing
        const ls = $getSelectionStyleValueForProperty(
          selection,
          "letter-spacing",
          "",
        );
        setLetterSpacing(ls ? parseFloat(ls) : 0);
        const lh = $getSelectionStyleValueForProperty(
          selection,
          "line-height",
          "",
        );
        setLineHeight(lh ? parseFloat(lh) : 1.5);
        const ws = $getSelectionStyleValueForProperty(
          selection,
          "word-spacing",
          "",
        );
        setWordSpacing(ws ? parseFloat(ws) : 0);

        // Colors
        setSelectedTextColor(
          $getSelectionStyleValueForProperty(selection, "color", "#78716C"),
        );
        setSelectedHighlightColor(
          $getSelectionStyleValueForProperty(
            selection,
            "background-color",
            "#FFFFFF",
          ),
        );
      });
    });
  }, [editor, getWeightLabel]);

  // ==========================================================================
  // APPLY HANDLERS
  // ==========================================================================
  const applyHeading = useCallback(
    (tag: HeadingTag) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        $patchStyleText(selection, { "font-size": "", "font-weight": "" });
        if (tag === "p")
          $setBlocksType(selection, () => $createParagraphNode());
        else if (tag === "caption")
          $setBlocksType(selection, () => $createCaptionNode());
        else $setBlocksType(selection, () => $createHeadingNode(tag));
      });
    },
    [editor],
  );

  const applyFontStyle = useCallback(
    (font: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "font-family": font });
      });
    },
    [editor],
  );

  const applyFontWeight = useCallback(
    (weight: string) => {
      const map: Record<string, string> = {
        Light: "300",
        Regular: "400",
        Medium: "500",
        "Semi Bold": "600",
        Bold: "700",
      };
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "font-weight": map[weight] });
      });
    },
    [editor],
  );

  const applyFontSize = useCallback(
    (size: number) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "font-size": `${size}px` });
      });
    },
    [editor],
  );

  const applyTextColor = useCallback(
    (color: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) $patchStyleText(selection, { color });
      });
    },
    [editor],
  );

  const applyHighlightColor = useCallback(
    (color: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            "background-color": color === "#FFFFFF" ? "" : color,
          });
        }
      });
    },
    [editor],
  );

  const applyLetterSpacing = useCallback(
    (val: number) => {
      setLetterSpacing(val);
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "letter-spacing": `${val}em` });
      });
    },
    [editor],
  );

  const applyLineHeight = useCallback(
    (val: number) => {
      setLineHeight(val);
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "line-height": val.toString() });
      });
    },
    [editor],
  );

  const applyWordSpacing = useCallback(
    (val: number) => {
      setWordSpacing(val);
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection))
          $patchStyleText(selection, { "word-spacing": `${val}em` });
      });
    },
    [editor],
  );

  // ==========================================================================
  // RETURN
  // ==========================================================================
  return {
    // Text section
    text: {
      selectedHeading,
      selectedFontStyle,
      selectedFontWeight,
      fontSize,
      selectedTextColor,
      selectedHighlightColor,
      letterSpacing,
      lineHeight,
      wordSpacing,
      applyHeading,
      applyFontStyle,
      applyFontWeight,
      applyFontSize,
      applyTextColor,
      applyHighlightColor,
      applyLetterSpacing,
      applyLineHeight,
      applyWordSpacing,
    },
    // Styling section
    styling: {
      isBold,
      isItalic,
      isUnderline,
      isStrikethrough,
      isUnorderedList,
      isOrderedList,
    },
    // Alignment section
    alignment: {
      currentAlignment,
    },
  };
}
