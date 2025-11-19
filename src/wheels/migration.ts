/**
 * Migration utilities for wheel definition updates
 */

import type { WheelDefinitionWithPresets } from './types';
import { compareVersions, isValidVersion } from './versioning';

export interface MigrationResult {
  success: boolean;
  migrated?: WheelDefinitionWithPresets;
  errors?: string[];
}

/**
 * Migration function type
 */
export type MigrationFunction = (definition: WheelDefinitionWithPresets) => WheelDefinitionWithPresets;

/**
 * Registry of migration functions by version
 */
const migrations: Map<string, MigrationFunction[]> = new Map();

/**
 * Register a migration function for a specific version
 */
export function registerMigration(
  fromVersion: string,
  toVersion: string,
  migration: MigrationFunction
): void {
  const key = `${fromVersion}->${toVersion}`;
  if (!migrations.has(key)) {
    migrations.set(key, []);
  }
  migrations.get(key)!.push(migration);
}

/**
 * Migrate a wheel definition from one version to another
 */
export function migrateWheelDefinition(
  definition: WheelDefinitionWithPresets,
  targetVersion: string
): MigrationResult {
  const errors: string[] = [];

  // Validate versions
  if (!definition.version) {
    return {
      success: false,
      errors: ['Wheel definition has no version'],
    };
  }

  if (!isValidVersion(definition.version)) {
    return {
      success: false,
      errors: [`Invalid source version format: ${definition.version}`],
    };
  }

  if (!isValidVersion(targetVersion)) {
    return {
      success: false,
      errors: [`Invalid target version format: ${targetVersion}`],
    };
  }

  // If already at target version, return as-is
  if (compareVersions(definition.version, targetVersion) === 0) {
    return {
      success: true,
      migrated: definition,
    };
  }

  // If target is older, we can't migrate backwards
  if (compareVersions(definition.version, targetVersion) > 0) {
    return {
      success: false,
      errors: [`Cannot migrate backwards from ${definition.version} to ${targetVersion}`],
    };
  }

  let current = { ...definition };
  let currentVersion = definition.version;

  // Apply migrations step by step
  while (compareVersions(currentVersion, targetVersion) < 0) {
    const nextVersion = getNextVersion(currentVersion);
    if (!nextVersion) {
      errors.push(`Cannot determine next version after ${currentVersion}`);
      break;
    }

    const migrationKey = `${currentVersion}->${nextVersion}`;
    const migrationFunctions = migrations.get(migrationKey);

    if (!migrationFunctions || migrationFunctions.length === 0) {
      // No migration needed, just update version
      current = { ...current, version: nextVersion };
    } else {
      // Apply all migrations for this version step
      try {
        for (const migration of migrationFunctions) {
          current = migration(current);
        }
        current = { ...current, version: nextVersion };
      } catch (error) {
        errors.push(
          `Migration failed for ${migrationKey}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        break;
      }
    }

    currentVersion = nextVersion;
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    migrated: current,
  };
}

/**
 * Get next version (increment patch version)
 */
function getNextVersion(version: string): string | null {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3) {
    return null;
  }
  parts[2] += 1; // Increment patch
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

/**
 * Check if a wheel definition needs migration
 */
export function needsMigration(
  definition: WheelDefinitionWithPresets,
  targetVersion: string
): boolean {
  if (!definition.version || !isValidVersion(definition.version)) {
    return false;
  }
  if (!isValidVersion(targetVersion)) {
    return false;
  }
  return compareVersions(definition.version, targetVersion) < 0;
}

