import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const sourceRoot = join(__dirname, '../..');
const stylesheet = readFileSync(join(sourceRoot, 'global.css'), 'utf8');

function themeBlock(theme: string): string {
  const block = stylesheet.match(
    new RegExp(`@variant ${theme}\\s*\\{\\s*:root\\s*\\{([^}]+)\\}`),
  );
  if (!block) {
    throw new Error(`Missing ${theme} theme`);
  }
  return block[1];
}

function palette(theme: string): Record<string, string> {
  return Object.fromEntries(
    [
      ...themeBlock(theme).matchAll(/--color-([\w-]+-v2):\s*(#[\da-f]+);/gi),
    ].map(([, name, value]) => [name, value.toLowerCase()]),
  );
}

test('light theme shares white backgrounds and purple controls across legacy and v2 screens', () => {
  const colors = Object.fromEntries(
    [...themeBlock('light').matchAll(/--color-([\w-]+):\s*(#[\da-f]+);/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
  expect(colors.primary).toBe(colors['primary-v2']);
  expect(colors.background).toBe(colors['background-v2']);
  expect(colors.background).toBe('#ffffff');
  expect(colors.card).toBe('#ffffff');
  for (const foreground of [
    'text',
    'text-secondary',
    'text-muted',
    'secondary',
  ]) {
    expect(contrast(colors[foreground], colors.card)).toBeGreaterThanOrEqual(
      4.5,
    );
  }
  expect(
    contrast(colors['on-primary-v2'], colors.primary),
  ).toBeGreaterThanOrEqual(4.5);
});

test('light uses readable purple accent text and purple control fills', () => {
  const colors = Object.fromEntries(
    [...themeBlock('light').matchAll(/--color-([\w-]+):\s*(#[\da-f]+);/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
  expect(colors['primary-text']).toBe('#5b21b6');
  expect(colors['link-v2']).toBe(colors['primary-text']);
  expect(colors.secondary).toBe(colors['primary-text']);
  expect(colors.primary).toBe('#7c3aed');
  for (const surface of ['card', 'background', 'input-v2', 'selected-v2']) {
    expect(
      contrast(colors['primary-text'], colors[surface]),
    ).toBeGreaterThanOrEqual(4.5);
  }
  for (const utility of ['text-primary', 'text-primary-v2']) {
    expect(stylesheet).toMatch(
      new RegExp(
        `@utility ${utility}\\s*\\{\\s*color: var\\(--color-primary-text\\);`,
      ),
    );
  }
});

test.each(['sm', 'md', 'lg', 'xl'] as const)(
  '%s shadows use theme-aware elevation with subtle light shadows and unchanged dark shadows',
  size => {
    expect(stylesheet).toMatch(
      new RegExp(
        `@utility shadow-${size}\\s*\\{\\s*box-shadow: var\\(--elevation-${size}\\);`,
      ),
    );
    const shadow = (theme: string) => {
      const match = themeBlock(theme).match(
        new RegExp(`--elevation-${size}:\\s*([^;]+);`),
      );
      if (!match) throw new Error(`Missing ${theme} ${size} shadow`);
      return match[1];
    };
    const expectedDark = {
      sm: '0 1px 2px rgba(0, 0, 0, 0.12)',
      md: '0 4px 12px rgba(0, 0, 0, 0.18)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.24)',
      xl: '0 12px 40px rgba(0, 0, 0, 0.32)',
    };
    expect(shadow('dark')).toBe(expectedDark[size]);
    expect(shadow('ocean')).toBe(shadow('dark'));
    const alpha = Number(shadow('light').match(/,\s*([\d.]+)\)$/)?.[1]);
    expect(alpha).toBeGreaterThan(0);
    expect(alpha).toBeLessThanOrEqual(0.1);
  },
);

function contrast(first: string, second: string): number {
  const luminance = (hex: string) => {
    const channels = hex.slice(1).match(/../g);
    if (!channels || channels.length !== 3) {
      throw new Error(`Expected a six-digit hex color: ${hex}`);
    }
    return channels
      .map(channel => {
        const value = parseInt(channel, 16) / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      })
      .reduce(
        (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
        0,
      );
  };
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function componentSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return entry.name === '__tests__' ? [] : componentSources(path);
    }
    return entry.name.endsWith('.tsx') ? [readFileSync(path, 'utf8')] : [];
  });
}

test('uses purple in both light and dark modes with distinct backgrounds', () => {
  expect(palette('light')['primary-v2']).toBe('#7c3aed');
  expect(palette('dark')['primary-v2']).toBe('#7c3aed');
  expect(palette('light')['background-v2']).not.toBe(
    palette('dark')['background-v2'],
  );
});

test('keeps v2 colors in theme blocks, not the shared design-token block', () => {
  expect(stylesheet.split('@variant light')[0]).not.toMatch(
    /--color-[\w-]+-v2/,
  );
  expect(stylesheet).not.toMatch(/--color-(login|landing)-/);
});

test.each(['light', 'dark', 'ocean'])(
  '%s defines every v2 utility and variable referenced by components',
  theme => {
    const colors = palette(theme);
    expect(Object.keys(colors).sort()).toEqual(
      Object.keys(palette('dark')).sort(),
    );
    for (const source of componentSources(sourceRoot)) {
      expect(source).not.toMatch(
        /(?:--color-|(?:bg|text|border|accent)-)login-/,
      );
      for (const [, token] of source.matchAll(
        /(?:--color-|(?:bg|text|border|accent)-)([\w-]+-v2)\b/g,
      )) {
        expect(colors).toHaveProperty(token);
      }
    }
  },
);

test.each(['light', 'dark', 'ocean'])(
  '%s maintains readable text, links, selected cards, and primary buttons',
  theme => {
    const colors = palette(theme);
    for (const [foreground, background] of [
      ['on-primary-v2', 'primary-v2'],
      ['text-v2', 'background-v2'],
      ['text-muted-v2', 'surface-v2'],
      ['text-v2', 'selected-v2'],
      ['link-v2', 'surface-v2'],
      ['success-v2', 'surface-v2'],
      ['rose-v2', 'surface-v2'],
    ]) {
      expect(
        contrast(colors[foreground], colors[background]),
      ).toBeGreaterThanOrEqual(4.5);
    }
  },
);
