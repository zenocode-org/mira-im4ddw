import React from 'react';
import { FlexBox, Box, Text } from 'spectacle';
import { CornerPattern } from './decorations';

/**
 * MIRA template - Title slide layout
 */
export function TitleSlideTemplate({ children, slideNumber, numberOfSlides }) {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      {/* Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="background"
        zIndex={0}
      />
      {/* AFLOKKAT logo - top left */}
      <Box position="absolute" top={24} left={32} zIndex={2}>
        <AflokkatLogo />
      </Box>
      {/* Main content */}
      <FlexBox
        position="relative"
        zIndex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        paddingLeft="5%"
        paddingRight="15%"
        height="100%"
      >
        {children}
      </FlexBox>
      {/* MIRA logo - bottom left */}
      <Box position="absolute" bottom={32} left={32} zIndex={2}>
        <MiraLogo color="#2d3748" size={48} />
      </Box>
    </Box>
  );
}

/**
 * MIRA template - Content slide with wave (top-left wave variant)
 */
export function ContentSlideTemplate({ children, slideNumber, numberOfSlides }) {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      {/* White content area */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="white"
        zIndex={0}
      />
      {/* Slide number - top right */}
      <Box position="absolute" top={24} right={48} zIndex={2}>
        <Text fontSize={16} color="#2d3748" fontWeight={500}>
          {slideNumber} / {numberOfSlides}
        </Text>
      </Box>
      {/* Main content */}
      <FlexBox
        position="relative"
        zIndex={1}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        padding="48px 64px 80px 64px"
        height="100%"
      >
        {children}
      </FlexBox>
      {/* MIRA logo - bottom right */}
      <Box position="absolute" bottom={24} right={48} zIndex={2}>
        <MiraLogo color="#00a3a3" size={32} />
      </Box>
    </Box>
  );
}

/**
 * MIRA template - Content slide with corner pattern (bottom-left variant)
 */
export function ContentSlideCornerTemplate({ children, slideNumber, numberOfSlides }) {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      {/* White content area */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="white"
        zIndex={0}
      />
      {/* Bottom-left corner pattern */}
      <CornerPattern />
      {/* Slide number - top right */}
      <Box position="absolute" top={24} right={48} zIndex={2}>
        <Text fontSize={16} color="#2d3748" fontWeight={500}>
          {slideNumber} / {numberOfSlides}
        </Text>
      </Box>
      {/* Main content */}
      <FlexBox
        position="relative"
        zIndex={1}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        padding="48px 64px 80px 64px"
        height="100%"
      >
        {children}
      </FlexBox>
      {/* MIRA logo - bottom left in corner */}
      <Box position="absolute" bottom={24} left={48} zIndex={2}>
        <MiraLogo color="#2d3748" size={32} />
      </Box>
    </Box>
  );
}
