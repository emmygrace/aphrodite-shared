/**
 * Chart presets that combine wheel definitions with visual and glyph configurations.
 * These provide complete, ready-to-use chart styling configurations.
 */

import type { WheelDefinition } from '../wheels/types';
import type { VisualConfig, GlyphConfig } from '../configs/types';
import { standardNatalWheel } from '../wheels/definitions';
import { defaultVisualConfig, mergeVisualConfig } from '../configs/visual';
import { defaultGlyphConfig, mergeGlyphConfig } from '../configs/glyphs';

/**
 * A complete chart preset combining wheel, visual, and glyph configurations
 */
export interface ChartPreset {
  name: string;
  description?: string;
  wheel: WheelDefinition;
  visualConfig: VisualConfig;
  glyphConfig: GlyphConfig;
}

/**
 * Classic preset - traditional astrological styling
 * Uses warm, vibrant colors and standard glyphs
 */
export const classicPreset: ChartPreset = {
  name: 'Classic',
  description: 'Traditional astrological styling with warm, vibrant colors',
  wheel: standardNatalWheel,
  visualConfig: defaultVisualConfig,
  glyphConfig: defaultGlyphConfig,
};

/**
 * Modern preset - contemporary colors and styling
 * Uses cooler tones and modern color palette
 */
export const modernPreset: ChartPreset = {
  name: 'Modern',
  description: 'Contemporary styling with cooler tones and modern colors',
  wheel: standardNatalWheel,
  visualConfig: mergeVisualConfig({
    signColors: [
      '#E63946', // Aries - modern red
      '#F77F00', // Taurus - warm orange
      '#FCBF49', // Gemini - golden yellow
      '#06A77D', // Cancer - teal
      '#D62828', // Leo - deep red
      '#F1FAEE', // Virgo - light green
      '#A8DADC', // Libra - light blue
      '#457B9D', // Scorpio - blue-gray
      '#1D3557', // Sagittarius - navy
      '#2A2D34', // Capricorn - dark gray
      '#4A90E2', // Aquarius - bright blue
      '#E91E63', // Pisces - pink
    ],
    houseColors: [
      '#F5F5F5',
      '#E0E0E0',
      '#CCCCCC',
      '#B0B0B0',
      '#9E9E9E',
      '#757575',
      '#F5F5F5',
      '#E0E0E0',
      '#CCCCCC',
      '#B0B0B0',
      '#9E9E9E',
      '#757575',
    ],
    planetColors: [
      '#FFB800', // Sun - bright yellow
      '#E0E0E0', // Moon - light gray
      '#FF6B6B', // Mercury - coral
      '#4ECDC4', // Venus - turquoise
      '#FF4757', // Mars - red
      '#FFA502', // Jupiter - orange
      '#5F27CD', // Saturn - purple
      '#00D2D3', // Uranus - cyan
      '#3742FA', // Neptune - blue
      '#2F3542', // Pluto - dark gray
    ],
    backgroundColor: '#FAFAFA',
    strokeColor: '#333333',
  }),
  glyphConfig: defaultGlyphConfig,
};

/**
 * Minimal preset - clean, minimal design
 * Uses muted colors and simplified styling
 */
export const minimalPreset: ChartPreset = {
  name: 'Minimal',
  description: 'Clean, minimal design with muted colors',
  wheel: standardNatalWheel,
  visualConfig: mergeVisualConfig({
    signColors: [
      '#E8E8E8', // Aries
      '#D3D3D3', // Taurus
      '#C0C0C0', // Gemini
      '#A9A9A9', // Cancer
      '#808080', // Leo
      '#696969', // Virgo
      '#E8E8E8', // Libra
      '#D3D3D3', // Scorpio
      '#C0C0C0', // Sagittarius
      '#A9A9A9', // Capricorn
      '#808080', // Aquarius
      '#696969', // Pisces
    ],
    houseColors: [
      '#FFFFFF',
      '#F5F5F5',
      '#E8E8E8',
      '#D3D3D3',
      '#C0C0C0',
      '#A9A9A9',
      '#FFFFFF',
      '#F5F5F5',
      '#E8E8E8',
      '#D3D3D3',
      '#C0C0C0',
      '#A9A9A9',
    ],
    planetColors: [
      '#000000', // Sun
      '#666666', // Moon
      '#333333', // Mercury
      '#444444', // Venus
      '#222222', // Mars
      '#555555', // Jupiter
      '#111111', // Saturn
      '#777777', // Uranus
      '#888888', // Neptune
      '#000000', // Pluto
    ],
    aspectColors: {
      conjunction: '#000000',
      opposition: '#333333',
      trine: '#666666',
      square: '#000000',
      sextile: '#999999',
    },
    backgroundColor: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 1,
  }),
  glyphConfig: mergeGlyphConfig({
    glyphSize: 10,
  }),
};

/**
 * All available chart presets
 */
export const chartPresets: Record<string, ChartPreset> = {
  classic: classicPreset,
  modern: modernPreset,
  minimal: minimalPreset,
};

/**
 * Get a chart preset by name
 */
export function getChartPreset(name: string): ChartPreset | undefined {
  return chartPresets[name];
}

/**
 * Get all available preset names
 */
export function getPresetNames(): string[] {
  return Object.keys(chartPresets);
}

