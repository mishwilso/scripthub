// components/ui/Notification.tsx

import { ReactNode } from 'react'

interface NotificationProps {
  icon: ReactNode
  title: string
  message: string
  timestamp: string
  isRead?: boolean
  onClick?: () => void
}

export default function Notification({
  icon,
  title,
  message,
  timestamp,
  isRead = false,
  onClick
}: NotificationProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 hover:bg-neutral-light/50 transition-colors cursor-pointer text-left"
      aria-label={`${title}: ${message}`}
    >
      {/* Icon Container */}
      <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-neutral-dark text-sm mb-1">
          {title}
        </h4>
        <p className="text-sm text-neutral-dark/70 mb-1 line-clamp-2">
          {message}
        </p>
        <span className="text-xs text-neutral-dark/50">
          {timestamp}
        </span>
      </div>

      {/* Unread Indicator */}
      {!isRead && (
        <div className="w-2 h-2 rounded-full bg-primary-base flex-shrink-0 mt-2" />
      )}
    </button>
  )
}