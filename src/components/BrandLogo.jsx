/*
  BrandLogo
  Uses the user-provided icon (raster) and removes its solid background via an SVG filter + mask.
  Then re-colors it with a cyan → blue gradient to match the site.
*/

const ICON_SRC =
  'https://flamesimagestorage.blob.core.windows.net/files/e8afcd02-b3dc-4aa3-a9dc-2d8ad9303e2e_1766424161657_prj_stpc6td2/45cbc5db-1a0e-4eb2-b7c4-6051e3a8ef76-tomato.jpeg'

function BrandLogo({ size = 28, className = '' }) {
  const w = size
  const h = size
  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Brand gradient to match website */}
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        {/* Gentle shine overlay */}
        <radialGradient id="brandShine" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Filter: create alpha from luminance, then invert to keep dark tomato */}
        <filter id="removeBg" colorInterpolationFilters="sRGB">
          <feColorMatrix type="luminanceToAlpha" />
          {/* invert alpha: light background → transparent, dark icon → opaque */}
          <feComponentTransfer>
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
        </filter>
        {/* Mask powered by filtered raster image */}
        <mask id="logoMask" maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <image
            href={ICON_SRC}
            x="0"
            y="0"
            width={w}
            height={h}
            preserveAspectRatio="xMidYMid slice"
            crossOrigin="anonymous"
            filter="url(#removeBg)"
          />
        </mask>
      </defs>

      {/* Apply the mask and recolor with brand gradient */}
      <g mask="url(#logoMask)">
        <rect x="0" y="0" width={w} height={h} fill="url(#brandGrad)" />
        <rect x="0" y="0" width={w} height={h} fill="url(#brandShine)" opacity="0.22" />
        {/* Soft outline for contrast on glassy nav */}
        <rect x="0" y="0" width={w} height={h} fill="none" stroke="white" strokeOpacity="0.25" />
      </g>
    </svg>
  )
}

export default BrandLogo
