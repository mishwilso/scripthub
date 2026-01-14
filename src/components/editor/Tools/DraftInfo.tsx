/**
 * Draft Info Tool Component
 *
 * This component provides metadata and statistics about the current draft:
 * - Document statistics (word count, character count, pages, reading time)
 * - Metadata editing (title, description, tags, status)
 * - Writing goals and progress tracking
 * - Readability metrics
 * - Document details (created, modified, author)
 * - Chapter information
 *
 * IMPLEMENTATION NOTES:
 * - Calculate statistics from Lexical editor state
 * - Use readability algorithms (Flesch-Kincaid, etc.)
 * - Store metadata in database (chapters table)
 * - Update statistics in real-time or on-demand
 * - Implement writing goal tracking with progress bars
 * - Add character frequency analysis
 * - Include paragraph and sentence counts
 */

import { useState, useEffect } from "react";
import {
  FiEdit3,
  FiClock,
  FiCalendar,
  FiUser,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";
import { MdOutlineNumbers, MdOutlineTextFields } from "react-icons/md";

interface DraftInfoProps {
  isOpen: boolean;
}

interface DocumentStats {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  paragraphCount: number;
  sentenceCount: number;
  pageCount: number; // Estimated (250 words per page)
  readingTime: number; // Minutes (based on 200 words per minute)
  speakingTime: number; // Minutes (based on 150 words per minute)
}

interface ReadabilityMetrics {
  fleschKincaidGrade: number; // Grade level
  fleschReadingEase: number; // 0-100 score
  averageWordsPerSentence: number;
  averageSyllablesPerWord: number;
}

interface DraftMetadata {
  title: string;
  description: string;
  status: 'draft' | 'in-progress' | 'review' | 'final';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author: string;
  version: number;
}

interface WritingGoal {
  type: 'words' | 'characters' | 'pages';
  target: number;
  current: number;
  deadline?: Date;
}

export default function DraftInfo({ isOpen }: DraftInfoProps) {
  // State management
  // const [stats, setStats] = useState<DocumentStats | null>(null);
  // const [readability, setReadability] = useState<ReadabilityMetrics | null>(null);
  // const [metadata, setMetadata] = useState<DraftMetadata | null>(null);
  // const [writingGoal, setWritingGoal] = useState<WritingGoal | null>(null);
  // const [isEditingMetadata, setIsEditingMetadata] = useState(false);

  // TODO: Calculate stats from editor content
  // useEffect(() => {
  //   const calculateStats = () => {
  //     // Get editor state
  //     // Count words, characters, paragraphs, sentences
  //     // Calculate reading time
  //     // Update state
  //   };
  //   calculateStats();
  // }, [/* editor state dependencies */]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-5 px-4 border-b border-neutral-dark/10">
        <h2 className="text-xl font-semibold">Draft Info</h2>

        {/* Edit Metadata Button */}
        {/* TODO: Toggle edit mode for metadata
         * - Shows editable fields when clicked
         * - Changes to "Save" and "Cancel" buttons
         */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors">
          <FiEdit3 size={14} />
          Edit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Metadata Section */}
        <div className="px-4 py-4 border-b border-neutral-dark/10 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-dark/60 uppercase">
            Metadata
          </h3>

          {/* TODO: Show/edit metadata fields
           * - Title (editable input)
           * - Description (textarea)
           * - Status (dropdown: draft, in-progress, review, final)
           * - Tags (tag input with autocomplete)
           * - Author name (read-only or editable)
           * - Version number
           */}

          {/* Example structure:
          <div className="space-y-2">
            <div>
              <label className="text-xs text-neutral-dark/60">Title</label>
              <input type="text" className="w-full mt-1 px-3 py-2 border" />
            </div>
            <div>
              <label className="text-xs text-neutral-dark/60">Status</label>
              <select className="w-full mt-1 px-3 py-2 border">
                <option>Draft</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Final</option>
              </select>
            </div>
          </div>
          */}
        </div>

        {/* Statistics Section */}
        <div className="px-4 py-4 border-b border-neutral-dark/10 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-dark/60 uppercase">
            Statistics
          </h3>

          {/* TODO: Display document statistics in a grid
           * - Word count (with icon)
           * - Character count (with/without spaces)
           * - Paragraph count
           * - Sentence count
           * - Estimated pages
           * - Reading time
           * - Speaking time
           *
           * Use a card or list layout with icons
           */}

          <div className="grid grid-cols-2 gap-3">
            {/* Stat Card */}
            {/* TODO: Create StatCard component
             * - Icon
             * - Label
             * - Value (large, prominent)
             * - Secondary info (if needed)
             *
             * Example:
             * <StatCard
             *   icon={<MdOutlineNumbers />}
             *   label="Words"
             *   value={1234}
             * />
             */}
          </div>
        </div>

        {/* Writing Goal Section */}
        <div className="px-4 py-4 border-b border-neutral-dark/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-dark/60 uppercase">
              Writing Goal
            </h3>
            {/* TODO: Add/edit goal button */}
          </div>

          {/* TODO: Show writing goal progress
           * - If no goal: "Set a writing goal" button
           * - If goal exists:
           *   - Goal type and target (e.g., "2000 words")
           *   - Current progress (e.g., "1234 / 2000")
           *   - Progress bar with percentage
           *   - Deadline (if set)
           *   - Words remaining
           *   - Edit/Delete buttons
           */}

          {/* No goal state */}
          <button className="w-full py-3 border-2 border-dashed border-neutral-dark/20 rounded-lg hover:border-primary-base hover:bg-primary-base/5 transition-colors">
            <FiTarget className="inline mr-2" size={16} />
            <span className="text-sm font-medium">Set Writing Goal</span>
          </button>

          {/* With goal state */}
          {/* TODO: Show goal progress
           * <div className="space-y-2">
           *   <div className="flex justify-between text-sm">
           *     <span>1234 / 2000 words</span>
           *     <span>62%</span>
           *   </div>
           *   <div className="w-full h-2 bg-neutral-light rounded-full">
           *     <div className="h-full bg-primary-base rounded-full" style={{width: '62%'}}></div>
           *   </div>
           *   <p className="text-xs text-neutral-dark/60">766 words to go</p>
           * </div>
           */}
        </div>

        {/* Readability Metrics Section */}
        <div className="px-4 py-4 border-b border-neutral-dark/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-dark/60 uppercase">
              Readability
            </h3>
            {/* TODO: Info tooltip explaining metrics */}
          </div>

          {/* TODO: Display readability scores
           * - Flesch-Kincaid Grade Level
           *   - "Grade 8" or "College level"
           *   - Color-coded indicator (green = easy, red = difficult)
           * - Flesch Reading Ease Score
           *   - 0-100 scale
           *   - Interpretation (e.g., "Easy to read")
           * - Average words per sentence
           * - Average syllables per word
           *
           * Use progress bars or score indicators
           */}

          <div className="space-y-2">
            {/* Readability score cards */}
          </div>
        </div>

        {/* Document Details Section */}
        <div className="px-4 py-4 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-dark/60 uppercase">
            Document Details
          </h3>

          {/* TODO: Display document metadata (read-only)
           * - Created date and time
           * - Last modified date and time
           * - Created by (author)
           * - Last edited by
           * - File size (if applicable)
           * - Version number
           *
           * Use icon + label + value layout
           */}

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <FiCalendar size={14} className="text-neutral-dark/60" />
              <span className="text-neutral-dark/60">Created:</span>
              <span className="font-medium">{/* Date here */}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={14} className="text-neutral-dark/60" />
              <span className="text-neutral-dark/60">Modified:</span>
              <span className="font-medium">{/* Date here */}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUser size={14} className="text-neutral-dark/60" />
              <span className="text-neutral-dark/60">Author:</span>
              <span className="font-medium">{/* Author name */}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button (Footer) */}
      {/* TODO: Manual refresh button for statistics
       * - Recalculates all stats
       * - Shows loading state
       * - Last updated timestamp
       */}
      <div className="border-t border-neutral-dark/10 px-4 py-3">
        <button className="w-full py-2 text-sm text-neutral-dark/60 hover:text-neutral-dark transition-colors">
          <FiBarChart2 className="inline mr-2" size={14} />
          Refresh Statistics
        </button>
      </div>
    </div>
  );
}

/**
 * StatCard Component
 *
 * TODO: Create reusable stat display card
 * - Icon (React icon)
 * - Label (string)
 * - Value (number or string, formatted)
 * - Optional secondary info
 * - Hover effect
 */

/**
 * Writing Goal Modal
 *
 * TODO: Create modal for setting/editing writing goal
 * - Goal type selector (words/characters/pages)
 * - Target input (number)
 * - Optional deadline (date picker)
 * - Optional daily target
 * - "Cancel" and "Save Goal" buttons
 * - Validation (target must be positive)
 */

/**
 * Statistics Calculation:
 *
 * TODO: Implement helper functions
 * - countWords(editorState): number
 * - countCharacters(editorState, includeSpaces): number
 * - countParagraphs(editorState): number
 * - countSentences(editorState): number
 * - estimatePages(wordCount): number
 * - calculateReadingTime(wordCount): number
 * - calculateFleschKincaid(text): ReadabilityMetrics
 *
 * TODO: Optimize performance
 * - Debounce calculations (don't run on every keystroke)
 * - Cache results
 * - Run calculations in web worker for large documents
 */
