/**
 * Chart presets that combine wheel definitions with visual and glyph configurations.
 * These provide complete, ready-to-use chart styling configurations.
 */

import type { WheelDefinitionWithPresets } from '../wheels/types';
import type { VisualConfig, GlyphConfig } from '../configs/types';
import { getWheelDefinition } from '../wheels/registry';
import { defaultVisualConfig, mergeVisualConfig } from '../configs/visual';
import { defaultGlyphConfig, mergeGlyphConfig } from '../configs/glyphs';

/**
 * A complete chart preset combining wheel, visual, and glyph configurations
 */
export interface ChartPreset {
  name: string;
  description?: string;
  wheel: WheelDefinitionWithPresets;
  visualConfig: VisualConfig;
  glyphConfig: GlyphConfig;
}

/**
 * Create a preset from a wheel definition with optional overrides.
 * Merges configurations in this order:
 * 1. Default configs (from configs/visual.ts and configs/glyphs.ts)
 * 2. Wheel-specific defaults (from wheel.defaultVisualConfig/defaultGlyphConfig)
 * 3. Preset-specific overrides (from visualOverrides/glyphOverrides)
 * 
 * @param wheelName - Name of the wheel definition to use
 * @param presetName - Name for the preset
 * @param visualOverrides - Optional visual config overrides for this preset
 * @param glyphOverrides - Optional glyph config overrides for this preset
 * @returns A complete chart preset
 * @throws Error if wheel definition is not found
 */
export function createPresetFromWheel(
  wheelName: string,
  presetName: string,
  visualOverrides?: Partial<VisualConfig>,
  glyphOverrides?: Partial<GlyphConfig>
): ChartPreset {
  const wheel = getWheelDefinition(wheelName);
  if (!wheel) {
    throw new Error(`Wheel definition not found: ${wheelName}`);
  }
  
  // Merge: defaults -> wheel defaults -> preset overrides
  // First merge wheel defaults with base defaults, then merge preset overrides
  const combinedVisualOverrides = {
    ...wheel.defaultVisualConfig,
    ...visualOverrides,
    // Deep merge aspectColors if both exist
    aspectColors: {
      ...wheel.defaultVisualConfig?.aspectColors,
      ...visualOverrides?.aspectColors,
    },
  };
  const visualConfig = mergeVisualConfig(combinedVisualOverrides);
  
  const combinedGlyphOverrides = {
    ...wheel.defaultGlyphConfig,
    ...glyphOverrides,
    // Deep merge glyph objects if both exist
    signGlyphs: {
      ...wheel.defaultGlyphConfig?.signGlyphs,
      ...glyphOverrides?.signGlyphs,
    },
    planetGlyphs: {
      ...wheel.defaultGlyphConfig?.planetGlyphs,
      ...glyphOverrides?.planetGlyphs,
    },
    aspectGlyphs: {
      ...wheel.defaultGlyphConfig?.aspectGlyphs,
      ...glyphOverrides?.aspectGlyphs,
    },
  };
  const glyphConfig = mergeGlyphConfig(combinedGlyphOverrides);
  
  return {
    name: presetName,
    wheel,
    visualConfig,
    glyphConfig,
  };
}

/**
 * Classic preset - traditional astrological styling
 * Uses warm, vibrant colors and standard glyphs
 */
export const classicPreset: ChartPreset = createPresetFromWheel(
  'Standard Natal Wheel',
  'Classic',
  undefined, // Use wheel defaults + base defaults
  undefined
);
classicPreset.description = 'Traditional astrological styling with warm, vibrant colors';

/**
 * Modern preset - contemporary colors and styling
 * Uses cooler tones and modern color palette
 */
export const modernPreset: ChartPreset = createPresetFromWheel(
  'Standard Natal Wheel',
  'Modern',
  {
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
  },
  undefined // Use wheel glyph defaults
);
modernPreset.description = 'Contemporary styling with cooler tones and modern colors';

/**
 * Minimal preset - clean, minimal design
 * Uses muted colors and simplified styling
 */
export const minimalPreset: ChartPreset = createPresetFromWheel(
  'Standard Natal Wheel',
  'Minimal',
  {
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
  },
  {
    glyphSize: 10,
  }
);
minimalPreset.description = 'Clean, minimal design with muted colors';

/**
 * Traditional preset - warm, classic astrological styling
 * Uses warm earth tones, gold accents, and classic planet colors
 */
export const traditionalPreset: ChartPreset = createPresetFromWheel(
  'Standard Natal Wheel',
  'Traditional',
  {
    signColors: [
      '#C0392B', // Aries - deep red
      '#D68910', // Taurus - golden brown
      '#F39C12', // Gemini - amber
      '#85C1E2', // Cancer - soft blue
      '#F7DC6F', // Leo - golden yellow
      '#82E0AA', // Virgo - sage green
      '#F8C471', // Libra - peach
      '#8B4513', // Scorpio - sienna
      '#F1C40F', // Sagittarius - bright gold
      '#5D6D7E', // Capricorn - slate gray
      '#3498DB', // Aquarius - sky blue
      '#9B59B6', // Pisces - lavender
    ],
    houseColors: [
      '#FDF2E9', // Warm cream
      '#F8E8D5',
      '#F4DEC0',
      '#E8D5B7',
      '#D4B896',
      '#C19A6B',
      '#FDF2E9',
      '#F8E8D5',
      '#F4DEC0',
      '#E8D5B7',
      '#D4B896',
      '#C19A6B',
    ],
    planetColors: [
      '#F39C12', // Sun - golden
      '#F7DC6F', // Moon - pale gold
      '#D68910', // Mercury - bronze
      '#F8C471', // Venus - peach
      '#C0392B', // Mars - deep red
      '#F1C40F', // Jupiter - bright gold
      '#5D6D7E', // Saturn - slate
      '#85C1E2', // Uranus - sky blue
      '#3498DB', // Neptune - blue
      '#8B4513', // Pluto - sienna
    ],
    aspectColors: {
      conjunction: '#C0392B',
      opposition: '#3498DB',
      trine: '#27AE60',
      square: '#E74C3C',
      sextile: '#F39C12',
      semisextile: '#D68910',
      semisquare: '#E67E22',
      sesquiquadrate: '#E67E22',
      quincunx: '#8B4513',
    },
    backgroundColor: '#FDF2E9',
    strokeColor: '#5D4E37',
    strokeWidth: 2,
  },
  {
    glyphSize: 14,
  }
);
traditionalPreset.description = 'Warm, classic astrological styling with earth tones and gold accents';

/**
 * Complex preset - rich colors and detailed styling
 * Uses vibrant colors, multiple variations, and detailed aspect colors
 */
export const complexPreset: ChartPreset = createPresetFromWheel(
  'Complex Natal Wheel',
  'Complex',
  {
    signColors: [
      '#FF1744', // Aries - vibrant red
      '#FF6F00', // Taurus - deep orange
      '#FFD600', // Gemini - bright yellow
      '#00B8D4', // Cancer - cyan
      '#FF9100', // Leo - orange
      '#64DD17', // Virgo - lime green
      '#FF4081', // Libra - pink
      '#7B1FA2', // Scorpio - purple
      '#FFC400', // Sagittarius - amber
      '#37474F', // Capricorn - blue-gray
      '#00E5FF', // Aquarius - light cyan
      '#E91E63', // Pisces - magenta
    ],
    houseColors: [
      '#FFFFFF',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#FFFFFF',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
    ],
    planetColors: [
      '#FFD600', // Sun - bright yellow
      '#E0E0E0', // Moon - silver
      '#FF6F00', // Mercury - orange
      '#FF4081', // Venus - pink
      '#FF1744', // Mars - red
      '#FFC400', // Jupiter - amber
      '#7B1FA2', // Saturn - purple
      '#00E5FF', // Uranus - cyan
      '#00B8D4', // Neptune - teal
      '#37474F', // Pluto - dark gray
    ],
    aspectColors: {
      conjunction: '#FF1744',
      opposition: '#00B8D4',
      trine: '#64DD17',
      square: '#FF1744',
      sextile: '#FFD600',
      semisextile: '#FF9100',
      semisquare: '#FF6F00',
      sesquiquadrate: '#FF6F00',
      quincunx: '#7B1FA2',
    },
    aspectStrokeWidth: 3,
    backgroundColor: '#FAFAFA',
    strokeColor: '#212121',
    strokeWidth: 2,
  },
  {
    glyphSize: 13,
  }
);
complexPreset.description = 'Rich colors and detailed styling with multiple rings and vibrant palette';

/**
 * Transits preset - optimized for transit chart visualization
 * Uses distinct colors for natal (darker/solid) vs transit (lighter/outlined)
 */
export const transitsPreset: ChartPreset = createPresetFromWheel(
  'Bi-Wheel Natal-Transit',
  'Transits',
  {
    signColors: [
      '#B71C1C', // Aries - dark red
      '#E65100', // Taurus - dark orange
      '#F57F17', // Gemini - dark yellow
      '#006064', // Cancer - dark cyan
      '#E65100', // Leo - dark orange
      '#33691E', // Virgo - dark green
      '#C2185B', // Libra - dark pink
      '#4A148C', // Scorpio - dark purple
      '#F57F17', // Sagittarius - dark yellow
      '#1B5E20', // Capricorn - dark green
      '#01579B', // Aquarius - dark blue
      '#4A148C', // Pisces - dark purple
    ],
    houseColors: [
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
    ],
    planetColors: [
      '#F57F17', // Sun - dark yellow (natal)
      '#9E9E9E', // Moon - gray (natal)
      '#E65100', // Mercury - dark orange (natal)
      '#C2185B', // Venus - dark pink (natal)
      '#B71C1C', // Mars - dark red (natal)
      '#F57F17', // Jupiter - dark yellow (natal)
      '#4A148C', // Saturn - dark purple (natal)
      '#01579B', // Uranus - dark blue (natal)
      '#006064', // Neptune - dark cyan (natal)
      '#1B5E20', // Pluto - dark green (natal)
    ],
    aspectColors: {
      conjunction: '#FF1744',
      opposition: '#00B8D4',
      trine: '#64DD17',
      square: '#FF1744',
      sextile: '#FFD600',
      semisextile: '#FF9100',
      semisquare: '#FF6F00',
      sesquiquadrate: '#FF6F00',
      quincunx: '#7B1FA2',
    },
    backgroundColor: '#FFFFFF',
    strokeColor: '#424242',
    strokeWidth: 2,
  },
  {
    glyphSize: 11,
  }
);
transitsPreset.description = 'Optimized for transit chart visualization with distinct natal vs transit styling';

/**
 * Simple preset - uses the simple wheel with minimal elements
 */
export const simplePreset: ChartPreset = createPresetFromWheel(
  'Simple Natal Wheel',
  'Simple',
  {
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
  },
  {
    glyphSize: 14,
  }
);
simplePreset.description = 'Simple, clean design with minimal elements and muted colors';

/**
 * Bi-wheel Traditional preset
 */
export const biWheelTraditionalPreset: ChartPreset = createPresetFromWheel(
  'Bi-Wheel Natal-Transit',
  'Bi-Wheel Traditional',
  {
    signColors: [
      '#C0392B', // Aries - deep red
      '#D68910', // Taurus - golden brown
      '#F39C12', // Gemini - amber
      '#85C1E2', // Cancer - soft blue
      '#F7DC6F', // Leo - golden yellow
      '#82E0AA', // Virgo - sage green
      '#F8C471', // Libra - peach
      '#8B4513', // Scorpio - sienna
      '#F1C40F', // Sagittarius - bright gold
      '#5D6D7E', // Capricorn - slate gray
      '#3498DB', // Aquarius - sky blue
      '#9B59B6', // Pisces - lavender
    ],
    houseColors: [
      '#FDF2E9', // Warm cream
      '#F8E8D5',
      '#F4DEC0',
      '#E8D5B7',
      '#D4B896',
      '#C19A6B',
      '#FDF2E9',
      '#F8E8D5',
      '#F4DEC0',
      '#E8D5B7',
      '#D4B896',
      '#C19A6B',
    ],
    planetColors: [
      '#F39C12', // Sun - golden (natal)
      '#F7DC6F', // Moon - pale gold (natal)
      '#D68910', // Mercury - bronze (natal)
      '#F8C471', // Venus - peach (natal)
      '#C0392B', // Mars - deep red (natal)
      '#F1C40F', // Jupiter - bright gold (natal)
      '#5D6D7E', // Saturn - slate (natal)
      '#85C1E2', // Uranus - sky blue (transit)
      '#3498DB', // Neptune - blue (transit)
      '#8B4513', // Pluto - sienna (transit)
    ],
    aspectColors: {
      conjunction: '#C0392B',
      opposition: '#3498DB',
      trine: '#27AE60',
      square: '#E74C3C',
      sextile: '#F39C12',
      semisextile: '#D68910',
      semisquare: '#E67E22',
      sesquiquadrate: '#E67E22',
      quincunx: '#8B4513',
    },
    backgroundColor: '#FDF2E9',
    strokeColor: '#5D4E37',
    strokeWidth: 2,
  },
  {
    glyphSize: 11,
  }
);
biWheelTraditionalPreset.description = 'Traditional bi-wheel styling with warm earth tones';

/**
 * Bi-wheel Modern preset
 */
export const biWheelModernPreset: ChartPreset = createPresetFromWheel(
  'Bi-Wheel Natal-Transit',
  'Bi-Wheel Modern',
  {
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
      '#FFB800', // Sun - bright yellow (natal)
      '#E0E0E0', // Moon - light gray (natal)
      '#FF6B6B', // Mercury - coral (natal)
      '#4ECDC4', // Venus - turquoise (natal)
      '#FF4757', // Mars - red (natal)
      '#FFA502', // Jupiter - orange (natal)
      '#5F27CD', // Saturn - purple (natal)
      '#00D2D3', // Uranus - cyan (transit)
      '#3742FA', // Neptune - blue (transit)
      '#2F3542', // Pluto - dark gray (transit)
    ],
    backgroundColor: '#FAFAFA',
    strokeColor: '#333333',
    strokeWidth: 2,
  },
  {
    glyphSize: 11,
  }
);
biWheelModernPreset.description = 'Modern bi-wheel styling with contemporary colors';

/**
 * Bi-wheel Transits preset
 */
export const biWheelTransitsPreset: ChartPreset = createPresetFromWheel(
  'Bi-Wheel Natal-Transit',
  'Bi-Wheel Transits',
  {
    signColors: [
      '#B71C1C', // Aries - dark red
      '#E65100', // Taurus - dark orange
      '#F57F17', // Gemini - dark yellow
      '#006064', // Cancer - dark cyan
      '#E65100', // Leo - dark orange
      '#33691E', // Virgo - dark green
      '#C2185B', // Libra - dark pink
      '#4A148C', // Scorpio - dark purple
      '#F57F17', // Sagittarius - dark yellow
      '#1B5E20', // Capricorn - dark green
      '#01579B', // Aquarius - dark blue
      '#4A148C', // Pisces - dark purple
    ],
    houseColors: [
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
    ],
    planetColors: [
      '#F57F17', // Sun - dark yellow (natal)
      '#9E9E9E', // Moon - gray (natal)
      '#E65100', // Mercury - dark orange (natal)
      '#C2185B', // Venus - dark pink (natal)
      '#B71C1C', // Mars - dark red (natal)
      '#F57F17', // Jupiter - dark yellow (natal)
      '#4A148C', // Saturn - dark purple (natal)
      '#01579B', // Uranus - dark blue (transit)
      '#006064', // Neptune - dark cyan (transit)
      '#1B5E20', // Pluto - dark green (transit)
    ],
    aspectColors: {
      conjunction: '#FF1744',
      opposition: '#00B8D4',
      trine: '#64DD17',
      square: '#FF1744',
      sextile: '#FFD600',
      semisextile: '#FF9100',
      semisquare: '#FF6F00',
      sesquiquadrate: '#FF6F00',
      quincunx: '#7B1FA2',
    },
    backgroundColor: '#FFFFFF',
    strokeColor: '#424242',
    strokeWidth: 2,
  },
  {
    glyphSize: 11,
  }
);
biWheelTransitsPreset.description = 'Bi-wheel optimized for transit visualization with clear natal/transit distinction';

/**
 * All available chart presets
 */
export const chartPresets: Record<string, ChartPreset> = {
  classic: classicPreset,
  modern: modernPreset,
  minimal: minimalPreset,
  traditional: traditionalPreset,
  complex: complexPreset,
  transits: transitsPreset,
  simple: simplePreset,
  'bi-wheel-traditional': biWheelTraditionalPreset,
  'bi-wheel-modern': biWheelModernPreset,
  'bi-wheel-transits': biWheelTransitsPreset,
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

