import React from 'react';
import { FlexBox, Box, CodePane, Notes, codePaneThemes } from 'spectacle';
import { MiraContentSlide } from './MiraSlide';
import { HtmlPreview } from './HtmlPreview';

const WRAP_STYLE = (
  <style>{`.mira-code-wrap pre, .mira-code-wrap code { white-space: pre-wrap !important; word-break: break-word; }`}</style>
);

const defaultCodePaneProps = {
  theme: codePaneThemes.oneLight,
  showLineNumbers: false,
  fontSize: 13,
};

/** Reduce font size when code is long to prevent overflow. */
const LONG_CODE_CHARS = 450;
const LONG_CODE_LINES = 14;
const COMPACT_FONT_SIZE = 11;

function getFontSizeForCode(code, explicitFontSize) {
  if (explicitFontSize != null) return explicitFontSize;
  if (!code || typeof code !== 'string') return defaultCodePaneProps.fontSize;
  const lines = code.split('\n').length;
  const isLong = code.length > LONG_CODE_CHARS || lines > LONG_CODE_LINES;
  return isLong ? COMPACT_FONT_SIZE : defaultCodePaneProps.fontSize;
}

/**
 * Standard CodePane with word-wrap (no horizontal overflow) and oneLight theme.
 * Use inside CodeSlide, CodeAndPreviewSlide, or any custom layout.
 */
export function MiraCodePane({
  children,
  language = 'html',
  theme = codePaneThemes.oneLight,
  showLineNumbers = false,
  fontSize = 13,
  wrapLines = true,
  ...props
}) {
  return (
    <Box className="mira-code-wrap" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {wrapLines && WRAP_STYLE}
      <CodePane
        language={language}
        theme={theme}
        showLineNumbers={showLineNumbers}
        fontSize={fontSize}
        {...props}
      >
        {children}
      </CodePane>
    </Box>
  );
}

/**
 * Slide with code only (standard layout).
 * Use when the slide shows only code, no live preview.
 */
export function CodeSlide({
  heading,
  code,
  language = 'html',
  showLineNumbers = false,
  fontSize,
  children,
  notes,
  ...slideProps
}) {
  const computedFontSize = getFontSizeForCode(code, fontSize);
  const codeProps = { ...defaultCodePaneProps, showLineNumbers, fontSize: computedFontSize };

  return (
    <MiraContentSlide heading={heading} {...slideProps}>
      <MiraCodePane language={language} {...codeProps}>
        {code}
      </MiraCodePane>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}

/**
 * Slide with HTML/CSS preview only (no code).
 * Use when the slide shows only the live preview.
 */
export function PreviewSlide({
  heading,
  html,
  css = '',
  title = 'Preview',
  children,
  notes,
  ...slideProps
}) {
  return (
    <MiraContentSlide heading={heading} fullWidth {...slideProps}>
      <Box flex={1} minHeight={0} display="flex" flexDirection="column" width="100%">
        <HtmlPreview html={html} css={css} title={title} height="100%" />
      </Box>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}

/**
 * Slide with code on the left, live preview on the right.
 * Use when both code and preview are shown side by side.
 */
export function CodeAndPreviewSlide({
  heading,
  code,
  preview = {},
  language = 'html',
  showLineNumbers = false,
  fontSize,
  codePaneProps = {},
  gap = 12,
  notes,
  headingFontSize,
  children,
  ...slideProps
}) {
  const {
    html,
    css = '',
    title = 'Preview',
  } = typeof preview === 'string' ? { html: preview } : preview;

  const effectiveFontSize =
    fontSize ?? codePaneProps.fontSize ?? getFontSizeForCode(code, undefined);
  const paneProps = {
    ...defaultCodePaneProps,
    ...codePaneProps,
    showLineNumbers,
    fontSize: effectiveFontSize,
  };

  return (
    <MiraContentSlide
      heading={heading}
      fullWidth
      headingFontSize={headingFontSize}
      {...slideProps}
    >
      <FlexBox flex={1} width="100%" minHeight={0} gap={gap} alignItems="stretch">
        <Box flex="1 1 0" minWidth={0} maxWidth="50%" overflow="auto" minHeight={0}>
          <MiraCodePane language={language} {...paneProps}>
            {code}
          </MiraCodePane>
        </Box>
        <Box flex={1} minWidth={0} minHeight={0} display="flex" flexDirection="column">
          <HtmlPreview html={html} css={css} title={title} height="100%" />
        </Box>
      </FlexBox>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}
