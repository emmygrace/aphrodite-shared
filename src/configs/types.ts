/**
 * Type definitions for visual and glyph configurations.
 * These types are shared across all Aphrodite platforms.
 */

export type SignIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type PlanetIndex = number;

/**
 * Visual styling configuration for chart elements
 */
export interface VisualConfig {
  ringWidth?: number;
  ringSpacing?: number;
  signColors?: string[];
  houseColors?: string[];
  planetColors?: string[];
  aspectColors?: Record<string, string>;
  aspectStrokeWidth?: number;
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * Configuration for glyphs (symbols) used in the chart
 */
export interface GlyphConfig {
  signGlyphs?: Partial<Record<SignIndex, string>>;
  planetGlyphs?: Record<PlanetIndex, string>;
  aspectGlyphs?: Record<string, string>;
  glyphSize?: number;
  glyphFont?: string;
}

