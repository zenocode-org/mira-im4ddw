import React from 'react';
import { Box, Text, FullScreen } from 'spectacle';

/**
 * MIRA deck template - Page number in top right, fullscreen control on the bottom right
 */
export function MiraDeckTemplate({ slideNumber, numberOfSlides }) {
  return (
    <>
      {/* Page number - top right */}
      <Box position="absolute" top={24} right={48} zIndex={5}>
        <Text fontSize={16} color="#2d3748" fontWeight={500}>
          {slideNumber} / {numberOfSlides}
        </Text>
      </Box>
      {/* Fullscreen control - bottom right */}
      <Box position="absolute" bottom={24} right={48} zIndex={5}>
        <FullScreen color="#2d3748" />
      </Box>
    </>
  );
}
