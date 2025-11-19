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

export interface StaticNakshatraSource {
  kind: 'static_nakshatras';
}

export interface LayerHousesSource {
  kind: 'layer_houses';
  layerId: string;
}

export interface LayerPlanetsSource {
  kind: 'layer_planets';
  layerId: string;
}

export interface LayerVargaPlanetsSource {
  kind: 'layer_varga_planets';
  layerId: string;
  vargaId: string;
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
  | StaticNakshatraSource
  | LayerHousesSource
  | LayerPlanetsSource
  | LayerVargaPlanetsSource
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
  displayOptions?: Record<string, unknown>;
}

/**
 * Complete wheel definition with all rings
 */
export interface WheelDefinition {
  name: string;
  description?: string;
  rings: RingDefinition[];
  config?: Record<string, unknown>;
}

/**
 * Wheel definition with preset overrides and metadata.
 * This extends WheelDefinition to include optional visual/glyph config overrides
 * that are specific to this wheel, plus metadata for versioning and organization.
 */
export interface WheelDefinitionWithPresets extends WheelDefinition {
  /**
   * Optional visual configuration overrides specific to this wheel.
   * These will be merged with defaults when creating presets.
   */
  defaultVisualConfig?: Partial<import('../configs/types').VisualConfig>;
  
  /**
   * Optional glyph configuration overrides specific to this wheel.
   * These will be merged with defaults when creating presets.
   */
  defaultGlyphConfig?: Partial<import('../configs/types').GlyphConfig>;
  
  /**
   * Version of this wheel definition (e.g., "1.0.0")
   */
  version?: string;
  
  /**
   * Author or creator of this wheel definition
   */
  author?: string;
  
  /**
   * Tags for categorizing and searching wheel definitions
   */
  tags?: string[];
}

