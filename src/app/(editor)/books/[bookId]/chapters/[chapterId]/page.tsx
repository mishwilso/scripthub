'use client'

import { ChapterEditorProvider } from '@/context/ChapterEditorContext'
import ChapterEditor from '@/components/editor/ChapterEditor'
import { useParams } from 'next/navigation'
import { BookProvider } from '@/context/BookContext'

export default function ChapterEditorPage() {

  const params = useParams<{bookId: string, chapterId: string}>()

  return (
    <BookProvider bookId={params.bookId}>
      <ChapterEditorProvider bookId={params.bookId} chapterId={params.chapterId}>
        <ChapterEditor />
      </ChapterEditorProvider>
    </BookProvider>
  )
}

