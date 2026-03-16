import React, { useContext } from 'react';
import { FlexBox, Box, CodePane, Notes, codePaneThemes, DeckContext } from 'spectacle';
import { MiraContentSlide } from './MiraSlide';
import { HtmlPreview } from './HtmlPreview';

const WRAP_STYLE = (
  <style>{`.mira-code-wrap pre, .mira-code-wrap code { white-space: pre-wrap !important; word-break: break-word; }`}</style>
);

const defaultCodePaneProps = {
  showLineNumbers: false,
};

/** Merge fontSize into CodePane theme (Record<string, CSSProperties>). */
function themeWithFontSize(baseTheme, fontSize) {
  if (!baseTheme || fontSize == null) return baseTheme;
  const result = {};
  for (const [key, style] of Object.entries(baseTheme)) {
    result[key] = { ...style, fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize };
  }
  return result;
}

/** Reduce font size when code is long to prevent overflow. Uses theme.fontSizes.codePane / codePaneCompact. */
const LONG_CODE_CHARS = 450;
const LONG_CODE_LINES = 14;
const DEFAULT_CODE_PANE_FONT_SIZE = 20;
const DEFAULT_CODE_PANE_COMPACT_FONT_SIZE = 15;

function getFontSizeForCode(code, explicitFontSize, theme) {
  if (explicitFontSize != null) return explicitFontSize;
  const defaultSize = theme?.fontSizes?.codePane ?? DEFAULT_CODE_PANE_FONT_SIZE;
  const compactSize = theme?.fontSizes?.codePaneCompact ?? DEFAULT_CODE_PANE_COMPACT_FONT_SIZE;
  if (!code || typeof code !== 'string') return defaultSize;
  const lines = code.split('\n').length;
  const isLong = code.length > LONG_CODE_CHARS || lines > LONG_CODE_LINES;
  return isLong ? compactSize : defaultSize;
}

/**
 * Standard CodePane with word-wrap (no horizontal overflow) and oneLight theme.
 * Use inside CodeSlide, CodeAndPreviewSlide, or any custom layout.
 * fontSize is merged into the theme (theme prop accepts Record<string, CSSProperties>).
 */
export function MiraCodePane({
  children,
  language = 'html',
  theme = codePaneThemes.oneLight,
  showLineNumbers = false,
  fontSize = 20,
  wrapLines = true,
  ...props
}) {
  const themeWithSize = themeWithFontSize(theme, fontSize);
  return (
    <Box className="mira-code-wrap" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {wrapLines && WRAP_STYLE}
      <CodePane
        language={language}
        theme={themeWithSize}
        showLineNumbers={showLineNumbers}
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
  const deckContext = useContext(DeckContext);
  const computedFontSize = getFontSizeForCode(code, fontSize, deckContext?.theme);
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
  script = '',
  title = 'Preview',
  children,
  notes,
  ...slideProps
}) {
  return (
    <MiraContentSlide heading={heading} fullWidth {...slideProps}>
      <Box flex={1} minHeight={0} display="flex" flexDirection="column" width="100%" height="100%" >
        <HtmlPreview html={html} css={css} script={script} title={title} height="100%" />
      </Box>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}

/**
 * Slide with two code snippets side by side.
 * Use when showing two files (e.g. HTML + JavaScript) together.
 */
export function TwinCodeSlide({
  heading,
  leftCode,
  rightCode,
  leftLanguage = 'html',
  rightLanguage = 'javascript',
  leftLabel,
  rightLabel,
  showLineNumbers = false,
  fontSize = 16,
  gap = 12,
  notes,
  children,
  ...slideProps
}) {
  const paneProps = {
    ...defaultCodePaneProps,
    showLineNumbers,
    fontSize,
  };

  return (
    <MiraContentSlide heading={heading} fullWidth {...slideProps}>
      <FlexBox flex={1} width="100%" minHeight={0} gap={gap} alignItems="stretch">
        <Box flex={1} minWidth={0} minHeight={0} overflow="auto" display="flex" flexDirection="column">
          {leftLabel && (
            <Box paddingBottom={4} fontSize="0.9rem" color="#64748b" fontWeight={600}>
              {leftLabel}
            </Box>
          )}
          <MiraCodePane language={leftLanguage} {...paneProps}>
            {leftCode}
          </MiraCodePane>
        </Box>
        <Box flex={1} minWidth={0} minHeight={0} overflow="auto" display="flex" flexDirection="column">
          {rightLabel && (
            <Box paddingBottom={4} fontSize="0.9rem" color="#64748b" fontWeight={600}>
              {rightLabel}
            </Box>
          )}
          <MiraCodePane language={rightLanguage} {...paneProps}>
            {rightCode}
          </MiraCodePane>
        </Box>
      </FlexBox>
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
    script = '',
    title = 'Preview',
  } = typeof preview === 'string' ? { html: preview } : preview;

  const deckContext = useContext(DeckContext);
  const effectiveFontSize =
    fontSize ?? codePaneProps.fontSize ?? getFontSizeForCode(code, undefined, deckContext?.theme);
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
        <Box flex="1 1 0" minWidth={0} overflow="auto" minHeight={0}>
          <MiraCodePane language={language} {...paneProps}>
            {code}
          </MiraCodePane>
        </Box>
        <Box flex={1} minWidth={0} minHeight={0} display="flex" flexDirection="column">
          <HtmlPreview html={html} css={css} script={script} title={title} height="100%" />
        </Box>
      </FlexBox>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}

/**
 * Slide with code on the left, live preview and console snippet on the right.
 * Use for [DÉMO] slides: code + preview + bloc « À taper dans la console ».
 */
export function CodePreviewConsoleSlide({
  heading,
  code,
  preview = {},
  consoleSnippet = '',
  language = 'javascript',
  showLineNumbers = false,
  fontSize,
  gap = 12,
  notes,
  headingFontSize,
  children,
  ...slideProps
}) {
  const {
    html,
    css = '',
    script = '',
    title = 'Preview',
  } = typeof preview === 'string' ? { html: preview } : preview;

  const deckContext = useContext(DeckContext);
  const effectiveFontSize =
    fontSize ?? getFontSizeForCode(code, undefined, deckContext?.theme);
  const paneProps = {
    ...defaultCodePaneProps,
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
        <Box flex={1} minWidth={0} minHeight={0} display="flex" flexDirection="column" gap={gap}>
          <Box flex={1} minHeight={0} display="flex" flexDirection="column">
            <HtmlPreview html={html} css={css} script={script} title={title} height="100%" />
          </Box>
          {consoleSnippet && (
            <FlexBox minHeight={0} display="flex" flexDirection="column">
              <Box paddingBottom={4} fontSize="0.9rem" color="#64748b" fontWeight={600}>
                À taper dans la console
              </Box>
              <MiraCodePane language="javascript" fontSize={14} showLineNumbers={false}>
                {consoleSnippet}
              </MiraCodePane>
            </FlexBox>
          )}
        </Box>
      </FlexBox>
      {children}
      {notes && <Notes>{notes}</Notes>}
    </MiraContentSlide>
  );
}
