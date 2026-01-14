/**
 * ToolBar Component
 *
 * This is the main floating toolbar for the Lexical editor providing quick access
 * to common formatting operations. It appears at the bottom of the editor.
 *
 * ============================================================================
 * LEXICAL EDITOR INTEGRATION NOTES
 * ============================================================================
 *
 * CURRENT IMPLEMENTATION:
 * - Undo/Redo: ✅ Working via UNDO_COMMAND, REDO_COMMAND
 * - Bold/Italic/Underline/Strikethrough: ✅ Working via FORMAT_TEXT_COMMAND
 * - Active state detection: ✅ Working via registerUpdateListener + selection.hasFormat()
 *
 * TODO IMPLEMENTATIONS NEEDED:
 *
 * 1. TEXT COLOR:
 *    import { $patchStyleText } from "@lexical/selection";
 *
 *    const applyTextColor = (color: string) => {
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { color: color });
 *        }
 *      });
 *    };
 *
 *    // To detect current text color from selection:
 *    // Parse selection.style string or use $getSelectionStyleValueForProperty
 *
 * 2. HIGHLIGHT COLOR:
 *    const applyHighlightColor = (color: string) => {
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $patchStyleText(selection, { 'background-color': color });
 *        }
 *      });
 *    };
 *
 * 3. LINKS:
 *    import { TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
 *
 *    // Register LinkNode in editor config: nodes: [LinkNode]
 *
 *    const insertLink = (url: string) => {
 *      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
 *    };
 *
 *    const removeLink = () => {
 *      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
 *    };
 *
 *    // To detect if selection is a link:
 *    // Check if anchor node's parent is a LinkNode
 *
 * 4. IMAGES:
 *    // Lexical doesn't have built-in image support
 *    // Need to create custom ImageNode plugin
 *    // See: https://lexical.dev/docs/concepts/nodes#creating-custom-nodes
 *
 *    // Basic approach:
 *    // 1. Create ImageNode extending DecoratorNode
 *    // 2. Register INSERT_IMAGE_COMMAND
 *    // 3. On click, open file picker or URL modal
 *    // 4. Dispatch command with image data
 *
 * 5. QUOTES:
 *    import { $createQuoteNode, QuoteNode } from "@lexical/rich-text";
 *    import { $setBlocksType } from "@lexical/selection";
 *
 *    const insertQuote = () => {
 *      editor.update(() => {
 *        const selection = $getSelection();
 *        if ($isRangeSelection(selection)) {
 *          $setBlocksType(selection, () => $createQuoteNode());
 *        }
 *      });
 *    };
 *
 * 6. HORIZONTAL DIVIDER:
 *    import { $createHorizontalRuleNode, HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
 *    import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
 *
 *    // Register: nodes: [HorizontalRuleNode]
 *
 *    const insertDivider = () => {
 *      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
 *    };
 *
 * 7. INDENTATION:
 *    import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from "lexical";
 *
 *    const increaseIndent = () => {
 *      editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
 *    };
 *
 *    const decreaseIndent = () => {
 *      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
 *    };
 *
 * 8. COLOR PICKER POPOVER:
 *    - Need to implement a color picker popover component
 *    - Should appear when clicking Text Color or Highlight Color buttons
 *    - Use same color palette as Format.tsx
 *    - Position popover above the toolbar (since toolbar is at bottom)
 *    - Close on click outside or color selection
 *
 * ============================================================================
 * ACTIVE STATE DETECTION
 * ============================================================================
 *
 * Current: Detecting bold, italic, underline, strikethrough ✅
 *
 * TODO: Add detection for:
 * - Current text color (parse selection.style or use $getSelectionStyleValueForProperty)
 * - Current highlight color
 * - Whether selection is a link
 * - Whether selection is in a quote block
 * - Current indentation level
 *
 * Example for detecting inline styles:
 *
 * import { $getSelectionStyleValueForProperty } from "@lexical/selection";
 *
 * editorState.read(() => {
 *   const selection = $getSelection();
 *   if ($isRangeSelection(selection)) {
 *     const textColor = $getSelectionStyleValueForProperty(selection, 'color', '#000000');
 *     const bgColor = $getSelectionStyleValueForProperty(selection, 'background-color', 'transparent');
 *     setCurrentTextColor(textColor);
 *     setCurrentHighlightColor(bgColor);
 *   }
 * });
 *
 * ============================================================================
 * KEYBOARD SHORTCUTS
 * ============================================================================
 *
 * Built-in Lexical shortcuts:
 * - Ctrl+B: Bold ✅
 * - Ctrl+I: Italic ✅
 * - Ctrl+U: Underline ✅
 * - Ctrl+Z: Undo ✅
 * - Ctrl+Shift+Z / Ctrl+Y: Redo ✅
 *
 * TODO: Register custom shortcuts:
 * - Ctrl+Shift+X: Strikethrough (currently commented out)
 * - Ctrl+K: Insert link
 * - Ctrl+Shift+7: Numbered list
 * - Ctrl+Shift+8: Bulleted list
 *
 * Example custom shortcut registration:
 *
 * editor.registerCommand(
 *   KEY_DOWN_COMMAND,
 *   (event: KeyboardEvent) => {
 *     if (event.ctrlKey && event.shiftKey && event.key === 'x') {
 *       event.preventDefault();
 *       editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
 *       return true;
 *     }
 *     return false;
 *   },
 *   COMMAND_PRIORITY_EDITOR
 * );
 *
 * ============================================================================
 * REQUIRED IMPORTS FOR FULL IMPLEMENTATION
 * ============================================================================
 *
 * // Already imported:
 * import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
 * import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
 * import { $patchStyleText } from "@lexical/selection";
 *
 * // TODO: Add these imports:
 * import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from "lexical";
 * import { TOGGLE_LINK_COMMAND } from "@lexical/link";
 * import { $setBlocksType, $getSelectionStyleValueForProperty } from "@lexical/selection";
 * import { $createQuoteNode } from "@lexical/rich-text";
 * import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
 *
 * ============================================================================
 */

import { TbArrowBackUp } from "react-icons/tb";
import { TbArrowForwardUp } from "react-icons/tb";

import { BsFonts } from "react-icons/bs";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CAN_REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_EDITOR} from "lexical";

// TODO: Add these imports for full implementation
// import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from "lexical";
// import { TOGGLE_LINK_COMMAND } from "@lexical/link";
// import { $setBlocksType, $getSelectionStyleValueForProperty } from "@lexical/selection";
// import { $createQuoteNode } from "@lexical/rich-text";
// import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

import { $patchStyleText } from "@lexical/selection";

import Tooltip from "../ui/Tooltip";
import { useEffect, useState } from "react";


import {
  MdOutlineEdit,
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
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
  MdTitle,
  MdHorizontalRule
} from "react-icons/md";


export default function ToolBar() {

    // Button States
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    // Format States (currently working ✅)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isStrikethrough, setIsStrikethrough] = useState(false)
    const [isUnderlined, setIsUnderlined] = useState(false)

    // TODO: Add color picker popover states
    // const [textColorPickerOpen, setTextColorPickerOpen] = useState(false);
    // const [highlightColorPickerOpen, setHighlightColorPickerOpen] = useState(false);

    // TODO: Add current color states (detected from selection)
    // const [currentTextColor, setCurrentTextColor] = useState('#78716C');
    // const [currentHighlightColor, setCurrentHighlightColor] = useState('#FFFFFF');

    // TODO: Add link state
    // const [isLink, setIsLink] = useState(false);
    // const [linkUrl, setLinkUrl] = useState('');
    // const [linkModalOpen, setLinkModalOpen] = useState(false);

    // TODO: Add quote state
    // const [isQuote, setIsQuote] = useState(false);

    const [editor] = useLexicalComposerContext();

    // TODO: Implement text color handler
    // const applyTextColor = (color: string) => {
    //   editor.update(() => {
    //     const selection = $getSelection();
    //     if ($isRangeSelection(selection)) {
    //       $patchStyleText(selection, { color: color });
    //     }
    //   });
    //   setTextColorPickerOpen(false);
    // };

    // TODO: Implement highlight color handler
    // const applyHighlightColor = (color: string) => {
    //   editor.update(() => {
    //     const selection = $getSelection();
    //     if ($isRangeSelection(selection)) {
    //       $patchStyleText(selection, { 'background-color': color === '#FFFFFF' ? null : color });
    //     }
    //   });
    //   setHighlightColorPickerOpen(false);
    // };

    // TODO: Implement link handlers
    // const insertLink = () => {
    //   if (linkUrl) {
    //     editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
    //     setLinkModalOpen(false);
    //     setLinkUrl('');
    //   }
    // };
    //
    // const removeLink = () => {
    //   editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    // };

    // TODO: Implement quote handler
    // const insertQuote = () => {
    //   editor.update(() => {
    //     const selection = $getSelection();
    //     if ($isRangeSelection(selection)) {
    //       $setBlocksType(selection, () => $createQuoteNode());
    //     }
    //   });
    // };

    // TODO: Implement divider handler
    // const insertDivider = () => {
    //   editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
    // };

    // TODO: Implement indent handlers
    // const increaseIndent = () => {
    //   editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
    // };
    //
    // const decreaseIndent = () => {
    //   editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
    // };

    // Example function showing how $patchStyleText works (for reference)
    const setYellow = () => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            color: "yellow"
          });
        }
      });
    }

    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (
    //     event.key === 'x' && 
    //     (event.metaKey || event.ctrlKey) && 
    //     event.shiftKey
    //   ) {

    //     event.preventDefault;
    //     event.stopPropagation;

    //     editor.update(() => {
    //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
    //     })
        
    //   }

    //     return true;
    // }

    useEffect(() => {

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )

      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )

    }, [editor])

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            // Check if the selection has the 'bold' format ✅
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderlined(selection.hasFormat('underline'))
            setIsStrikethrough(selection.hasFormat('strikethrough'))

            // TODO: Detect current text color and highlight color
            // import { $getSelectionStyleValueForProperty } from "@lexical/selection";
            // const textColor = $getSelectionStyleValueForProperty(selection, 'color', '#78716C');
            // const bgColor = $getSelectionStyleValueForProperty(selection, 'background-color', '#FFFFFF');
            // setCurrentTextColor(textColor);
            // setCurrentHighlightColor(bgColor);

            // TODO: Detect if selection is inside a link
            // const node = selection.anchor.getNode();
            // const parent = node.getParent();
            // import { $isLinkNode } from "@lexical/link";
            // setIsLink($isLinkNode(parent));

            // TODO: Detect if selection is inside a quote block
            // const anchorNode = selection.anchor.getNode();
            // const element = anchorNode.getKey() === 'root'
            //   ? anchorNode
            //   : anchorNode.getTopLevelElementOrThrow();
            // import { $isQuoteNode } from "@lexical/rich-text";
            // setIsQuote($isQuoteNode(element));
          }
        });
      });
    }, [editor]);

    // Detection: selection.hasFormat('strikethrough')




    return (
        <div className="overflow-scroll-gradient">
        <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="z-0 lg:fixed h-fit lg:bottom-0 lg:left-0 lg:right-0 lg:bg-secondary-base lg:rounded-2xl lg:mb-10 py-1 px-2 flex items-start lg:items-center justify-center divide-x-2 divide-secondary-dark lg:divide-white-base lg:w-fit mx-auto border-b border-neutral-dark/10 lg:border-b-0 w-max lg:shadow-[0_0_25px_rgba(0,0,0,0.25)]"> 
        
            <div className="flex items-start mr-2 gap-1">
                <Tool
                icon={<TbArrowBackUp size={20} />}
                label="Undo"
                tooltip={<p>Undo    <span className="tooltip">Ctrl</span> <span className="tooltip">Z</span></p>}
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                disabled={!canUndo}
                />

                <Tool
                icon={<TbArrowForwardUp size={20} />}
                label="Redo"
                tooltip={<p>Redo    <span className="tooltip">Shift</span> <span className="tooltip">Ctrl</span> <span className="tooltip">Z</span></p>}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                disabled={!canRedo}
                />
            </div>

            {/* Text Color and Highlight Color Section */}
            {/* TODO: Implement color picker popovers that appear above the toolbar */}
            {/* TODO: Update the color indicator bar to show currentTextColor/currentHighlightColor */}
            <div className="flex mx-2 gap-1">
                <Tool
                icon={<div className="flex flex-col"><MdTitle size={20} /> <div className="w-full h-1 rounded-full bg-white-base border-[1px] border-black"></div> </div>}
                // TODO: Update icon to show current text color:
                // icon={<div className="flex flex-col"><MdTitle size={20} /> <div className="w-full h-1 rounded-full border-[1px] border-black" style={{backgroundColor: currentTextColor}}></div> </div>}
                label="Text Color"
                onClick={() => console.log("Color")}
                // TODO: onClick={() => setTextColorPickerOpen(!textColorPickerOpen)}
                // TODO: Add color picker popover component here
                />

                <Tool
                icon={<div className="flex flex-col"><MdOutlineEdit size={20} /> <div className="w-full h-1 rounded-full bg-white-base border-[1px] border-black"></div> </div>}
                // TODO: Update icon to show current highlight color:
                // icon={<div className="flex flex-col"><MdOutlineEdit size={20} /> <div className="w-full h-1 rounded-full border-[1px] border-black" style={{backgroundColor: currentHighlightColor}}></div> </div>}
                label="Highlight Color"
                onClick={() => console.log("Highlight")}
                // TODO: onClick={() => setHighlightColorPickerOpen(!highlightColorPickerOpen)}
                />
            </div>

            <div className="flex mx-2 gap-1">
                <Tool
                icon={<MdFormatBold size={20} />}
                label="Bold"
                tooltip={<p>Bold    <span className="tooltip">Ctrl</span> <span className="tooltip">B</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                active={isBold}
                />

                <Tool
                icon={<MdFormatItalic size={20} />}
                label="Italic"
                tooltip={<p>Italic    <span className="tooltip">Ctrl</span> <span className="tooltip">I</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                active={isItalic}
                />

                <Tool
                icon={<MdFormatUnderlined size={20} />}
                label="Underline"
                tooltip={<p>Underline    <span className="tooltip">Ctrl</span> <span className="tooltip">U</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                active={isUnderlined}
                />

                <Tool
                icon={<MdStrikethroughS size={20} />}
                label="Strikethrough"
                tooltip={<p>Strikethrough    <span className="tooltip">Shift</span> <span className="tooltip">Ctrl</span> <span className="tooltip">X</span></p>}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                active={isStrikethrough}
                />
            </div>

            {/* Insert Elements Section */}
            <div className="flex mx-2 gap gap-1">
                <Tool
                icon={<MdLink size={20} />}
                label="Link"
                onClick={() => console.log("Link")}
                // TODO: onClick={() => setLinkModalOpen(true)}
                // TODO: Add active state: active={isLink}
                // TODO: Show link modal/popover for URL input
                // TODO: If already a link, toggle to remove: onClick={() => isLink ? removeLink() : setLinkModalOpen(true)}
                />

                <Tool
                icon={<MdImage size={20} />}
                label="Image"
                onClick={() => console.log("Image")}
                // TODO: Open file picker dialog
                // TODO: After file selected, insert ImageNode into editor
                // TODO: Requires custom ImageNode implementation
                // See: https://lexical.dev/docs/concepts/nodes
                />

                <Tool
                icon={<MdFormatQuote size={20} />}
                label="Quote"
                onClick={() => console.log("Quote")}
                // TODO: onClick={insertQuote}
                // TODO: Add active state: active={isQuote}
                // TODO: Toggle quote off if already in quote block
                />

                <Tool
                icon={<MdHorizontalRule size={20} />}
                label="Divider"
                onClick={() => console.log("Divider")}
                // TODO: onClick={insertDivider}
                // Requires: import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
                // And register HorizontalRuleNode in editor config
                />
            </div>

            {/* Indentation Section */}
            <div className="flex ml-2 mr-3 gap-1">
                <Tool
                icon={<MdFormatIndentDecrease size={20} />}
                label="Decrease Indent"
                onClick={() => console.log("Decrease Indent")}
                // TODO: onClick={decreaseIndent}
                // Uses: editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                />

                <Tool
                icon={<MdFormatIndentIncrease size={20} />}
                label="Increase Indent"
                onClick={() => console.log("Increase Indent")}
                // TODO: onClick={increaseIndent}
                // Uses: editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                />
            </div>
        
            </div>
        </div>
        </div>
        
    )
}

interface ToolOptionProps {
  icon: React.ReactNode;
  label: string;
  tooltip?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

function Tool({
  icon,
  label,
  tooltip,
  onClick,
  disabled,
  active
}: ToolOptionProps) {
    return(
            <Tooltip text={tooltip || label} position="top">
              <button
                className={`relative flex items-center justify-center h-10 rounded-md transition-colors 
                  overflow-hidden gap-3 w-full disabled:opacity-55 border
                
                  lg:text-white-base enabled:hover:bg-neutral-light enabled:hover:lg:text-secondary-base 
                  delay-60 duration-300 ml-2 text-secondary-dark 
                  p-1.5 
                  
                  ${active ? "bg-[#344A39]  border-neutral-light/50" : "border-transparent"}
                  `}
                aria-label={label}
                onClick={onClick}
                disabled={disabled}
              >
                  {/* Icon - stays in fixed position */}
                  <span className="shrink-0" aria-label={label}>
                    {icon}
                  </span>
              </button>
            </Tooltip>
    )
}