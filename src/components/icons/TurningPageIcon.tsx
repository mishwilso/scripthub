// components/ui/TurningPageIcon.tsx

export default function TurningPageIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="turning-page-animation"
    >
      {/* Book base/cover */}
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="2"
        fill="#8B7355"
        stroke="#5E4C3B"
        strokeWidth="1.5"
      />

      {/* Left page (static) */}
      <path
        d="M 25 25 L 48 25 L 48 75 L 25 75 Z"
        fill="#F5EFE7"
        stroke="#7E7065"
        strokeWidth="1"
      />

      {/* Decorative lines on left page */}
      <line x1="30" y1="35" x2="43" y2="35" stroke="#B8A89A" strokeWidth="0.8" opacity="0.5" />
      <line x1="30" y1="40" x2="43" y2="40" stroke="#B8A89A" strokeWidth="0.8" opacity="0.5" />
      <line x1="30" y1="45" x2="43" y2="45" stroke="#B8A89A" strokeWidth="0.8" opacity="0.5" />
      <line x1="30" y1="50" x2="43" y2="50" stroke="#B8A89A" strokeWidth="0.8" opacity="0.5" />

      {/* Center spine */}
      <rect
        x="48"
        y="25"
        width="4"
        height="50"
        fill="#6B5744"
      />

      {/* Right page (turning) - with gradient for depth */}
      <g className="page-turn">
        <defs>
          <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FAF8F5" />
            <stop offset="50%" stopColor="#F5EFE7" />
            <stop offset="100%" stopColor="#E6DBCD" />
          </linearGradient>
        </defs>

        <path
          d="M 52 25 L 75 25 L 75 75 L 52 75 Z"
          fill="url(#pageGradient)"
          stroke="#7E7065"
          strokeWidth="1"
        />

        {/* Text lines on turning page */}
        <line x1="57" y1="35" x2="70" y2="35" stroke="#B8A89A" strokeWidth="0.8" opacity="0.4" />
        <line x1="57" y1="40" x2="70" y2="40" stroke="#B8A89A" strokeWidth="0.8" opacity="0.4" />
        <line x1="57" y1="45" x2="70" y2="45" stroke="#B8A89A" strokeWidth="0.8" opacity="0.4" />
        <line x1="57" y1="50" x2="70" y2="50" stroke="#B8A89A" strokeWidth="0.8" opacity="0.4" />

        {/* Page curl effect */}
        <path
          d="M 68 25 Q 72 50 68 75"
          fill="none"
          stroke="#7E7065"
          strokeWidth="0.8"
          opacity="0.2"
        />
      </g>
    </svg>
  )
}