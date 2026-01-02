/**
 * Plan: User preses arrow key at a possition like 5
 * "hello **world**"
 * 0123456789...
 *
 * Cursor at 5 (before the *)
 * with the atomic it should say 6-7 are atomic
 * meaning code mirror skips 6 -7 and lands cursor at 8 ('w)
 *
 * user does the
 */

"use client";

import { useEffect, useRef } from "react";
import { EditorState, Range } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { RangeSet, RangeSetBuilder } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";

import { useChapterEditor } from "@/context/ChapterEditorContext";

const scriptHubHighlightingStyle = HighlightStyle.define([
  // Basic format stuff
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontStyle: "bold" },
]);

const markdownPatterns = [
  // Bold + Italic: ***text***
  {
    regex: /\*\*\*(.+?)\*\*\*/g,
    style: "font-weight: bold; font-style: italic;",
    markerLen: 3,
    open: "***",
    close: "***",
  },
  // Bold: **text**
  {
    regex: /\*\*(.+?)\*\*/g,
    style: "font-weight: bold;",
    markerLen: 2,
    open: "**",
    close: "**",
  },
  // Strikethrough: ~~text~~
  {
    regex: /~~(.+?)~~/g,
    style: "text-decoration: line-through;",
    markerLen: 2,
    open: "~~",
    close: "~~",
  },
  // Underline: __text__
  {
    regex: /__(.+?)__/g,
    style: "text-decoration: underline;",
    markerLen: 2,
    open: "__",
    close: "__",
  },
  // Italic: *text* (simpler regex)
  {
    regex: /\*([^*]+?)\*/g,
    style: "font-style: italic;",
    markerLen: 1,
    open: "*",
    close: "*",
  },
];

// atomic ranges
const atomicRanges = ViewPlugin.fromClass(
  class {
    constructor(view: EditorView) {}

    update(update: ViewUpdate) {}
  },
  {
    provide: (plugin) =>
      EditorView.atomicRanges.of((view) => {
        const ranges: Range<Decoration>[] = [];
        const text = view.state.doc.toString();

        markdownPatterns.forEach(({ regex, markerLen }) => {
          let match;
          const regexCopy = new RegExp(regex.source, regex.flags);

          while ((match = regexCopy.exec(text)) !== null) {
            const from = match.index;
            const to = from + match[0].length;
            const contentStart = from + markerLen;
            const contentEnd = to - markerLen;

            // Make opening marker atomic
            ranges.push(
              Decoration.mark({ class: "atomic" }).range(from, contentStart)
            );
            // Make closing marker atomic
            ranges.push(
              Decoration.mark({ class: "atomic" }).range(contentEnd, to)
            );
          }
        });

        return RangeSet.of(ranges, true);
      }),
  }
);

// ViewPlugin that finds **bold** patterns and applies decorations
// This hides the ** markers and makes the text bold
const FormattingPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      // Only rebuild decorations if document changed
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const decorations: Range<Decoration>[] = [];
      const text = view.state.doc.toString();

      markdownPatterns.forEach(({ regex, style, markerLen, open, close }) => {
        let match;
        const regexCopy = new RegExp(regex.source, regex.flags);

        while ((match = regexCopy.exec(text)) !== null) {
          const from = match.index;
          const to = from + match[0].length;
          const contentStart = from + markerLen;
          const contentEnd = to - markerLen;

          // Hide opening style - added non-teractiv ehopefullt
          decorations.push(
            Decoration.mark({
              class: "cm-marker-hidden",
            }).range(from, contentStart)
          );

          // Format the content
          decorations.push(
            Decoration.mark({
              attributes: { style: style },
              // class: "cm-formatted-bold"
            }).range(contentStart, contentEnd)
          );

          // Hide closing marker
          decorations.push(
            Decoration.mark({
              class: "cm-marker-hidden",
            }).range(contentEnd, to)
          );
        }
      });

      return Decoration.set(decorations, true);
    }
  },
  {
    decorations: (instance) => instance.decorations,
  }
);

// Then use it in handleBackspace
function handleBackspace(view: EditorView): boolean {
  const selection = view.state.selection.main;

  if (selection.from !== selection.to) {
    return false;
  }

  const pos = selection.from;
  if (pos === 0) return false;

  const text = view.state.doc.toString();
  const windowStart = Math.max(0, pos - 100);
  const windowEnd = Math.min(text.length, pos + 20);
  const beforeCursor = text.slice(windowStart, pos);
  const afterCursor = text.slice(pos, windowEnd);

  // Sort patterns by marker length (longest first to avoid conflicts)
  const sortedPatterns = [...markdownPatterns].sort(
    (a, b) => b.markerLen - a.markerLen
  );

  for (const { open, close, markerLen } of sortedPatterns) {
    if (afterCursor.startsWith(close)) {
      const lastOpen = beforeCursor.lastIndexOf(open);

      if (lastOpen !== -1) {
        const between = beforeCursor.slice(lastOpen + open.length);
        const hasCloserInBetween = between.includes(close);

        if (!hasCloserInBetween) {
          const contentLength = pos - (windowStart + lastOpen + open.length);

          if (contentLength === 1) {
            // Delete entire formatting when only one char left
            view.dispatch({
              changes: {
                from: windowStart + lastOpen,
                to: pos + close.length,
              },
              selection: { anchor: windowStart + lastOpen },
            });
            return true;
          } else if (contentLength > 1) {
            // Delete last character of content
            view.dispatch({
              changes: { from: pos - 1, to: pos },
              selection: { anchor: pos - 1 },
            });
            return true;
          }
        }
      }
    }

    // Handle deleting from outside
    if (beforeCursor.endsWith(close)) {
      const markerStart = pos - close.length;
      const searchArea = text.slice(
        Math.max(0, markerStart - 100),
        markerStart
      );
      const openIndex = searchArea.lastIndexOf(open);

      if (openIndex !== -1) {
        const contentEnd = markerStart;
        const contentChar = contentEnd - 1;
        const absoluteOpenEnd =
          Math.max(0, markerStart - 100) + openIndex + open.length;

        if (contentChar >= absoluteOpenEnd) {
          view.dispatch({
            changes: { from: contentChar, to: contentChar + 1 },
            selection: { anchor: contentChar },
          });
          return true;
        }
      }
    }
  }

  return false;
}

function toggleWrap(view: EditorView, startMarker: string, endMarker: string) {
  // Get current selection
  const selection = view.state.selection.main;
  const from = selection.from;
  const to = selection.to;

  // TODO: Handle empty selection
  if (from === to) {
    const markers = startMarker + endMarker;
    view.dispatch({
      changes: {
        from: from,
        to: to,
        insert: markers,
      },
      selection: {
        anchor: from + startMarker.length,
        head: from + startMarker.length, // so cursor is inbetween the markers :)
      },
    });
    view.focus();
    return true;
  }

  // Grab the selected text
  const selectedText = view.state.doc.sliceString(from, to);

  // Get surround text (grab surroundng text, match length of marker)
  const beforeStart = Math.max(0, from - startMarker.length);
  const afterEnd = Math.min(view.state.doc.length, to + endMarker.length);

  const textBefore = view.state.doc.sliceString(beforeStart, from);
  const textAfter = view.state.doc.sliceString(to, afterEnd);

  // Check if wrapped
  const isWrapped = textBefore === startMarker && textAfter === endMarker;

  if (isWrapped) {
    // UNWRAP IT!
    view.dispatch({
      changes: [
        {
          from: beforeStart,
          to: from,
          insert: "",
        },
        {
          from: to,
          to: afterEnd,
          insert: "",
        },
      ],
      selection: {
        anchor: beforeStart,
        head: to - startMarker.length,
      },
    });
  } else {
    // WRAP : Add the markers
    view.dispatch({
      changes: {
        from: from,
        to: to,
        insert: `${startMarker}${selectedText}${endMarker}`,
      },
      // move cursor to end of selection??
      selection: {
        anchor: from,
        head: to + startMarker.length + endMarker.length,
      },
    });
  }

  view.focus();
  return true;
}

export default function EditorContent() {
  // Ref to hold the editor container div
  const editorRef = useRef<HTMLDivElement>(null);

  // Ref for to hold the editor view isntance
  const viewRef = useRef<EditorView | null>(null);

  // Commands
  const italicCommand = (view: EditorView) => {
    toggleWrap(view, "*", "*");
    return true;
  };

  const boldCommand = (view: EditorView) => {
    toggleWrap(view, "**", "**");
    return true;
  };

  const underlineCommand = (view: EditorView) => {
    toggleWrap(view, "__", "__");
    return true;
  };

  // Custom Keymap?
  const customKeymap = keymap.of([
    { key: "Mod-i", preventDefault: true, run: italicCommand },
    { key: "Mod-b", preventDefault: true, run: boldCommand },
    { key: "Mod-u", preventDefault: true, run: underlineCommand },
    { key: "Backspace", run: handleBackspace },
  ]);

  const { content, updateContent, updateWordCount } = useChapterEditor();

  useEffect(() => {
    // Don't init if container aint ready yet
    if (!editorRef.current) return;

    //Count words function
    const countWords = (text: string) => {
      return text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    };

    // Create the initial editor state!!
    const startState = EditorState.create({
      doc: content,
      extensions: [
        // Bold formatting: hides ** markers and styles text
        FormattingPlugin,

        atomicRanges,

        customKeymap,

        // Basic key bindingings
        keymap.of([...defaultKeymap, ...historyKeymap]),

        // Enable undo/redo history
        history(),

        EditorView.lineWrapping,

        // markdownstupport
        markdown(),
        syntaxHighlighting(scriptHubHighlightingStyle),

        // Listen to doc changes
        EditorView.updateListener.of((update) => {
          // Only process if the doc actually changed
          if (update.docChanged) {
            const newContent = update.state.doc.toString();

            // Update word count
            updateWordCount(countWords(newContent));

            // Notify parent of changes
            updateContent(newContent);
          }
        }),

        EditorView.theme({
          "&": {
            heigth: "100%",
            fontSize: "16px",
            fontFamily: "Georgia, serif",
            position: "relative",
            zIndex: "0",
          },
          ".cm-scroller": {
            overflowX: "hidden",
            overflowY: "auto",
            overflow: "visible",
            fontFamily: "Georgia, serif",
          },
          ".cm-content": {
            padding: "1.5rem",
            minHeight: "100vh",
            maxWidth: "800px",
            margin: "0 auto",
            caretColor: "#8b5a3c",
          },
          ".cm-line": {
            lineHeight: "1.6",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
          },
          "&.cm-focused": {
            outline: "none",
          },
          ".cm-editor": {},
          ".cm-marker-hidden": {
            display: "none",
            fontSize: "0",
            width: "0",
            letterSpacing: "-em",
          },
        }),
      ],
    });

    // Editor view that we mount in the container!
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    // Store the view in the red- so we can get it later
    viewRef.current = view;

    // Cleanup function
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // if the initi content changes (chapter change) then update the editor
  useEffect(() => {
    if (viewRef.current) {
      const currentContent = viewRef.current.state.doc.toString();

      // only update if the content is different
      if (currentContent !== content) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentContent.length,
            insert: content,
          },
        });
      }
    }
  }, [content]);

  return (
    // Editor container
    <div ref={editorRef} className="flex-1 min-h-screen relative z-0" />
  );
}
