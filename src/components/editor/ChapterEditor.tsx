import { ChapterEditorProvider, useChapterEditor } from "@/context/ChapterEditorContext";


export default function ChapterEditor() {
  const { chapter } = useChapterEditor()

  if (!chapter) {
    return
  }

  return (
    <div>
        <p>{chapter.id}</p>
        <p>{JSON.stringify(chapter.title)}</p>
    </div>
  );
}