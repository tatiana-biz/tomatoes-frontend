function TomatoLogo({ size = 28, className = '' }) {
  const ICON_SRC =
    'https://flamesimagestorage.blob.core.windows.net/files/3a9a996f-a983-40e2-b937-d302f1ed1991_1766444784464_prj_stpc6td2/b511e0ad-aba5-416f-9521-5c7b039c3213-blue-tomato.png'

  const radius = Math.round(size * 0.24)
  const pad = size * 0.14
  const iw = size - pad * 2
  const ih = size - pad * 2

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 1px 6px rgba(14,165,233,0.25))' }}
    >
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Gradient rounded tile */}
      <rect x="0" y="0" width={size} height={size} rx={radius} fill="url(#brandGrad)" />

      {/* White tomato icon centered with padding */}
      <image
        href={ICON_SRC}
        x={pad}
        y={pad}
        width={iw}
        height={ih}
        preserveAspectRatio="xMidYMid meet"
        crossOrigin="anonymous"
      />

      {/* Soft outline for contrast */}
      <rect
        x={0.5}
        y={0.5}
        width={size - 1}
        height={size - 1}
        rx={radius - 0.5}
        fill="none"
        stroke="white"
        strokeOpacity="0.28"
      />
    </svg>
  )
}

export default TomatoLogo
