/**
 * Utilities for loading and exporting wheel definitions from JSON.
 * Enables text-based creation of wheel definitions for advanced users.
 */

import type { WheelDefinitionWithPresets, RingDefinition, RingDataSource } from './types';
import { registerWheelDefinition } from './registry';

/**
 * Validation error for wheel definitions
 */
export class WheelDefinitionValidationError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'WheelDefinitionValidationError';
  }
}

/**
 * Validate a ring definition
 */
function validateRingDefinition(ring: any, index: number): asserts ring is RingDefinition {
  if (!ring || typeof ring !== 'object') {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must be an object`,
      `rings[${index}]`
    );
  }
  
  if (typeof ring.slug !== 'string' || !ring.slug) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a non-empty slug`,
      `rings[${index}].slug`
    );
  }
  
  if (!['signs', 'houses', 'planets', 'aspects'].includes(ring.type)) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a valid type (signs, houses, planets, or aspects)`,
      `rings[${index}].type`
    );
  }
  
  if (typeof ring.label !== 'string' || !ring.label) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a non-empty label`,
      `rings[${index}].label`
    );
  }
  
  if (typeof ring.orderIndex !== 'number') {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a numeric orderIndex`,
      `rings[${index}].orderIndex`
    );
  }
  
  if (typeof ring.radiusInner !== 'number' || ring.radiusInner < 0 || ring.radiusInner > 1) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a radiusInner between 0 and 1`,
      `rings[${index}].radiusInner`
    );
  }
  
  if (typeof ring.radiusOuter !== 'number' || ring.radiusOuter < 0 || ring.radiusOuter > 1) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a radiusOuter between 0 and 1`,
      `rings[${index}].radiusOuter`
    );
  }
  
  if (ring.radiusInner >= ring.radiusOuter) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have radiusInner < radiusOuter`,
      `rings[${index}].radius`
    );
  }
  
  if (!ring.dataSource || typeof ring.dataSource !== 'object') {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} must have a dataSource object`,
      `rings[${index}].dataSource`
    );
  }
  
  const validKinds = ['static_zodiac', 'layer_houses', 'layer_planets', 'aspect_set'];
  if (!validKinds.includes(ring.dataSource.kind)) {
    throw new WheelDefinitionValidationError(
      `Ring at index ${index} dataSource must have a valid kind`,
      `rings[${index}].dataSource.kind`
    );
  }
  
  // Validate layer-specific requirements
  if (ring.dataSource.kind === 'layer_houses' || ring.dataSource.kind === 'layer_planets') {
    if (typeof ring.dataSource.layerId !== 'string' || !ring.dataSource.layerId) {
      throw new WheelDefinitionValidationError(
        `Ring at index ${index} dataSource must have a layerId for ${ring.dataSource.kind}`,
        `rings[${index}].dataSource.layerId`
      );
    }
  }
  
  if (ring.dataSource.kind === 'aspect_set') {
    if (typeof ring.dataSource.aspectSetId !== 'string' || !ring.dataSource.aspectSetId) {
      throw new WheelDefinitionValidationError(
        `Ring at index ${index} dataSource must have an aspectSetId for aspect_set`,
        `rings[${index}].dataSource.aspectSetId`
      );
    }
  }
}

/**
 * Validate a wheel definition
 */
function validateWheelDefinition(definition: any): asserts definition is WheelDefinitionWithPresets {
  if (!definition || typeof definition !== 'object') {
    throw new WheelDefinitionValidationError('Wheel definition must be an object');
  }
  
  if (typeof definition.name !== 'string' || !definition.name) {
    throw new WheelDefinitionValidationError(
      'Wheel definition must have a non-empty name',
      'name'
    );
  }
  
  if (!Array.isArray(definition.rings)) {
    throw new WheelDefinitionValidationError(
      'Wheel definition must have a rings array',
      'rings'
    );
  }
  
  if (definition.rings.length === 0) {
    throw new WheelDefinitionValidationError(
      'Wheel definition must have at least one ring',
      'rings'
    );
  }
  
  // Validate each ring
  definition.rings.forEach((ring: any, index: number) => {
    validateRingDefinition(ring, index);
  });
  
  // Validate optional fields
  if (definition.description !== undefined && typeof definition.description !== 'string') {
    throw new WheelDefinitionValidationError(
      'Wheel definition description must be a string',
      'description'
    );
  }

  if (definition.version !== undefined) {
    if (typeof definition.version !== 'string') {
      throw new WheelDefinitionValidationError(
        'Wheel definition version must be a string',
        'version'
      );
    }
    // Validate version format (semver-like: major.minor.patch)
    const versionRegex = /^\d+\.\d+\.\d+$/;
    if (!versionRegex.test(definition.version)) {
      throw new WheelDefinitionValidationError(
        `Wheel definition version must be in format major.minor.patch (e.g., "1.0.0"), got: ${definition.version}`,
        'version'
      );
    }
  }

  if (definition.author !== undefined && typeof definition.author !== 'string') {
    throw new WheelDefinitionValidationError(
      'Wheel definition author must be a string',
      'author'
    );
  }

  if (definition.tags !== undefined) {
    if (!Array.isArray(definition.tags)) {
      throw new WheelDefinitionValidationError(
        'Wheel definition tags must be an array',
        'tags'
      );
    }
    if (!definition.tags.every((tag: any) => typeof tag === 'string')) {
      throw new WheelDefinitionValidationError(
        'Wheel definition tags must be an array of strings',
        'tags'
      );
    }
  }
}

/**
 * Load a wheel definition from JSON string.
 * Validates the definition and returns a typed object.
 * 
 * @param json - JSON string containing the wheel definition
 * @returns Validated wheel definition
 * @throws WheelDefinitionValidationError if validation fails
 */
export function loadWheelDefinitionFromJSON(json: string): WheelDefinitionWithPresets {
  let parsed: any;
  
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    throw new WheelDefinitionValidationError(
      `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
  
  validateWheelDefinition(parsed);
  
  return parsed as WheelDefinitionWithPresets;
}

/**
 * Load and register a wheel definition from JSON string.
 * This is a convenience function that combines loading and registration.
 * 
 * @param json - JSON string containing the wheel definition
 * @returns The registered wheel definition
 * @throws WheelDefinitionValidationError if validation fails
 */
export function registerWheelDefinitionFromJSON(json: string): WheelDefinitionWithPresets {
  const definition = loadWheelDefinitionFromJSON(json);
  registerWheelDefinition(definition);
  return definition;
}

/**
 * Export a wheel definition to JSON string.
 * 
 * @param definition - The wheel definition to export
 * @param pretty - Whether to format the JSON with indentation (default: true)
 * @returns JSON string representation of the wheel definition
 */
export function exportWheelDefinitionToJSON(
  definition: WheelDefinitionWithPresets,
  pretty: boolean = true
): string {
  if (pretty) {
    return JSON.stringify(definition, null, 2);
  }
  return JSON.stringify(definition);
}

