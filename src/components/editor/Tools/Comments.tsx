/**
 * Comments Tool Component
 *
 * This component provides commenting and annotation functionality:
 * - Add comments to selected text
 * - View all comments in sidebar
 * - Reply to comments (threaded)
 * - Resolve/unresolve comments
 * - Filter comments (active, resolved, mine, all)
 * - Highlight commented text in editor
 * - Mention other collaborators
 *
 * IMPLEMENTATION NOTES:
 * - Store comments in database with chapterId and text range reference
 * - Use Lexical decorator nodes to highlight commented text
 * - Implement real-time updates for collaborative editing
 * - Add @ mention autocomplete for collaborators
 * - Include rich text support in comment body
 * - Track comment author and timestamps
 * - Send notifications for mentions and replies
 * - Implement comment anchoring (maintain position even when text changes)
 */

import { useState } from "react";
import { FiMessageSquare, FiCheck, FiX, FiFilter, FiMoreVertical } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";

interface CommentsProps {
  isOpen: boolean;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string; // Rich text or plain text
  timestamp: Date;
  isResolved: boolean;
  threadId?: string; // For replies
  parentId?: string; // Reply to specific comment
  textRange: {
    start: number;
    end: number;
    anchorText: string; // Original text for reference
  };
  replies: Comment[];
}

type CommentFilter = 'all' | 'active' | 'resolved' | 'mine';

export default function Comments({ isOpen }: CommentsProps) {
  // State management
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [filter, setFilter] = useState<CommentFilter>('active');
  // const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  // const [newCommentText, setNewCommentText] = useState('');
  // const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-5 px-4 border-b border-neutral-dark/10">
        <h2 className="text-xl font-semibold">Comments</h2>

        {/* Filter Dropdown */}
        {/* TODO: Implement filter dropdown
         * - All comments
         * - Active (unresolved)
         * - Resolved
         * - My comments
         * - Show count badge for each filter
         */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-neutral-dark/20 rounded-md hover:bg-neutral-light/30 transition-colors">
          <FiFilter size={14} />
          Active
        </button>
      </div>

      {/* New Comment Section (when text is selected) */}
      {/* TODO: Show when user has text selected in editor
       * - Input field for comment text
       * - Rich text formatting options (bold, italic, link)
       * - @ mention autocomplete
       * - "Post" and "Cancel" buttons
       * - Show selected text preview
       */}

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* TODO: Display filtered comments
         * - Group by thread if replies exist
         * - Show in chronological or reverse order
         * - Expand/collapse threads
         * - Click to highlight in editor
         * - Visual distinction for resolved comments
         */}

        {/* Comment Card */}
        {/* TODO: Create CommentCard component
         * Props: comment, onReply, onResolve, onDelete, onEdit
         *
         * Structure:
         * - Header: Avatar, author name, timestamp
         * - Body: Comment text with formatting
         * - Quoted text: Show the text being commented on
         * - Actions: Reply, Resolve, Edit (if own comment), Delete (if own), More menu
         * - Replies: Nested comment cards (indented)
         * - Reply form: Show when replying
         */}

        {/* Example structure:
        <div className="border border-neutral-dark/10 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <Avatar />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Author Name</span>
                <span className="text-xs text-neutral-dark/60">2h ago</span>
              </div>
              <p className="text-sm">Comment text here...</p>
              <div className="bg-neutral-light/30 border-l-2 border-primary-base px-2 py-1 mt-2 text-xs">
                "Quoted text from document..."
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button>Reply</button>
                <button>Resolve</button>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Empty State */}
        {/* TODO: Show when no comments match filter
         * - Different messages for different filters
         * - "No comments yet" vs "No active comments"
         * - CTA to add first comment
         */}
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <FiMessageSquare size={32} className="text-neutral-dark/30 mb-3" />
          <p className="text-sm text-neutral-dark/60">
            No comments yet
          </p>
          <p className="text-xs text-neutral-dark/40 mt-1">
            Select text and add a comment to start
          </p>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-neutral-dark/10 px-4 py-3 text-xs text-neutral-dark/60">
        {/* TODO: Show comment statistics
         * - Total comments
         * - Active vs resolved count
         * - Your comments count
         */}
      </div>
    </div>
  );
}

/**
 * Integration with Editor:
 *
 * TODO: Add comment decorator nodes in Lexical
 * - Highlight commented text with colored background
 * - Different colors for different comment states
 * - Show comment icon in margin
 * - Click highlighted text to open comment
 * - Handle text changes (keep comment anchored)
 *
 * TODO: Add selection toolbar button
 * - "Add Comment" button appears when text is selected
 * - Opens comment input in sidebar
 * - Prefills with selected text reference
 *
 * TODO: Implement comment threading
 * - Store comment chains in database
 * - Real-time sync for collaborative comments
 * - Notification system for replies and mentions
 */

/**
 * Comment Notification System:
 *
 * TODO: Implement notifications
 * - In-app notifications for mentions
 * - Email notifications (optional)
 * - Mark as read functionality
 * - Notification badge on comments tool icon
 */
