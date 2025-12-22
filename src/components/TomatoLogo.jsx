function TomatoLogo({ size = 28, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Brand gradient (cyan → blue) */}
        <linearGradient id="tomatoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        {/* Soft inner shine */}
        <radialGradient id="shine" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.50)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Body (no background) */}
      <circle cx="12" cy="13" r="7" fill="url(#tomatoGrad)" stroke="white" strokeOpacity="0.28" strokeWidth="1.4" />

      {/* Crown / leaves */}
      <path
        d="M12 6.4c-1.4-.9-2.9-1.3-4.3-1.3 1.5-1.2 3.3-1.9 5.2-1.9s3.7.7 5.2 1.9c-1.4 0-2.9.4-4.3 1.3-.6.3-1.2.3-1.8 0z"
        fill="#60a5fa"
        opacity="0.95"
      />

      {/* Subtle highlight */}
      <path d="M8.8 12.2c1.6-1.1 3.2-1.1 4.6 0" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeLinecap="round" />

      {/* Inner shine overlay for premium feel */}
      <circle cx="12" cy="13" r="7" fill="url(#shine)" opacity="0.20" />
    </svg>
  )
}

export default TomatoLogo
