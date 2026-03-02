import React from 'react';
import { Slide, FlexBox, Box, Text, Heading } from 'spectacle';


/**
 * Title slide with MIRA template - use for first slide of each deck
 * Uses logo-aflokat.png and logo-mira.png from public/
 */
export function MiraTitleSlide({ title, subtitle, presenter, date, children, ...props }) {
  return (
    <Slide backgroundColor="#f7fafc" {...props}>
      <Box position="relative" width="100%" height="100%" overflow="hidden">
        {/* AFLOKKAT logo - top left */}
        <Box position="absolute" top={24} left={32} zIndex={2}>
          <img src="/logo-aflokat.png" alt="AFLOKKAT" style={{ height: 96 }} />
        </Box>
        <FlexBox
          position="relative"
          zIndex={2}
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          paddingLeft="5%"
          paddingRight="15%"
          height="100%"
        >
          <Text color="#00a3a3" fontSize="4rem" fontWeight="bold" marginBottom={16}>
            {title || children || 'Titre'}
          </Text>
          {subtitle && (
            <Text color="#4a5568" fontSize="2rem" marginBottom={8}>
              {subtitle}
            </Text>
          )}
          {(presenter || date) && (
            <Text color="#4a5568" fontSize="1.5rem">
              {[presenter, date].filter(Boolean).join(' • ')}
            </Text>
          )}
        </FlexBox>
        {/* MIRA logo - bottom left */}
        <Box position="absolute" bottom={16} left={32} zIndex={2}>
          <img src="/logo-mira.png" alt="MIRA" style={{ height: 128 }} />
        </Box>
      </Box>
    </Slide>
  );
}

/**
 * Content slide with wave decoration.
 * Heading is always left-aligned; body is centered when centered=true.
 * @param {string|React.ReactNode} heading - Required. String uses default Heading style, or pass custom (e.g. <MiraTitle>)
 * @param {boolean} centered - When true, centers body content (heading stays left)
 * @param {boolean} fullWidth - When true, uses minimal horizontal padding for max content width
 */
export function MiraContentSlide({ heading, children, centered = false, fullWidth = false, headingFontSize, ...props }) {
  const headingEl = typeof heading === 'string' ? (
    <Heading color="#00a3a3" marginBottom={16}>{heading}</Heading>
  ) : (
    <Box alignSelf="flex-start" width="100%">{heading}</Box>
  );

  const padding = fullWidth ? { left: 16, right: 48 } : { left: 64, right: 64 };

  return (
    <Slide backgroundColor="white" {...props}>
      <Box position="relative" width="100%" height="100%">
        <FlexBox
          position="relative"
          zIndex={1}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding={`0px ${padding.right}px 0px ${padding.left}px`}
          height="100%"
        >
          {headingEl}
          <FlexBox
            flex={1}
            width="100%"
            flexDirection="column"
            alignItems={centered ? 'center' : 'flex-start'}
            justifyContent={centered ? 'center' : 'flex-start'}
            style={centered ? { textAlign: 'center' } : undefined}
          >
            {children}
          </FlexBox>
        </FlexBox>
        <Box position="absolute" bottom={24} right={48} zIndex={2}>
          <img src="/logo-mira.png" alt="MIRA" style={{ height: 32 }} />
        </Box>
      </Box>
    </Slide>
  );
}
