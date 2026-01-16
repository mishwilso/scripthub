/**
 * Format Tool Component
 *
 * This component provides text formatting controls for the Lexical editor.
 * It handles text styling, colors, alignment, and various formatting options.
 *
 * ============================================================================
 * LEXICAL EDITOR INTEGRATION NOTES
 * ============================================================================
 *
 * 1. GETTING EDITOR CONTEXT:
 *    - Import: import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
 *    - Usage: const [editor] = useLexicalComposerContext();
 *    - This component needs to be a child of <LexicalComposer> to access the editor
 *
 * 2. APPLYING TEXT FORMATTING:
 *    - Bold/Italic/Underline/Strikethrough:
 *      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold' | 'italic' | 'underline' | 'strikethrough');
 *
 *    - Text Color:
 *      import { $patchStyleText } from "@lexical/selection";
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { color: '#FF0000' });
 *        }
 *      });
 *
 *    - Background/Highlight Color:
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { 'background-color': '#FFFF00' });
 *        }
 *      });
 *
 *    - Font Size:
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { 'font-size': '24px' });
 *        }
 *      });
 *
 *    - Font Family:
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { 'font-family': 'Arial, sans-serif' });
 *        }
 *      });
 *
 *    - Font Weight:
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { 'font-weight': '700' }); // 300=light, 400=regular, 500=medium, 600=semibold, 700=bold
 *        }
 *      });
 *
 * 3. HEADINGS (Block-level formatting):
 *    import { $setBlocksType } from "@lexical/selection";
 *    import { $createHeadingNode, HeadingNode } from "@lexical/rich-text";
 *
 *    // Register HeadingNode in editor config: nodes: [HeadingNode]
 *
 *    const formatHeading = (headingTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $setBlocksType(selection, () => $createHeadingNode(headingTag));
 *        }
 *      });
 *    };
 *
 *    // Convert back to paragraph:
 *    import { $createParagraphNode } from "lexical";
 *    editor.update(() => {
 *      const selection = $getSelection();
 *      if ($isRangeSelection(selection)) {
 *        $setBlocksType(selection, () => $createParagraphNode());
 *      }
 *    });
 *
 * 4. TEXT ALIGNMENT:
 *    import { FORMAT_ELEMENT_COMMAND } from "lexical";
 *    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left' | 'center' | 'right' | 'justify');
 *
 * 5. LISTS:
 *    import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
 *    import { ListNode, ListItemNode } from "@lexical/list";
 *
 *    // Register nodes: nodes: [ListNode, ListItemNode]
 *
 *    // Bulleted list:
 *    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
 *
 *    // Numbered list:
 *    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
 *
 *    // Remove list:
 *    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
 *
 * 6. INDENTATION:
 *    import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from "lexical";
 *    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
 *    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
 *
 * 7. QUOTES:
 *    import { $createQuoteNode, QuoteNode } from "@lexical/rich-text";
 *    import { $setBlocksType } from "@lexical/selection";
 *
 *    // Register node: nodes: [QuoteNode]
 *
 *    editor.update(() => {
 *      const selection = $getSelection();
 *      if ($isRangeSelection(selection)) {
 *        $setBlocksType(selection, () => $createQuoteNode());
 *      }
 *    });
 *
 * 8. CODE BLOCKS:
 *    import { $createCodeNode, CodeNode } from "@lexical/code";
 *    import { $setBlocksType } from "@lexical/selection";
 *
 *    // Register node: nodes: [CodeNode]
 *
 *    editor.update(() => {
 *      const selection = $getSelection();
 *      if ($isRangeSelection(selection)) {
 *        $setBlocksType(selection, () => $createCodeNode());
 *      }
 *    });
 *
 * 9. LINKS:
 *    import { TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
 *
 *    // Register node: nodes: [LinkNode]
 *
 *    // Add link:
 *    editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://example.com');
 *
 *    // Remove link:
 *    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
 *
 * 10. CLEAR FORMATTING:
 *     import { $getSelection, $isRangeSelection } from "lexical";
 *     import { $patchStyleText } from "@lexical/selection";
 *
 *     const clearFormatting = () => {
 *       editor.update(() => {
 *         const selection = $getSelection();
 *         if ($isRangeSelection(selection)) {
 *           // Clear inline styles
 *           $patchStyleText(selection, {
 *             'font-size': null,
 *             'font-family': null,
 *             'font-weight': null,
 *             'color': null,
 *             'background-color': null,
 *           });
 *           // Clear text formats
 *           selection.getTextContent(); // forces update
 *           if (selection.hasFormat('bold')) editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
 *           if (selection.hasFormat('italic')) editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
 *           if (selection.hasFormat('underline')) editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
 *           if (selection.hasFormat('strikethrough')) editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
 *         }
 *       });
 *     };
 *
 * 11. DETECTING CURRENT FORMAT (for active states):
 *     useEffect(() => {
 *       return editor.registerUpdateListener(({ editorState }) => {
 *         editorState.read(() => {
 *           const selection = $getSelection();
 *           if ($isRangeSelection(selection)) {
 *             // Check text formats
 *             setIsBold(selection.hasFormat('bold'));
 *             setIsItalic(selection.hasFormat('italic'));
 *             setIsUnderline(selection.hasFormat('underline'));
 *             setIsStrikethrough(selection.hasFormat('strikethrough'));
 *
 *             // Check inline styles (color, font-size, etc.)
 *             const style = selection.style;
 *             // Parse style string or use $getSelectionStyleValueForProperty
 *           }
 *         });
 *       });
 *     }, [editor]);
 *
 * 12. LINE SPACING / LETTER SPACING:
 *     editor.update(() => {
 *       const selection = $getSelection();
 *       if ($isRangeSelection(selection)) {
 *         $patchStyleText(selection, {
 *           'line-height': '1.5',      // Line height
 *           'letter-spacing': '0.05em', // Letter spacing
 *           'word-spacing': '0.1em',    // Word spacing
 *         });
 *       }
 *     });
 *
 *     // For paragraph spacing, you may need custom CSS or a custom node
 *
 * ============================================================================
 * REQUIRED IMPORTS FOR FULL IMPLEMENTATION
 * ============================================================================
 *
 * import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
 * import {
 *   $getSelection,
 *   $isRangeSelection,
 *   $createParagraphNode,
 *   FORMAT_TEXT_COMMAND,
 *   FORMAT_ELEMENT_COMMAND,
 *   INDENT_CONTENT_COMMAND,
 *   OUTDENT_CONTENT_COMMAND,
 * } from "lexical";
 * import { $patchStyleText, $setBlocksType } from "@lexical/selection";
 * import { $createHeadingNode } from "@lexical/rich-text";
 * import { $createQuoteNode } from "@lexical/rich-text";
 * import { $createCodeNode } from "@lexical/code";
 * import { TOGGLE_LINK_COMMAND } from "@lexical/link";
 * import {
 *   INSERT_ORDERED_LIST_COMMAND,
 *   INSERT_UNORDERED_LIST_COMMAND,
 *   REMOVE_LIST_COMMAND,
 * } from "@lexical/list";
 *
 * ============================================================================
 * IMPLEMENTATION TODOS
 * ============================================================================
 */

import { useState, useRef, useEffect, useMemo } from "react";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatIndentIncrease,
  MdFormatIndentDecrease,
  MdFormatQuote,
  MdCode,
  MdLink,
  MdImage,
  MdFormatClear,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
} from "react-icons/md";
import { TbTextColor, TbHighlight, TbLineHeight } from "react-icons/tb";

import { FiChevronLeft, FiChevronDown, FiCheck } from "react-icons/fi";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $createParagraphNode,
} from "lexical";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $createCaptionNode } from "../nodes/CaptionNode";

import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $getNearestNodeOfType } from "@lexical/utils";

type HeadingTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption";

export default function Format({ isOpen }: { isOpen: boolean }) {
  const [editor] = useLexicalComposerContext();

  const [textOpen, setTextOpen] = useState(true);
  const [stylingOpen, setStylingOpen] = useState(false);
  const [alignmentOpen, setAlignmentOpen] = useState(false);

  // Dropdown states for TEXT section
  const [headingOpen, setHeadingOpen] = useState(false);
  const [fontStyleOpen, setFontStyleOpen] = useState(false);
  const [fontWeightOpen, setFontWeightOpen] = useState(false);
  const [lineSpacingOpen, setLineSpacingOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);

  // Current selections
  // TODO: These should sync with the current selection in the editor
  // Use editor.registerUpdateListener to detect current format state
  const [selectedHeading, setSelectedHeading] = useState("Paragraph");
  const [selectedFontStyle, setSelectedFontStyle] = useState("Literata");
  const [selectedFontWeight, setSelectedFontWeight] = useState("Regular");
  const [fontSize, setFontSize] = useState(16);
  const [selectedTextColor, setSelectedTextColor] = useState("#78716C"); // Default to Black median shade
  const [selectedHighlightColor, setSelectedHighlightColor] =
    useState("#FFFFFF");

  // TODO: Add active states for formatting buttons (detect from selection)
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  // const [currentAlignment, setCurrentAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  //
  const headingStyleMap = useMemo(
    () =>
      new Map<HeadingTagType, string>([
        ["h1", "Heading 1"],
        ["h2", "Heading 2"],
        ["h3", "Heading 3"],
        ["h4", "Heading 4"],
        ["h5", "Heading 5"],
        ["h6", "Heading 6"],
      ]),
    []
  );

  const getButtonClass = (isActive: boolean) =>
    `flex items-center justify-center aspect-square border rounded-md transition-colors ${
      isActive
        ? "bg-primary-base/20 border-primary-base"
        : "border-neutral-dark/20 hover:bg-neutral-light/30 active:bg-neutral-dark/20"
    }`;

  // TODO: Register update listener to detect current format from selection
  // useEffect(() => {
  //   return editor.registerUpdateListener(({ editorState }) => {
  //     editorState.read(() => {
  //       const selection = $getSelection();
  //       if ($isRangeSelection(selection)) {
  //         // Detect text formats
  //         setIsBold(selection.hasFormat('bold'));
  //         setIsItalic(selection.hasFormat('italic'));
  //         setIsUnderline(selection.hasFormat('underline'));
  //         setIsStrikethrough(selection.hasFormat('strikethrough'));
  //
  //         // Detect inline styles (font-size, color, etc.)
  //         // Use $getSelectionStyleValueForProperty or parse selection.style
  //
  //         // Detect block type (heading, paragraph, etc.)
  //         // const anchorNode = selection.anchor.getNode();
  //         // Check parent node type
  //       }
  //     });
  //   });
  // }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();

          // Set Heading
          setSelectedHeading(
            $isHeadingNode(element)
              ? headingStyleMap.get(element.getTag()) ?? "None Found"
              : element.getType() === "caption"
              ? "Caption"
              : "Paragraph"
          );

          // Set text formats
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
          setIsStrikethrough(selection.hasFormat("strikethrough"));

          // Set list type
          const listNode = $getNearestNodeOfType(anchorNode, ListNode);
          if (listNode) {
            const listType = listNode.getListType();
            setIsUnorderedList(listType === "bullet");
            setIsOrderedList(listType === "number");
          } else {
            setIsUnorderedList(false);
            setIsOrderedList(false);
          }
        }
      });
    });
  }, [editor, headingStyleMap]);

  // Position state for color pickers
  const [textColorPickerPosition, setTextColorPickerPosition] = useState({
    top: 0,
    left: 0,
  });
  const [highlightColorPickerPosition, setHighlightColorPickerPosition] =
    useState({ top: 0, left: 0 });

  // Refs for color picker positioning and click outside detection
  const textColorButtonRef = useRef<HTMLButtonElement>(null);
  const highlightColorButtonRef = useRef<HTMLButtonElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const highlightColorPickerRef = useRef<HTMLDivElement>(null);

  // Close color pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close text color picker if clicking outside
      if (
        colorPickerOpen &&
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(target) &&
        textColorButtonRef.current &&
        !textColorButtonRef.current.contains(target)
      ) {
        setColorPickerOpen(false);
      }

      // Close highlight color picker if clicking outside
      if (
        highlightPickerOpen &&
        highlightColorPickerRef.current &&
        !highlightColorPickerRef.current.contains(target) &&
        highlightColorButtonRef.current &&
        !highlightColorButtonRef.current.contains(target)
      ) {
        setHighlightPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPickerOpen, highlightPickerOpen]);

  const applyHeading = (headingTag: HeadingTag) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (headingTag === "p") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else if (headingTag === "caption") {
          $setBlocksType(selection, () => $createCaptionNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(headingTag));
        }
      }
    });
  };

  const headingOptions: { label: string; value: HeadingTag; size: number }[] = [
    { label: "Paragraph", value: "p", size: 16 },
    { label: "Heading 1", value: "h1", size: 32 },
    { label: "Heading 2", value: "h2", size: 24 },
    { label: "Heading 3", value: "h3", size: 20 },
    { label: "Heading 4", value: "h4", size: 18 },
    { label: "Heading 5", value: "h5", size: 16 },
    { label: "Heading 6", value: "h6", size: 14 },
    { label: "Caption", value: "caption", size: 12 },
  ];

  // TODO: Implement font family change handler
  // const applyFontFamily = (fontFamily: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'font-family': fontFamily });
  //     }
  //   });
  // };

  const fontStyles = ["Literata", "Arial", "Times New Roman", "Courier New"];

  // TODO: Implement font weight change handler
  // const applyFontWeight = (weight: string) => {
  //   const weightMap: Record<string, string> = {
  //     'Light': '300',
  //     'Regular': '400',
  //     'Medium': '500',
  //     'Semi Bold': '600',
  //     'Bold': '700',
  //   };
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'font-weight': weightMap[weight] });
  //     }
  //   });
  // };

  const fontWeights = ["Light", "Regular", "Medium", "Semi Bold", "Bold"];

  // TODO: Implement font size change handler
  // const applyFontSize = (size: number) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'font-size': `${size}px` });
  //     }
  //   });
  // };

  // TODO: Implement text color change handler
  // const applyTextColor = (color: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { color: color });
  //     }
  //   });
  // };

  // TODO: Implement highlight/background color change handler
  // const applyHighlightColor = (color: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       // Use null to remove highlight
  //       $patchStyleText(selection, { 'background-color': color === '#FFFFFF' ? null : color });
  //     }
  //   });
  // };

  // TODO: Implement line spacing handlers
  // const applyLineHeight = (value: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'line-height': value });
  //     }
  //   });
  // };
  //
  // const applyLetterSpacing = (value: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'letter-spacing': value });
  //     }
  //   });
  // };
  //
  // const applyWordSpacing = (value: string) => {
  //   editor.update(() => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       $patchStyleText(selection, { 'word-spacing': value });
  //     }
  //   });
  // };

  const text_colors = [
    {
      name: "Purple",
      value: "#C084FC",
      shades: ["#7C3AED", "#A855F7", "#C084FC", "#D8B4FE", "#E9D5FF"],
    },
    {
      name: "Blue",
      value: "#60A5FA",
      shades: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
    },
    {
      name: "Cyan",
      value: "#22D3EE",
      shades: ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#A5F3FC"],
    },
    {
      name: "Green",
      value: "#34D399",
      shades: ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"],
    },
    {
      name: "Yellow",
      value: "#FACC15",
      shades: ["#CA8A04", "#EAB308", "#FACC15", "#FDE047", "#FEF08A"],
    },
    {
      name: "Orange",
      value: "#FB923C",
      shades: ["#EA580C", "#F97316", "#FB923C", "#FDBA74", "#FED7AA"],
    },
    {
      name: "Red",
      value: "#F87171",
      shades: ["#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"],
    },
    {
      name: "Pink",
      value: "#F472B6",
      shades: ["#DB2777", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8"],
    },
    {
      name: "Black",
      value: "#78716C",
      shades: ["#44403C", "#57534E", "#78716C", "#A8A29E", "#D6D3D1"],
    },
    {
      name: "White",
      value: "#E5E5E5",
      shades: ["#737373", "#A3A3A3", "#E5E5E5", "#F5F5F5", "#FAFAFA"],
    },
  ];

  const highlight_colors = [
    { name: "Purple", value: "#A855F7" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Orange", value: "#F97316" },
    { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" },
    { name: "Black", value: "#5e4c3b" },
    { name: "White", value: "#FFFFFF" },
  ];

  return (
    <div className="flex flex-col overflow-y-auto mb-20 relative">
      <h2 className="text-xl font-semibold py-5 px-4">Format</h2>

      {/* Text Color Picker Modal - Positioned absolutely */}
      {colorPickerOpen && (
        <div
          ref={textColorPickerRef}
          className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
          style={{
            top: `${textColorPickerPosition.top}px`,
            left: `${textColorPickerPosition.left}px`,
          }}
        >
          {/* Main colors */}
          <div className="grid grid-cols-5 gap-2">
            {text_colors.map((color) => {
              const isColorFamilySelected =
                color.shades.includes(selectedTextColor);
              return (
                <button
                  key={color.name}
                  onClick={() => {
                    console.log(`Text color selected:`, color.name);
                    setSelectedTextColor(color.value);
                  }}
                  className="relative w-6 h-6 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
                  style={{
                    padding: isColorFamilySelected ? "2px" : "0px",
                    border: isColorFamilySelected
                      ? `2px solid ${color.value}`
                      : "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                  title={color.name}
                >
                  <div
                    className="w-full h-full rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: color.value,
                      border: isColorFamilySelected
                        ? "none"
                        : "2px solid rgba(94, 76, 59, 0.2)",
                    }}
                  />
                  {isColorFamilySelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCheck size={12} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Shade variations - only show for selected color family */}
          {text_colors.find((c) => c.shades.includes(selectedTextColor)) && (
            <>
              <div className="w-full h-px bg-neutral-dark/20 my-3" />
              <div className="flex gap-2 justify-center">
                {text_colors
                  .find((c) => c.shades.includes(selectedTextColor))
                  ?.shades.map((shade, index) => {
                    const isSelected = selectedTextColor === shade;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          console.log(`Text shade selected:`, shade);
                          setSelectedTextColor(shade);
                        }}
                        className="relative w-6 h-12 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
                        style={{
                          padding: isSelected ? "2px" : "0px",
                          border: isSelected ? `2px solid ${shade}` : "none",
                        }}
                        title={`Shade ${index + 1}`}
                      >
                        <div
                          className="w-full h-full rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: shade,
                            border: isSelected
                              ? "none"
                              : "1px solid rgba(94, 76, 59, 0.15)",
                          }}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FiCheck size={10} color="white" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Highlight Color Picker Modal - Positioned absolutely */}
      {highlightPickerOpen && (
        <div
          ref={highlightColorPickerRef}
          className="fixed z-50 p-3 border-2 border-neutral-dark/20 rounded-lg bg-white-input shadow-lg animate-fade-in"
          style={{
            top: `${highlightColorPickerPosition.top}px`,
            left: `${highlightColorPickerPosition.left}px`,
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {highlight_colors.map((color) => {
              const isSelected = selectedHighlightColor === color.value;
              const isRemoveOption = color.name === "White";

              return (
                <button
                  key={color.name}
                  onClick={() => {
                    console.log(
                      isRemoveOption
                        ? "Highlight removed"
                        : `Highlight color selected: ${color.name}`
                    );
                    setSelectedHighlightColor(color.value);
                  }}
                  className="relative w-6 h-6 rounded-full hover:scale-110 transition-all duration-150 flex items-center justify-center"
                  style={{
                    padding: isSelected ? "2px" : "0px",
                    border: isSelected ? `2px solid ${color.value}` : "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                  title={isRemoveOption ? "Remove highlight" : color.name}
                >
                  <div
                    className="relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center"
                    style={{
                      backgroundColor: color.value,
                      border: isSelected
                        ? "none"
                        : "2px solid rgba(94, 76, 59, 0.2)",
                    }}
                  >
                    {isRemoveOption && (
                      <div
                        className="w-5 h-0.5 rotate-45"
                        style={{ backgroundColor: "#EF4444" }}
                      ></div>
                    )}
                  </div>
                  {isSelected && !isRemoveOption && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCheck size={12} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TEXT Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setTextOpen(!textOpen);
            console.log("TEXT section toggled:", !textOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>TEXT</span>
          <span className="text-lg">{textOpen ? "−" : "+"}</span>
        </button>
        {textOpen && (
          <div className="px-4 py-3 space-y-3 animate-fade-in">
            {/* Heading Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setHeadingOpen(!headingOpen);
                  console.log("Heading dropdown toggled:", !headingOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">P</span>
                  <span className="text-sm text-neutral-dark">
                    {selectedHeading} ({fontSize})
                  </span>
                </div>
                <FiChevronDown
                  className={`transition-transform ${
                    headingOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {headingOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {headingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedHeading(option.label);
                        setFontSize(option.size);
                        setHeadingOpen(false);
                        applyHeading(option.value);
                        console.log("Selected heading:", option.label);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {option.value.toUpperCase()}
                        </span>
                        <span className="text-sm text-neutral-dark">
                          {option.label} ({option.size})
                        </span>
                      </div>
                      {selectedHeading === option.label && (
                        <span className="text-primary-base">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Style Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFontStyleOpen(!fontStyleOpen);
                  console.log("Font style dropdown toggled:", !fontStyleOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">
                  {selectedFontStyle}
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    fontStyleOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {fontStyleOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontStyles.map((font) => (
                    <button
                      key={font}
                      onClick={() => {
                        setSelectedFontStyle(font);
                        setFontStyleOpen(false);
                        console.log("Selected font style:", font);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">{font}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Weight Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFontWeightOpen(!fontWeightOpen);
                  console.log("Font weight dropdown toggled:", !fontWeightOpen);
                }}
                className="w-full flex items-center justify-between px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors"
              >
                <span className="text-sm text-neutral-dark">
                  {selectedFontWeight}
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    fontWeightOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {fontWeightOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white-input border border-neutral-dark/20 rounded-md shadow-lg animate-fade-in">
                  {fontWeights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => {
                        setSelectedFontWeight(weight);
                        setFontWeightOpen(false);
                        console.log("Selected font weight:", weight);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-light/50 transition-colors border-b border-neutral-dark/10 last:border-b-0"
                    >
                      <span className="text-sm text-neutral-dark">
                        {weight}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setFontSize(Math.max(8, fontSize - 1));
                    console.log("Font size decreased to:", fontSize - 1);
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <span className="text-lg">−</span>
                </button>
                <div className="flex items-center justify-center px-3">
                  <span className="text-sm font-medium">{fontSize}</span>
                </div>
                <button
                  onClick={() => {
                    setFontSize(Math.min(72, fontSize + 1));
                    console.log("Font size increased to:", fontSize + 1);
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setLineSpacingOpen(!lineSpacingOpen);
                    console.log(
                      "Line spacing dropdown toggled:",
                      !lineSpacingOpen
                    );
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors border-r border-neutral-dark/20"
                >
                  <TbLineHeight size={18} />
                </button>
                <button
                  onClick={() => {
                    setLineSpacingOpen(!lineSpacingOpen);
                    console.log("Line spacing options toggled");
                  }}
                  className="flex items-center justify-center w-10 h-10 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                >
                  <FiChevronDown
                    className={`transition-transform ${
                      lineSpacingOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Line Spacing Options */}
            {lineSpacingOpen && (
              <div className="space-y-2 pl-2 border-l-2 border-neutral-dark/20 animate-fade-in">
                {[
                  "Letter Spacing",
                  "Line Height",
                  "Word Spacing",
                  "Paragraph Spacing",
                ].map((spacing) => (
                  <div key={spacing} className="flex items-center gap-2">
                    <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
                      <button
                        onClick={() => console.log(`${spacing} decreased`)}
                        className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                      >
                        <span className="text-sm">−</span>
                      </button>
                      <button
                        onClick={() => console.log(`${spacing} increased`)}
                        className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                    <span className="flex-1 text-xs text-neutral-dark">
                      {spacing}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Text Color and Highlight */}
            <div className="flex flex-row gap-2 relative">
              <button
                ref={textColorButtonRef}
                onClick={() => {
                  if (!colorPickerOpen && textColorButtonRef.current) {
                    const rect =
                      textColorButtonRef.current.getBoundingClientRect();
                    setTextColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setColorPickerOpen(!colorPickerOpen);
                  setHighlightPickerOpen(false);
                  console.log("Text color picker toggled:", !colorPickerOpen);
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbTextColor size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{ backgroundColor: selectedTextColor }}
                ></div>
              </button>

              <button
                ref={highlightColorButtonRef}
                onClick={() => {
                  if (!highlightPickerOpen && highlightColorButtonRef.current) {
                    const rect =
                      highlightColorButtonRef.current.getBoundingClientRect();
                    setHighlightColorPickerPosition({
                      top: rect.bottom + 4,
                      left: rect.left,
                    });
                  }
                  setHighlightPickerOpen(!highlightPickerOpen);
                  setColorPickerOpen(false);
                  console.log(
                    "Highlight color picker toggled:",
                    !highlightPickerOpen
                  );
                }}
                className="flex flex-col items-center justify-center px-3 py-2 border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors relative"
              >
                <TbHighlight size={20} />
                <div
                  className="w-6 h-1 rounded-full border-[1px] border-black"
                  style={{ backgroundColor: selectedHighlightColor }}
                ></div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STYLING Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setStylingOpen(!stylingOpen);
            console.log("STYLING section toggled:", !stylingOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>STYLING</span>
          <span className="text-lg">{stylingOpen ? "−" : "+"}</span>
        </button>
        {stylingOpen && (
          <div className="px-4 py-3 space-y-3 animate-fade-in">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() =>
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                }
                className={getButtonClass(isBold)}
              >
                <MdFormatBold size={20} />
              </button>
              <button
                onClick={() =>
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                }
                className={getButtonClass(isItalic)}
              >
                <MdFormatItalic size={20} />
              </button>
              <button
                onClick={() =>
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
                }
                className={getButtonClass(isStrikethrough)}
              >
                <MdFormatStrikethrough size={20} />
              </button>
              <button
                onClick={() =>
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                }
                className={getButtonClass(isUnderline)}
              >
                <MdFormatUnderlined size={20} />
              </button>
            </div>

            {/* Lists and Indents */}
            {/* TODO: Add list state detection - check if current block is in a list */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() =>
                  isUnorderedList
                    ? editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
                    : editor.dispatchCommand(
                        INSERT_UNORDERED_LIST_COMMAND,
                        undefined
                      )
                }
                className={getButtonClass(isUnorderedList)}
              >
                <MdFormatListBulleted size={20} />
              </button>
              <button
                onClick={
                  isOrderedList
                    ? () =>
                        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
                    : () =>
                        editor.dispatchCommand(
                          INSERT_ORDERED_LIST_COMMAND,
                          undefined
                        )
                }
                className={getButtonClass(isOrderedList)}
              >
                <MdFormatListNumbered size={20} />
              </button>
              <button
                onClick={() => console.log("Indent increase clicked")}
                // TODO: onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatIndentIncrease size={20} />
              </button>
              <button
                onClick={() => console.log("Indent decrease clicked")}
                // TODO: onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatIndentDecrease size={20} />
              </button>
            </div>

            {/* Quote, Code, Link, Image */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log("Quote clicked")}
                // TODO: onClick={() => {
                //   editor.update(() => {
                //     const selection = $getSelection();
                //     if ($isRangeSelection(selection)) {
                //       $setBlocksType(selection, () => $createQuoteNode());
                //     }
                //   });
                // }}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatQuote size={20} />
              </button>
              <button
                onClick={() => console.log("Code block clicked")}
                // TODO: onClick={() => {
                //   editor.update(() => {
                //     const selection = $getSelection();
                //     if ($isRangeSelection(selection)) {
                //       $setBlocksType(selection, () => $createCodeNode());
                //     }
                //   });
                // }}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdCode size={20} />
              </button>
              <button
                onClick={() => console.log("Link clicked")}
                // TODO: Open a modal/popover to enter URL, then:
                // editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
                // If already a link, use: editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdLink size={20} />
              </button>
              <button
                onClick={() => console.log("Clear formatting clicked")}
                // TODO: Implement clearFormatting() function (see notes at top of file)
                // Should clear: bold, italic, underline, strikethrough, color, background-color, font-size, font-family, font-weight
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatClear size={20} />
              </button>
            </div>

            {/* Image and Clear Formatting */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log("Image clicked")}
                // TODO: Open file picker or image URL modal
                // Then insert image node into editor
                // May need custom ImageNode - see Lexical ImageNode plugin
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdImage size={20} />
              </button>
              <button
                onClick={() => console.log("Clear formatting clicked")}
                // TODO: Same as above - implement clearFormatting()
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatClear size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ALIGNMENT Section */}
      <div className="border-b border-neutral-dark/10">
        <button
          onClick={() => {
            setAlignmentOpen(!alignmentOpen);
            console.log("ALIGNMENT section toggled:", !alignmentOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-dark hover:bg-neutral-light/50 transition-colors"
        >
          <span>ALIGNMENT</span>
          <span className="text-lg">{alignmentOpen ? "−" : "+"}</span>
        </button>
        {alignmentOpen && (
          <div className="px-4 py-3 animate-fade-in">
            {/* TODO: Add active state detection for current alignment */}
            {/* TODO: Use currentAlignment state to highlight active button */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => console.log("Align left clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
                // TODO: Add active class: ${currentAlignment === 'left' ? 'bg-primary-base/20 border-primary-base' : ''}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignLeft size={20} />
              </button>
              <button
                onClick={() => console.log("Align center clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignCenter size={20} />
              </button>
              <button
                onClick={() => console.log("Align right clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignRight size={20} />
              </button>
              <button
                onClick={() => console.log("Align justify clicked")}
                // TODO: onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
                className="flex items-center justify-center aspect-square border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
              >
                <MdFormatAlignJustify size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
