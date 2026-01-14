/**
 * Collaborators Tool Component
 *
 * This component provides collaboration management functionality:
 * - View all collaborators on the book/chapter
 * - Invite new collaborators via email
 * - Set permission levels (viewer, commenter, editor, admin)
 * - See active collaborators (currently online)
 * - Remove collaborators
 * - Transfer ownership
 * - View collaboration activity log
 *
 * IMPLEMENTATION NOTES:
 * - Fetch collaborators from database (book_collaborators table)
 * - Implement real-time presence detection (who's currently editing)
 * - Add role-based permissions system
 * - Send email invitations with accept/decline links
 * - Show cursor positions of active collaborators in editor
 * - Add activity feed (who edited what, when)
 * - Implement invitation expiry and resend functionality
 */

import { useState } from "react";
import { FiUsers, FiUserPlus, FiMail, FiMoreVertical, FiCircle } from "react-icons/fi";
import { MdEdit, MdDelete, MdAdminPanelSettings } from "react-icons/md";

interface CollaboratorsProps {
  isOpen: boolean;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'commenter' | 'viewer';
  isActive: boolean; // Currently online/editing
  lastActive?: Date;
  addedBy: string;
  addedAt: Date;
  cursorColor?: string; // For active editing indicator
}

interface PendingInvitation {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'commenter' | 'viewer';
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export default function Collaborators({ isOpen }: CollaboratorsProps) {
  // State management
  // const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  // const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([]);
  // const [showInviteModal, setShowInviteModal] = useState(false);
  // const [inviteEmail, setInviteEmail] = useState('');
  // const [inviteRole, setInviteRole] = useState<Collaborator['role']>('editor');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-5 px-4 border-b border-neutral-dark/10">
        <h2 className="text-xl font-semibold">Collaborators</h2>

        {/* Invite Button */}
        {/* TODO: Button to open invite modal
         * - Shows modal with email input and role selector
         * - Validates email format
         * - Checks if user already invited
         * - Sends invitation via API
         */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary-base text-white rounded-md hover:bg-primary-dark transition-colors"
          // onClick={() => setShowInviteModal(true)}
        >
          <FiUserPlus size={16} />
          Invite
        </button>
      </div>

      {/* Active Collaborators Section */}
      <div className="px-4 py-3 border-b border-neutral-dark/10">
        <h3 className="text-xs font-semibold text-neutral-dark/60 uppercase mb-3">
          Active Now
        </h3>

        {/* TODO: List currently active collaborators
         * - Show with green dot indicator
         * - Avatar with colored ring (cursor color)
         * - Name and role
         * - "Editing" status
         * - Empty state if no one is active
         */}
        <div className="space-y-2">
          {/* Active collaborator items here */}

          {/* Empty state */}
          <p className="text-xs text-neutral-dark/40 italic">
            No one else is editing right now
          </p>
        </div>
      </div>

      {/* All Collaborators List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <h3 className="text-xs font-semibold text-neutral-dark/60 uppercase mb-3">
          All Collaborators
        </h3>

        {/* TODO: List all collaborators with full details
         * - Sort by: Owner first, then by role, then alphabetically
         * - Avatar or initials
         * - Name and email
         * - Role badge
         * - Last active timestamp
         * - Actions menu (edit role, remove)
         * - Cannot remove self or owner
         * - Owner has special badge/icon
         */}
        <div className="space-y-2">
          {/* Collaborator Card */}
          {/* TODO: Create CollaboratorCard component
           *
           * Structure:
           * - Left: Avatar with online indicator
           * - Center: Name, email (secondary), role badge, last active
           * - Right: Actions menu (3-dot menu)
           *
           * Actions menu:
           * - Change role (dropdown)
           * - Remove from book
           * - Transfer ownership (owner only)
           * - Send message (future feature)
           *
           * Permissions:
           * - Only admins and owner can change roles
           * - Only owner can transfer ownership
           * - Users can remove themselves (leave)
           */}
        </div>
      </div>

      {/* Pending Invitations Section */}
      {/* TODO: Show pending invitations (optional expandable)
       * - List emails with pending status
       * - Role they were invited as
       * - Invited by and when
       * - Resend invitation button
       * - Cancel invitation button
       * - Expiry date/countdown
       */}
      <div className="border-t border-neutral-dark/10 px-4 py-3">
        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold text-neutral-dark/60 uppercase mb-2 list-none flex items-center justify-between">
            <span>Pending Invitations (0)</span>
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="space-y-2 mt-2">
            {/* Pending invitation items here */}
          </div>
        </details>
      </div>

      {/* Footer Info */}
      <div className="border-t border-neutral-dark/10 px-4 py-3 text-xs text-neutral-dark/60">
        {/* TODO: Show statistics
         * - Total collaborators
         * - Currently active count
         * - Link to activity log
         */}
        <p>Total: 5 collaborators</p>
      </div>
    </div>
  );
}

/**
 * Invite Modal Component
 *
 * TODO: Create modal for inviting collaborators
 * - Email input (with validation)
 * - Role selector dropdown:
 *   - Viewer: Can only view
 *   - Commenter: Can view and comment
 *   - Editor: Can edit content
 *   - Admin: Can edit + manage collaborators
 * - Optional personal message field
 * - "Cancel" and "Send Invitation" buttons
 * - Success/error feedback
 * - Option to invite multiple emails at once
 */

/**
 * Change Role Modal Component
 *
 * TODO: Create modal for changing collaborator role
 * - Show current role
 * - Dropdown to select new role
 * - Explanation of each role's permissions
 * - "Cancel" and "Save" buttons
 * - Confirmation if downgrading admin
 */

/**
 * Transfer Ownership Modal Component
 *
 * TODO: Create modal for transferring ownership
 * - Warning about implications
 * - Select new owner from admin list
 * - Password confirmation
 * - "Cancel" and "Transfer" buttons
 * - Email notification to new owner
 */

/**
 * Activity Log Component (Optional)
 *
 * TODO: Create activity feed showing:
 * - Who joined/left
 * - Role changes
 * - Major edits with timestamps
 * - Comments added
 * - Versions created
 * - Filterable by collaborator
 * - Searchable
 */

/**
 * Real-time Presence Integration:
 *
 * TODO: Implement presence detection
 * - Use WebSocket or polling
 * - Show cursor positions in editor
 * - Display colored cursors with names
 * - Update active status in real-time
 * - Detect when users go idle/offline
 * - Handle disconnections gracefully
 */
