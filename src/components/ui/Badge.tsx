// components/ui/Badge.tsx

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'error'
  size?: 'small' | 'medium'
}

export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'small' 
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-base text-white',
    secondary: 'bg-secondary-base text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-negative-base text-white'
  }

  const sizeStyles = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1'
  }

  return (
    <span className={`
      inline-flex items-center justify-center
      rounded-full font-medium
      ${variantStyles[variant]}
      ${sizeStyles[size]}
    `}>
      {children}
    </span>
  )
}