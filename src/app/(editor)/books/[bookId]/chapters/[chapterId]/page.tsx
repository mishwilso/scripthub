import { ChapterEditorProvider } from '@/context/ChapterEditorContext'
import ChapterEditor from '@/components/editor/ChapterEditor'

export default function ChapterEditorPage({ 
  params 
}: { 
  params: { bookId: string; chapterId: string } 
}) {
  return (
    <ChapterEditorProvider bookId={params.bookId} chapterId={params.chapterId}>
      <ChapterEditor />
    </ChapterEditorProvider>
  )
}

