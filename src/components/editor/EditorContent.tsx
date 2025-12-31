'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap  } from '@codemirror/commands';

import {
  useChapterEditor,
} from "@/context/ChapterEditorContext";
import { console } from 'inspector';

function toggleWrap (
    view: EditorView,
    startMarker: string,
    endMarker: string
) {
    
}

function wrapSelection(view: EditorView, before: string, after: string){
    // Get current selection
    const selection = view.state.selection.main;
    const from = selection.from
    const to = selection.to

    // Grab the selected text
    const selectedText = view.state.doc.sliceString(from, to);

    console.log(selectedText)

    console.log(selectedText.substring(0))

    // create the transaction to dispatch
    view.dispatch({
        changes: {
            from: from,
            to: to,
            insert: `${before}${selectedText}${after}`
        },
        // move cursor to end of selection??
        selection: {
            anchor: from + before.length + selectedText.length + after.length
        }
    });

    // Focus on the editor please :)
    view.focus();
}

export default function EditorContent(){
    // Ref to hold the editor container div
    const editorRef = useRef<HTMLDivElement>(null);

    // Ref for to hold the editor view isntance
    const viewRef = useRef<EditorView | null>(null);

    // Commands
    const italicCommand = (view: EditorView) => {
        wrapSelection(view, "*", "*")
        return true;
    }

    // Custom Keymap?
    const customKeymap = keymap.of([
        { key: "Mod-i", run: italicCommand},
    ]);

    const {
        content,
        updateContent,
        wordCount,
        updateWordCount,
        isSaving,
        lastSaved,
    } = useChapterEditor();

    useEffect(() => {
        // Don't init if container aint ready yet
        if (!editorRef.current) return;

        //Count words function
        const countWords = (text: string) => {
            return text.trim().split(/\s+/).filter(word => word.length > 0).length;
        }


        // Create the initial editor state!!
        const startState = EditorState.create({
            doc: content,
            extensions: [
                // Basic key bindingings
                keymap.of([...defaultKeymap, ...historyKeymap]),

                // Custom keymap
                customKeymap,

                // Enable undo/redo history
                history(),

                EditorView.lineWrapping,

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
                    '&': {
                        heigth: '100%',
                        fontSize: '16px',
                        fontFamily: 'Georgia, serif',
                        position: "relative",
                        zIndex: '0',

                    },
                    '.cm-scroller': {
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        overflow: 'visible',
                        fontFamily: 'Georgia, serif',
                    },
                    '.cm-content': {
                        padding: '1.5rem',
                        minHeight: '100vh',
                        maxWidth: '800px',
                        margin: '0 auto',
                        caretColor: '#8b5a3c',
                    },
                    '.cm-line': {
                        lineHeight: '1.6',
                        wordWrap: "break-word",
                        whiteSpace: 'pre-wrap',
                    },
                    '&.cm-focused': {
                        outline: 'none',
                    },
                    '.cm-editor': {
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

        // Get the current posititon of the cursor
        const cursor = view.state.selection.main.head;

        // Dispatch a change at and to the cursor :)
        view.dispatch({
            changes: {
                from: cursor,
                to: cursor,
                insert: "Hello!"
            }
        });

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
                        insert: content
                    },
                });
            }
        }
    }, [content]);

    return (
        // Editor container
        <div ref={editorRef} className="flex-1 min-h-screen relative z-0" />
    )

}