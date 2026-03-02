import React from 'react';
import { FlexBox, Box, Text, FullScreen } from 'spectacle';

/**
 * MIRA deck template - Page number in bottom left, fullscreen control on the right
 */
export function MiraDeckTemplate({ slideNumber, numberOfSlides }) {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      width="100%"
      padding="0 1em 1em"
      zIndex={5}
    >
      <Box padding="0 1em">
        <Text fontSize={16} color="#2d3748" fontWeight={500}>
          {slideNumber} / {numberOfSlides}
        </Text>
      </Box>
      <Box padding="0 1em">
        <FullScreen color="#2d3748" />
      </Box>
    </FlexBox>
  );
}
