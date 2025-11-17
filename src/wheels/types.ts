/**
 * Type definitions for wheel and ring structures.
 * These are platform-agnostic data structures that define wheel layouts.
 */

export type RingType = 'signs' | 'houses' | 'planets' | 'aspects';

/**
 * Data source for a ring - defines where the ring gets its data from
 */
export interface StaticZodiacSource {
  kind: 'static_zodiac';
}

export interface LayerHousesSource {
  kind: 'layer_houses';
  layerId: string;
}

export interface LayerPlanetsSource {
  kind: 'layer_planets';
  layerId: string;
}

export interface AspectSetFilter {
  includeTypes?: string[];
  minStrength?: number;
  onlyMajor?: boolean;
}

export interface AspectSetSource {
  kind: 'aspect_set';
  aspectSetId: string;
  filter?: AspectSetFilter;
}

export type RingDataSource =
  | StaticZodiacSource
  | LayerHousesSource
  | LayerPlanetsSource
  | AspectSetSource;

/**
 * Definition for a single ring in a wheel
 */
export interface RingDefinition {
  slug: string;
  type: RingType;
  label: string;
  orderIndex: number;
  radiusInner: number; // 0-1 normalized
  radiusOuter: number; // 0-1 normalized
  dataSource: RingDataSource;
  displayOptions?: Record<string, any>;
}

/**
 * Complete wheel definition with all rings
 */
export interface WheelDefinition {
  name: string;
  description?: string;
  rings: RingDefinition[];
  config?: Record<string, any>;
}

