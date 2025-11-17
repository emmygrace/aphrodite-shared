/**
 * Bi-Wheel Natal-Transit - a wheel showing both natal and transit positions
 * 
 * This wheel includes:
 * - Outer ring: Zodiac signs (static)
 * - Middle ring: Natal houses (from natal layer)
 * - Outer planet ring: Transit planets (from transit layer)
 * - Inner planet ring: Natal planets (from natal layer)
 */

import type { WheelDefinitionWithPresets } from '../types';

export const biWheelNatalTransit: WheelDefinitionWithPresets = {
  name: 'Bi-Wheel Natal-Transit',
  description: 'Bi-wheel showing natal chart with transit overlays',
  version: '1.0.0',
  author: 'Gaia Tools',
  tags: ['bi-wheel', 'natal', 'transit'],
  
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
      slug: 'ring_houses_natal',
      type: 'houses',
      label: 'Natal Houses',
      orderIndex: 1,
      radiusInner: 0.80,
      radiusOuter: 0.90,
      dataSource: {
        kind: 'layer_houses',
        layerId: 'natal',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets_transit',
      type: 'planets',
      label: 'Transit Planets',
      orderIndex: 2,
      radiusInner: 0.65,
      radiusOuter: 0.80,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'transit',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_planets_natal',
      type: 'planets',
      label: 'Natal Planets',
      orderIndex: 3,
      radiusInner: 0.45,
      radiusOuter: 0.65,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'natal',
      },
      displayOptions: {},
    },
  ],
  
  config: {},
  
  defaultVisualConfig: {
    ringWidth: 25,
    ringSpacing: 8,
  },
  
  defaultGlyphConfig: {
    glyphSize: 11,
  },
};

