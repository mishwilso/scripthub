"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { GoGitBranch } from "react-icons/go";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface CreateDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDraft: (name: string) => Promise<{ success: boolean; error?: string }>;
}

export default function CreateDraftModal({
  isOpen,
  onClose,
  onCreateDraft,
}: CreateDraftModalProps) {
  const [draftName, setDraftName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Track if component is mounted for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setDraftName("");
      setError(null);
      setIsCreating(false);
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isCreating) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isCreating, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const trimmedName = draftName.trim();
    if (!trimmedName) {
      setError("Please enter a draft name");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Draft name must be at least 2 characters");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Draft name must be less than 50 characters");
      return;
    }

    setIsCreating(true);
    setError(null);

    const result = await onCreateDraft(trimmedName);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || "Failed to create draft");
      setIsCreating(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[200] animate-fade-in"
        onClick={() => !isCreating && onClose()}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div
          className="relative bg-white-input border border-neutral-dark/20 rounded-lg shadow-2xl max-w-md w-full p-6 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => !isCreating && onClose()}
            disabled={isCreating}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-neutral-light/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <CgClose size={20} className="text-neutral-dark" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-base/10 rounded-lg">
              <GoGitBranch size={24} className="text-primary-base" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-dark">
                Create New Draft
              </h2>
              <p className="text-sm text-secondary-dark/70">
                Start a new version of this chapter
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                id="draft-name"
                label="Draft Name"
                type="text"
                placeholder="e.g., Alternate Ending"
                value={draftName}
                onChange={(e) => {
                  setDraftName(e.target.value);
                  setError(null);
                }}
                error={!!error}
                errorMessage={error}
                helperText="Give your draft a descriptive name"
                disabled={isCreating}
                autoFocus
                required
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outlined"
                color="tertiary"
                onClick={onClose}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isCreating || !draftName.trim()}
                loading={isCreating}
              >
                {isCreating ? "Creating..." : "Create Draft"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
