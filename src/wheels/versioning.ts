/**
 * Versioning utilities for wheel definitions
 */

import type { WheelDefinitionWithPresets } from './types';

/**
 * Compare two version strings (semver-like)
 * Returns: -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  const maxLength = Math.max(parts1.length, parts2.length);
  
  for (let i = 0; i < maxLength; i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }
  
  return 0;
}

/**
 * Check if a version is newer than another
 */
export function isNewerVersion(v1: string, v2: string): boolean {
  return compareVersions(v1, v2) > 0;
}

/**
 * Check if a version is older than another
 */
export function isOlderVersion(v1: string, v2: string): boolean {
  return compareVersions(v1, v2) < 0;
}

/**
 * Get the latest version from an array of wheel definitions
 */
export function getLatestVersion(wheels: WheelDefinitionWithPresets[]): WheelDefinitionWithPresets | null {
  if (wheels.length === 0) return null;
  
  let latest = wheels[0];
  
  for (let i = 1; i < wheels.length; i++) {
    const wheel = wheels[i];
    if (wheel.version && latest.version) {
      if (isNewerVersion(wheel.version, latest.version)) {
        latest = wheel;
      }
    } else if (wheel.version && !latest.version) {
      latest = wheel;
    }
  }
  
  return latest;
}

/**
 * Validate version string format (semver-like: major.minor.patch)
 */
export function isValidVersion(version: string): boolean {
  const versionRegex = /^\d+\.\d+\.\d+$/;
  return versionRegex.test(version);
}

/**
 * Get version parts (major, minor, patch)
 */
export function getVersionParts(version: string): { major: number; minor: number; patch: number } | null {
  if (!isValidVersion(version)) {
    return null;
  }
  
  const parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2],
  };
}

/**
 * Check if two versions are compatible (same major version)
 */
export function areVersionsCompatible(v1: string, v2: string): boolean {
  const parts1 = getVersionParts(v1);
  const parts2 = getVersionParts(v2);
  
  if (!parts1 || !parts2) {
    return false;
  }
  
  return parts1.major === parts2.major;
}

