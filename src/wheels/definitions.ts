/**
 * Wheel definitions extracted from database migrations.
 * These define the structure of chart wheels (ring layouts).
 */

import type { WheelDefinition, RingDefinition } from './types';

/**
 * Standard Natal Wheel - the default wheel configuration
 * 
 * This wheel includes:
 * - Outer ring: Zodiac signs (static)
 * - Middle ring: Houses (from natal layer)
 * - Inner ring: Planets (from natal layer)
 * 
 * Note: This definition is also seeded in the database migration
 * (coeus-api/alembic/versions/003_fresh_schema_migration.py)
 * for backward compatibility.
 */
export const standardNatalWheel: WheelDefinition = {
  name: 'Standard Natal Wheel',
  description: 'Default wheel with signs, houses, and planets',
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
  ],
  config: {},
};

/**
 * All available wheel definitions
 */
export const wheelDefinitions: Record<string, WheelDefinition> = {
  standardNatal: standardNatalWheel,
};

/**
 * Get a wheel definition by name
 */
export function getWheelDefinition(name: string): WheelDefinition | undefined {
  return wheelDefinitions[name];
}

