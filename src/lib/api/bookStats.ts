import { clientSupabase } from "../supabase/client";

export interface BookStats {
    chapterCount: number
    totalWordCount: number
    avgWordsPerChapter: number
    branchCount: number
    activeBranches: number
    lastUpdatedDate: string
    lastUpdatedTime: string
}

export async function getBookStats(bookId: string): Promise<BookStats> {
    const { data: chapters, error: chaptersError } = await clientSupabase
    .from('chapters')
    .select('word_count')
    .eq('book_id', bookId);

    if (chaptersError) throw chaptersError;

    const chapterCount = chapters?.length || 0;
    const totalWordCount = chapters?.reduce((sum, chapter) => (sum + chapter.word_count || 0), 0) || 0
    const avgWordsPerChapter = chapterCount > 0 ? Math.round(totalWordCount / chapterCount) : 0;
    
    // TODO HANDLE BRANCH DATA WHEN IMPLEMENTED

    const branchCount = 0
    const activeBranches = 0

    const { data: lastUpdatedData, error: lastUpdatedError } = await clientSupabase
    .from('books')
    .select('updated_at')
    .eq('id', bookId)
    .single();

    if (lastUpdatedError) throw lastUpdatedError;

    const lastUpdatedDate = lastUpdatedData.updated_at ? new Date(lastUpdatedData.updated_at).toDateString() : '';
    const lastUpdatedTime = lastUpdatedData.updated_at ? new Date(lastUpdatedData.updated_at).toLocaleTimeString() : '';

    return {
        chapterCount,
        totalWordCount,
        avgWordsPerChapter,
        branchCount,
        activeBranches,
        lastUpdatedDate,
        lastUpdatedTime,
    }
}