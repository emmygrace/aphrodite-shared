/**
 * Registry system for wheel definitions.
 * Supports both built-in definitions and user-registered definitions.
 */

import type { WheelDefinitionWithPresets } from './types';

// Built-in definitions
import { standardNatal } from './definitions';

// User-registered definitions (loaded dynamically)
const userDefinitions = new Map<string, WheelDefinitionWithPresets>();

/**
 * Normalize a wheel name to a key for lookup.
 * Converts to lowercase and replaces spaces with hyphens.
 */
function normalizeWheelName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Register a wheel definition.
 * User-registered definitions take precedence over built-in definitions.
 * 
 * @param definition - The wheel definition to register
 */
export function registerWheelDefinition(definition: WheelDefinitionWithPresets): void {
  const key = normalizeWheelName(definition.name);
  userDefinitions.set(key, definition);
}

/**
 * Unregister a wheel definition.
 * Only removes user-registered definitions, not built-in ones.
 * 
 * @param name - The name of the wheel definition to unregister
 */
export function unregisterWheelDefinition(name: string): boolean {
  const key = normalizeWheelName(name);
  return userDefinitions.delete(key);
}

/**
 * Get a wheel definition by name.
 * Checks user-registered definitions first, then built-in definitions.
 * 
 * @param name - The name of the wheel definition to retrieve
 * @returns The wheel definition, or undefined if not found
 */
export function getWheelDefinition(name: string): WheelDefinitionWithPresets | undefined {
  const key = normalizeWheelName(name);
  
  // Check user definitions first (they take precedence)
  if (userDefinitions.has(key)) {
    return userDefinitions.get(key);
  }
  
  // Check built-in definitions
  switch (key) {
    case 'standard-natal-wheel':
      return standardNatal;
    default:
      return undefined;
  }
}

/**
 * List all available wheel definitions.
 * Returns both built-in and user-registered definitions.
 * 
 * @returns Array of all wheel definitions
 */
export function listWheelDefinitions(): WheelDefinitionWithPresets[] {
  return [
    standardNatal,
    ...Array.from(userDefinitions.values()),
  ];
}

/**
 * Get all built-in wheel definition names.
 * 
 * @returns Array of built-in wheel definition names
 */
export function getBuiltInWheelNames(): string[] {
  return ['Standard Natal Wheel'];
}

/**
 * Get all user-registered wheel definition names.
 * 
 * @returns Array of user-registered wheel definition names
 */
export function getUserWheelNames(): string[] {
  return Array.from(userDefinitions.values()).map(def => def.name);
}

/**
 * Check if a wheel definition exists (built-in or user-registered).
 * 
 * @param name - The name of the wheel definition to check
 * @returns True if the definition exists, false otherwise
 */
export function hasWheelDefinition(name: string): boolean {
  return getWheelDefinition(name) !== undefined;
}

