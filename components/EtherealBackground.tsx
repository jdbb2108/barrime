"use client";

export default function EtherealBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="ethereal-shadow-filter">
            <feTurbulence
              result="noise"
              type="fractalNoise"
              baseFrequency="0.006 0.014"
              numOctaves="2"
              seed="8"
            >
              <animate
                attributeName="baseFrequency"
                dur="22s"
                repeatCount="indefinite"
                values="0.006 0.014;0.011 0.008;0.006 0.014"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="42" />
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
      </svg>

      <div className="ethereal-field" />
      <div className="ethereal-grain" />
      <div className="ethereal-vignette" />
    </div>
  );
}
