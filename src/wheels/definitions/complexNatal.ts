/**
 * Complex Natal Wheel - an extended wheel with additional detail
 * 
 * This wheel includes:
 * - Outer ring: Zodiac signs (static)
 * - Houses ring (from natal layer)
 * - Planets ring (from natal layer)
 * - Aspects ring (showing major aspects)
 * - Additional celestial objects (asteroids, nodes, etc.)
 */

import type { WheelDefinitionWithPresets } from '../types';

export const complexNatal: WheelDefinitionWithPresets = {
  name: 'Complex Natal Wheel',
  description: 'Extended natal wheel with aspects, asteroids, and additional detail',
  version: '1.0.0',
  author: 'Gaia Tools',
  tags: ['natal', 'complex', 'detailed'],
  
  rings: [
    {
      slug: 'ring_signs',
      type: 'signs',
      label: 'Zodiac Signs',
      orderIndex: 0,
      radiusInner: 0.88,
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
      radiusInner: 0.78,
      radiusOuter: 0.88,
      dataSource: {
        kind: 'layer_houses',
        layerId: 'natal',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_aspects',
      type: 'aspects',
      label: 'Major Aspects',
      orderIndex: 2,
      radiusInner: 0.70,
      radiusOuter: 0.78,
      dataSource: {
        kind: 'aspect_set',
        aspectSetId: 'natal_major',
        filter: {
          onlyMajor: true,
        },
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets',
      type: 'planets',
      label: 'Natal Planets',
      orderIndex: 3,
      radiusInner: 0.50,
      radiusOuter: 0.70,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'natal',
      },
      displayOptions: {},
    },
  ],
  
  config: {},
  
  defaultVisualConfig: {
    ringWidth: 28,
    ringSpacing: 8,
  },
  
  defaultGlyphConfig: {
    glyphSize: 13,
  },
};

