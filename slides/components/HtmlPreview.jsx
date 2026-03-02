import React, { useMemo } from 'react';
import { Box } from 'spectacle';

/**
 * Renders HTML (and optional CSS) in a live preview iframe.
 * Perfect for HTML/CSS course - students see the actual execution.
 */
export function HtmlPreview({ html, css = '', title = 'Preview', height }) {
  const iframeContent = useMemo(() => {
    const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      margin: 12px; 
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
    }
    ${css}
  </style>
</head>
<body>
${html}
</body>
</html>`;
    return fullHtml;
  }, [html, css, title]);

  const fillHeight = height === '100%';
  return (
    <Box
      width="100%"
      flex={fillHeight ? 1 : undefined}
      minHeight={fillHeight ? 0 : undefined}
      height={fillHeight ? undefined : (height ?? 280)}
      style={{
        border: '2px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
    >
      <iframe
        srcDoc={iframeContent}
        title={title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        sandbox="allow-scripts"
      />
    </Box>
  );
}
