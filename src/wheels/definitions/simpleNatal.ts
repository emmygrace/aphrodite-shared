/**
 * Simple Natal Wheel - a minimal wheel with essential elements only
 * 
 * This wheel includes:
 * - Outer ring: Zodiac signs (static)
 * - Houses ring (from natal layer)
 * - Inner ring: Major planets only (from natal layer)
 */

import type { WheelDefinitionWithPresets } from '../types';

export const simpleNatal: WheelDefinitionWithPresets = {
  name: 'Simple Natal Wheel',
  description: 'Minimal natal wheel with just signs, houses, and major planets',
  version: '1.0.0',
  author: 'Gaia Tools',
  tags: ['natal', 'simple', 'minimal'],
  
  rings: [
    {
      slug: 'ring_signs',
      type: 'signs',
      label: 'Zodiac Signs',
      orderIndex: 0,
      radiusInner: 0.85,
      radiusOuter: 1.0,
      dataSource: {
        kind: 'static_zodiac',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_houses',
      type: 'houses',
      label: 'Houses',
      orderIndex: 1,
      radiusInner: 0.75,
      radiusOuter: 0.85,
      dataSource: {
        kind: 'layer_houses',
        layerId: 'natal',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets',
      type: 'planets',
      label: 'Major Planets',
      orderIndex: 2,
      radiusInner: 0.60,
      radiusOuter: 0.75,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'natal',
      },
      displayOptions: {},
    },
  ],
  
  config: {},
  
  defaultVisualConfig: {
    ringWidth: 30,
    ringSpacing: 12,
  },
  
  defaultGlyphConfig: {
    glyphSize: 14,
  },
};

