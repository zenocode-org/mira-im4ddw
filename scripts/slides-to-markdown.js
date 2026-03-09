#!/usr/bin/env node
/**
 * Converts MIRA Spectacle slides (JSX) to Markdown.
 *
 * Usage:
 *   node scripts/slides-to-markdown.js slides/seance-01/cours-html-css.jsx
 *   node scripts/slides-to-markdown.js slides/seance-01/cours-html-css.jsx -o output.md -d seance-01-html-css
 *
 * Options:
 *   -o <file>         Output file path
 *   -d, --deck <key>  Deck key for slide links (makes headings clickable)
 *   --base-url <url>  Base URL for links (default: https://zenocode-org.github.io/mira-im4ddw/)
 *
 * Supports: MiraTitleSlide, MiraContentSlide, CodeSlide, CodeAndPreviewSlide, PreviewSlide
 */

import { readFileSync, writeFileSync } from 'fs';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import path from 'path';

const SLIDE_COMPONENTS = new Set([
  'MiraTitleSlide',
  'MiraContentSlide',
  'CodeSlide',
  'CodeAndPreviewSlide',
  'PreviewSlide',
]);

function getStringProp(node, name) {
  if (!node?.attributes) return null;
  const attr = node.attributes.find(
    (a) => a.type === 'JSXAttribute' && a.name?.name === name
  );
  if (!attr?.value) return null;
  if (attr.value.type === 'StringLiteral') return attr.value.value;
  if (attr.value.type === 'JSXExpressionContainer') {
    const expr = attr.value.expression;
    if (expr?.type === 'StringLiteral') return expr.value;
    if (expr?.type === 'TemplateLiteral' && expr.quasis?.length)
      return expr.quasis.map((q) => q.value.raw).join('');
  }
  return null;
}

function getTemplateLiteralProp(node, name) {
  if (!node?.attributes) return null;
  const attr = node.attributes.find(
    (a) => a.type === 'JSXAttribute' && a.name?.name === name
  );
  if (!attr?.value?.expression) return null;
  const expr = attr.value.expression;
  if (expr.type === 'TemplateLiteral') {
    return expr.quasis.map((q) => q.value.raw).join('');
  }
  return null;
}

function getObjectProp(node, name) {
  if (!node?.attributes) return null;
  const attr = node.attributes.find(
    (a) => a.type === 'JSXAttribute' && a.name?.name === name
  );
  if (!attr?.value?.expression?.properties) return null;
  const obj = attr.value.expression;
  const result = {};
  for (const prop of obj.properties) {
    if (prop.type === 'ObjectProperty' && prop.key?.name) {
      const key = prop.key.name;
      if (prop.value?.type === 'StringLiteral') result[key] = prop.value.value;
      else if (prop.value?.type === 'TemplateLiteral')
        result[key] = prop.value.quasis.map((q) => q.value.raw).join('');
    }
  }
  return result;
}

function jsxChildrenToMarkdown(children) {
  if (!children?.length) return '';
  const parts = [];

  for (const child of children) {
    if (child.type === 'JSXText') {
      const t = child.value.trim();
      if (t) parts.push(t);
      continue;
    }
    if (child.type === 'JSXExpressionContainer') {
      const expr = child.expression;
      if (expr?.type === 'JSXEmptyExpression') continue;
      if (expr?.type === 'StringLiteral') parts.push(expr.value);
      continue;
    }
    if (child.type !== 'JSXElement') continue;

    const name = child.openingElement.name?.name;
    const inner = jsxChildrenToMarkdown(child.children);

    if (name === 'strong') parts.push(`**${inner}**`);
    else if (name === 'em') parts.push(`*${inner}*`);
    else if (name === 'code') parts.push('`' + inner + '`');
    else if (name === 'a') {
      const href =
        child.openingElement.attributes?.find(
          (a) => a.type === 'JSXAttribute' && a.name?.name === 'href'
        )?.value?.value ?? '#';
      parts.push(`[${inner}](${href})`);
    } else if (name === 'ListItem') parts.push(`- ${inner}`);
    else if (name === 'Text' || name === 'Box') parts.push(inner);
    else if (name === 'UnorderedList') {
      const items = child.children
        .filter((c) => c.type === 'JSXElement' && c.openingElement?.name?.name === 'ListItem')
        .map((c) => jsxChildrenToMarkdown(c.children).trim())
        .filter(Boolean)
        .map((item) => `- ${item}`);
      parts.push(items.join('\n'));
    } else if (name === 'OrderedList') {
      const items = child.children
        .filter((c) => c.type === 'JSXElement' && c.openingElement?.name?.name === 'ListItem')
        .map((c) => jsxChildrenToMarkdown(c.children).trim())
        .filter(Boolean);
      parts.push(items.map((item, i) => `${i + 1}. ${item}`).join('\n'));
    } else if (name === 'MiraCodePane') {
      const code = getTemplateLiteralFromChildren(child.children);
      if (code) parts.push('\n```\n' + code.trim() + '\n```\n');
    } else if (name === 'Notes') {
      const note = jsxChildrenToMarkdown(child.children).trim();
      if (note) parts.push(`\n> *Note :* ${note}\n`);
    } else {
      parts.push(inner);
    }
  }

  return parts.join(' ');
}

function getTemplateLiteralFromChildren(children) {
  if (!children?.length) return null;
  for (const child of children) {
    if (child.type === 'JSXExpressionContainer') {
      const expr = child.expression;
      if (expr?.type === 'TemplateLiteral')
        return expr.quasis.map((q) => q.value.raw).join('');
    }
  }
  return null;
}

function extractContentSlideChildren(children) {
  const blocks = [];
  let currentList = null;

  for (const child of children) {
    if (child.type === 'JSXText') {
      const t = child.value.trim();
      if (t) blocks.push({ type: 'text', content: t });
      continue;
    }
    if (child.type !== 'JSXElement') continue;

    const name = child.openingElement.name?.name;
    const inner = jsxChildrenToMarkdown(child.children);

    if (name === 'Text' || name === 'Box') {
      const content = inner.trim();
      if (content) {
        const isBold = child.openingElement.attributes?.some(
          (a) => a.type === 'JSXAttribute' && a.name?.name === 'fontWeight'
        );
        blocks.push({ type: 'text', content: isBold ? `**${content}**` : content });
      }
    } else if (name === 'UnorderedList') {
      const items = child.children
        .filter((c) => c.type === 'JSXElement' && c.openingElement?.name?.name === 'ListItem')
        .map((c) => jsxChildrenToMarkdown(c.children).trim())
        .filter(Boolean);
      blocks.push({ type: 'ul', items });
    } else if (name === 'OrderedList') {
      const items = child.children
        .filter((c) => c.type === 'JSXElement' && c.openingElement?.name?.name === 'ListItem')
        .map((c) => jsxChildrenToMarkdown(c.children).trim())
        .filter(Boolean);
      blocks.push({ type: 'ol', items });
    } else if (name === 'MiraCodePane') {
      const code = getTemplateLiteralFromChildren(child.children);
      const lang = child.openingElement.attributes?.find(
        (a) => a.type === 'JSXAttribute' && a.name?.name === 'language'
      )?.value?.value ?? '';
      if (code) blocks.push({ type: 'code', content: code, language: lang });
    } else if (name === 'Notes') {
      const note = inner.trim();
      if (note) blocks.push({ type: 'note', content: note });
    } else if (name === 'a') {
      const href =
        child.openingElement.attributes?.find(
          (a) => a.type === 'JSXAttribute' && a.name?.name === 'href'
        )?.value?.value ?? '#';
      blocks.push({ type: 'text', content: `[${inner}](${href})` });
    }
  }

  return blocks;
}

function blocksToMarkdown(blocks) {
  return blocks
    .filter((b) => b.type !== 'note')
    .map((b) => {
      if (b.type === 'text') return b.content;
      if (b.type === 'ul') return b.items.map((i) => `- ${i}`).join('\n');
      if (b.type === 'ol') return b.items.map((i, idx) => `${idx + 1}. ${i}`).join('\n');
      if (b.type === 'code') return '\n```' + (b.language || '') + '\n' + b.content.trim() + '\n```\n';
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

function escapeMdHeading(s) {
  if (!s) return '';
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'");
}

function slideToMarkdown(slide, index, options = {}) {
  const { type, title, subtitle, date, heading, code, html, language, notes, blocks, preview } = slide;
  const lines = [];
  const { baseUrl, deck } = options;
  const slideIndex = index - 1; // 0-based for URL
  const slideLink =
    deck && baseUrl
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}deck=${deck}&slideIndex=${slideIndex}&stepIndex=0`
      : null;

  const formatHeading = (level, text) => {
    const content = `${index}. ${text}`;
    return slideLink ? `#${'#'.repeat(level)} [${content}](${slideLink})` : `#${'#'.repeat(level)} ${content}`;
  };

  if (type === 'MiraTitleSlide') {
    lines.push(formatHeading(0, escapeMdHeading(title || 'Sans titre')));
    if (subtitle) lines.push(`\n*${escapeMdHeading(subtitle)}*`);
    if (date) lines.push(`\n${date}`);
  } else if (type === 'MiraContentSlide') {
    lines.push(formatHeading(1, escapeMdHeading(heading || 'Sans titre')));
    if (blocks?.length) lines.push('\n' + blocksToMarkdown(blocks));
  } else if (type === 'CodeSlide') {
    lines.push(formatHeading(1, escapeMdHeading(heading || 'Code')));
    if (code) lines.push('\n```' + (language || '') + '\n' + code.trim() + '\n```');
  } else if (type === 'CodeAndPreviewSlide') {
    lines.push(formatHeading(1, escapeMdHeading(heading || 'Code + Aperçu')));
    if (code) lines.push('\n```' + (language || '') + '\n' + code.trim() + '\n```');
    if (preview?.html) lines.push('\n*Prévisualisation HTML incluse dans la présentation.*');
    if (blocks?.length) lines.push('\n' + blocksToMarkdown(blocks));
  } else if (type === 'PreviewSlide') {
    lines.push(formatHeading(1, escapeMdHeading(heading || 'Aperçu')));
    if (html) lines.push('\n*Prévisualisation HTML incluse dans la présentation.*');
  }

  return lines.join('\n');
}

function convertJsxToMarkdown(source, options = {}) {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const slides = [];

  traverse.default(ast, {
    JSXElement(path) {
      const name = path.node.openingElement?.name?.name;
      if (!SLIDE_COMPONENTS.has(name)) return;

      const slide = { type: name };

      if (name === 'MiraTitleSlide') {
        slide.title = getStringProp(path.node.openingElement, 'title');
        slide.subtitle = getStringProp(path.node.openingElement, 'subtitle');
        slide.date = getStringProp(path.node.openingElement, 'date');
        for (const child of path.node.children) {
          if (child.type === 'JSXElement' && child.openingElement?.name?.name === 'Notes')
            slide.notes = jsxChildrenToMarkdown(child.children).trim();
        }
      } else if (name === 'MiraContentSlide') {
        slide.heading = getStringProp(path.node.openingElement, 'heading');
        slide.blocks = extractContentSlideChildren(path.node.children);
      } else if (name === 'CodeSlide') {
        slide.heading = getStringProp(path.node.openingElement, 'heading');
        slide.code = getTemplateLiteralProp(path.node.openingElement, 'code');
        slide.language = getStringProp(path.node.openingElement, 'language') || 'html';
        for (const child of path.node.children) {
          if (child.type === 'JSXElement' && child.openingElement?.name?.name === 'Notes')
            slide.notes = jsxChildrenToMarkdown(child.children).trim();
        }
      } else if (name === 'CodeAndPreviewSlide') {
        slide.heading = getStringProp(path.node.openingElement, 'heading');
        slide.code = getTemplateLiteralProp(path.node.openingElement, 'code');
        slide.preview = getObjectProp(path.node.openingElement, 'preview');
        slide.language = getStringProp(path.node.openingElement, 'language') || 'html';
        slide.blocks = extractContentSlideChildren(path.node.children);
        for (const child of path.node.children) {
          if (child.type === 'JSXElement' && child.openingElement?.name?.name === 'Notes')
            slide.notes = jsxChildrenToMarkdown(child.children).trim();
        }
      } else if (name === 'PreviewSlide') {
        slide.heading = getStringProp(path.node.openingElement, 'heading');
        slide.html = getTemplateLiteralProp(path.node.openingElement, 'html');
        for (const child of path.node.children) {
          if (child.type === 'JSXElement' && child.openingElement?.name?.name === 'Notes')
            slide.notes = jsxChildrenToMarkdown(child.children).trim();
        }
      }

      slides.push(slide);
    },
  });

  return slides.map((s, i) => slideToMarkdown(s, i + 1, options)).join('\n\n---\n\n');
}

const DEFAULT_BASE_URL = 'https://zenocode-org.github.io/mira-im4ddw/';

function main() {
  const args = process.argv.slice(2);
  const positionals = [];
  let outputPath = null;
  let deck = null;
  let baseUrl = DEFAULT_BASE_URL;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-o' && args[i + 1]) {
      outputPath = args[++i];
    } else if ((args[i] === '-d' || args[i] === '--deck') && args[i + 1]) {
      deck = args[++i];
    } else if (args[i] === '--base-url' && args[i + 1]) {
      baseUrl = args[++i];
    } else if (!args[i].startsWith('-')) {
      positionals.push(args[i]);
    }
  }

  const inputPath = positionals[0] || null;

  if (!inputPath) {
    console.error(`Usage: node scripts/slides-to-markdown.js <input.jsx> [-o output.md] [-d deck-key]
  -d, --deck <key>   Deck key for slide links (e.g. seance-01-html-css)
  --base-url <url>   Base URL (default: ${DEFAULT_BASE_URL})`);
    process.exit(1);
  }

  const inputFile = path.isAbsolute(inputPath)
    ? inputPath
    : path.join(process.cwd(), inputPath);

  let source;
  try {
    source = readFileSync(inputFile, 'utf-8');
  } catch (e) {
    console.error('Cannot read file:', inputFile, e.message);
    process.exit(1);
  }

  const options = {
    baseUrl: baseUrl.replace(/\/?$/, '/'),
    deck: deck || null,
  };

  const markdown = convertJsxToMarkdown(source, options);

  if (outputPath) {
    const outFile = path.isAbsolute(outputPath)
      ? outputPath
      : path.join(process.cwd(), outputPath);
    writeFileSync(outFile, markdown, 'utf-8');
    console.log('Written to', outFile);
  } else {
    console.log(markdown);
  }
}

main();
