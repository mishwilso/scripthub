'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap  } from '@codemirror/commands';

import {
  useChapterEditor,
} from "@/context/ChapterEditorContext";


export default function EditorContent(){
    // Ref to hold the editor container div
    const editorRef = useRef<HTMLDivElement>(null);

    // Ref for to hold the editor view isntance
    const viewRef = useRef<EditorView | null>(null);

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
                    },
                    '.cm-scroller': {
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        fontFamily: 'Georgia, serif',
                    },
                    '.cm-content': {
                        minHeight: '100%',
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
                        insert: content
                    },
                });
            }
        }
    }, [content]);

    return (
        // Editor container
        <div ref={editorRef} className="flex-1 overflow-hidden" />
    )

}