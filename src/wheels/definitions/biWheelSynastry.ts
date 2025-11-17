/**
 * Bi-Wheel Synastry - a wheel for comparing two natal charts
 * 
 * This wheel includes:
 * - Outer ring: Zodiac signs (static)
 * - Person A houses and planets (outer)
 * - Person B houses and planets (inner)
 */

import type { WheelDefinitionWithPresets } from '../types';

export const biWheelSynastry: WheelDefinitionWithPresets = {
  name: 'Bi-Wheel Synastry',
  description: 'Bi-wheel for comparing two natal charts side by side',
  version: '1.0.0',
  author: 'Gaia Tools',
  tags: ['bi-wheel', 'synastry'],
  
  rings: [
    {
      slug: 'ring_signs',
      type: 'signs',
      label: 'Zodiac Signs',
      orderIndex: 0,
      radiusInner: 0.90,
      radiusOuter: 1.0,
      dataSource: {
        kind: 'static_zodiac',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_houses_a',
      type: 'houses',
      label: 'Person A Houses',
      orderIndex: 1,
      radiusInner: 0.80,
      radiusOuter: 0.90,
      dataSource: {
        kind: 'layer_houses',
        layerId: 'person_a',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets_a',
      type: 'planets',
      label: 'Person A Planets',
      orderIndex: 2,
      radiusInner: 0.65,
      radiusOuter: 0.80,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'person_a',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_houses_b',
      type: 'houses',
      label: 'Person B Houses',
      orderIndex: 3,
      radiusInner: 0.50,
      radiusOuter: 0.65,
      dataSource: {
        kind: 'layer_houses',
        layerId: 'person_b',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets_b',
      type: 'planets',
      label: 'Person B Planets',
      orderIndex: 4,
      radiusInner: 0.30,
      radiusOuter: 0.50,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'person_b',
      },
      displayOptions: {},
    },
  ],
  
  config: {},
  
  defaultVisualConfig: {
    ringWidth: 20,
    ringSpacing: 8,
  },
  
  defaultGlyphConfig: {
    glyphSize: 10,
  },
};

