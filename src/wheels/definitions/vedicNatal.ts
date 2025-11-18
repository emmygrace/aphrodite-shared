import type { WheelDefinitionWithPresets } from '../types';

export const vedicNatal: WheelDefinitionWithPresets = {
  name: 'Vedic Natal Wheel',
  description: 'Sidereal layout with nakshatra ring and Navamsa overlay',
  version: '1.0.0',
  author: 'Gaia Tools',
  tags: ['vedic', 'jyotish', 'sidereal'],
  rings: [
    {
      slug: 'ring_nakshatras',
      type: 'signs',
      label: 'Nakshatras',
      orderIndex: 0,
      radiusInner: 0.85,
      radiusOuter: 1.0,
      dataSource: {
        kind: 'static_nakshatras',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_houses',
      type: 'houses',
      label: 'Whole Sign Houses',
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
      label: 'Natal Planets',
      orderIndex: 2,
      radiusInner: 0.55,
      radiusOuter: 0.75,
      dataSource: {
        kind: 'layer_planets',
        layerId: 'natal',
      },
      displayOptions: {},
    },
    {
      slug: 'ring_navamsa',
      type: 'planets',
      label: 'Navamsa Overlay',
      orderIndex: 3,
      radiusInner: 0.35,
      radiusOuter: 0.55,
      dataSource: {
        kind: 'layer_varga_planets',
        layerId: 'natal',
        vargaId: 'd9',
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
    glyphSize: 12,
  },
};

