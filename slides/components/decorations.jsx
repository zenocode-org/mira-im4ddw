import React from 'react';
import { Box } from 'spectacle';

const TEAL = '#00a3a3';
const DARK_GRAY = '#2d3748';
const WAVE_TEAL = '#1FA3B2';
const WAVE_CHARCOAL = '#3E4042';
const WAVE_OFF_WHITE = '#EEEEEE';
const WAVE_TOP_BAR = '#2C2E2F';

/**
 * Hexagonal geometric pattern for title slide (top right)
 */
export function HexagonPattern() {
  return (
    <Box
      position="absolute"
      top={-50}
      right={-50}
      width="45%"
      height="60%"
      zIndex={1}
      overflow="hidden"
    >
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              fill="none"
              stroke={TEAL}
              strokeWidth="2"
              opacity="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
        <rect
          x="50"
          y="50"
          width="120"
          height="80"
          fill={TEAL}
          opacity="0.4"
          transform="rotate(15 110 90)"
        />
        <rect
          x="180"
          y="100"
          width="100"
          height="60"
          fill={DARK_GRAY}
          opacity="0.3"
          transform="rotate(-10 230 130)"
        />
        <polygon
          points="280,80 340,110 320,180 260,150"
          fill={TEAL}
          opacity="0.5"
        />
      </svg>
    </Box>
  );
}


/**
 * Angular corner pattern for content slide (bottom left)
 */
export function CornerPattern() {
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      width="40%"
      height="50%"
      zIndex={1}
    >
      <svg width="100%" height="100%" viewBox="0 0 300 400">
        <polygon
          points="0,400 0,200 150,400"
          fill={TEAL}
          opacity="0.7"
        />
        <polygon
          points="0,350 0,280 100,400 0,400"
          fill={TEAL}
          opacity="0.4"
        />
        <polygon
          points="50,400 150,250 200,400"
          fill={DARK_GRAY}
          opacity="0.3"
        />
      </svg>
    </Box>
  );
}
