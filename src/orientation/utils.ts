/**
 * Utility functions for orientation and view frame calculations.
 */

import type {
  ViewFrame,
  AnchorTargetUnion,
  ReferenceFrame,
  LockFrame,
  LockRule,
  HouseNumber,
  SignNumber,
  AngleType,
} from './types.js';

/**
 * Helper to get the longitude of an anchor target.
 * This is a placeholder - actual implementation will need chart data.
 */
export interface AnchorLongitudeResolver {
  getObjectLongitude(objectId: number | string): number | null;
  getHouseCusp(houseNumber: HouseNumber): number | null;
  getSignStart(signNumber: SignNumber): number; // Always 0-11 * 30
  getAngleLongitude(angleType: AngleType): number | null;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeDeg(degrees: number): number {
  let normalized = degrees % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Get the world longitude of an anchor target
 */
export function getAnchorLongitude(
  anchor: AnchorTargetUnion,
  resolver: AnchorLongitudeResolver
): number | null {
  switch (anchor.kind) {
    case 'object':
      return resolver.getObjectLongitude(anchor.id);
    case 'house':
      return resolver.getHouseCusp(anchor.index);
    case 'sign':
      return resolver.getSignStart(anchor.index);
    case 'angle':
      return resolver.getAngleLongitude(anchor.type);
    default:
      return null;
  }
}

/**
 * Resolve worldZero from ViewFrame - either use direct value or resolve from anchor
 */
export function resolveWorldZero(
  viewFrame: ViewFrame,
  resolver: AnchorLongitudeResolver
): number | null {
  // If worldZero is directly provided, use it
  if (viewFrame.worldZero !== undefined) {
    return viewFrame.worldZero;
  }
  
  // Otherwise, resolve from anchor
  return getAnchorLongitude(viewFrame.anchor, resolver);
}

/**
 * Convert a world longitude to a screen angle based on ViewFrame.
 * Supports both the new worldZero/screenZero model and the legacy anchor-based model.
 * 
 * @param worldLongitude - Longitude in the reference frame (0-360 degrees)
 * @param viewFrame - The view frame configuration
 * @param anchorLongitude - The longitude of the anchor in world coordinates (used for legacy model)
 * @returns Screen angle in degrees (0-360, where 0° = 3 o'clock)
 */
export function worldToScreenAngle(
  worldLongitude: number,
  viewFrame: ViewFrame,
  anchorLongitude: number
): number {
  // Check if using new worldZero/screenZero model
  if (viewFrame.worldZero !== undefined && viewFrame.screenZero !== undefined) {
    const { worldZero, screenZero, direction = 1, scale = 1 } = viewFrame;
    const delta = normalizeDeg(worldLongitude - worldZero);
    // Normalize delta to -180 to 180 range for shortest path
    let normalizedDelta = delta;
    if (normalizedDelta > 180) normalizedDelta -= 360;
    if (normalizedDelta < -180) normalizedDelta += 360;
    
    return normalizeDeg(screenZero + direction * normalizedDelta * scale);
  }

  // Legacy anchor-based model
  // Calculate the offset from the anchor
  let offset = worldLongitude - anchorLongitude;

  // Normalize to -180 to 180 range
  while (offset > 180) offset -= 360;
  while (offset < -180) offset += 360;

  // Apply direction (cw or ccw)
  if (viewFrame.direction === 'ccw') {
    offset = -offset;
  }

  // Convert to screen angle
  // Screen: 0° = 3 o'clock, increasing clockwise
  // We want the anchor at screenAngleDeg
  let screenAngle = viewFrame.screenAngleDeg + offset;

  // Apply angular flip if specified
  if (viewFrame.angularFlip) {
    screenAngle = viewFrame.screenAngleDeg - (screenAngle - viewFrame.screenAngleDeg);
  }

  // Normalize to 0-360
  return normalizeDeg(screenAngle);
}

/**
 * Convert a screen angle back to world longitude (inverse of worldToScreenAngle).
 * Supports both the new worldZero/screenZero model and the legacy anchor-based model.
 * Useful for hit testing or interactive positioning.
 */
export function screenToWorldLongitude(
  screenAngle: number,
  viewFrame: ViewFrame,
  anchorLongitude: number
): number {
  // Check if using new worldZero/screenZero model
  if (viewFrame.worldZero !== undefined && viewFrame.screenZero !== undefined) {
    const { worldZero, screenZero, direction = 1, scale = 1 } = viewFrame;
    const normalizedScreen = normalizeDeg(screenAngle);
    const delta = normalizedScreen - screenZero;
    // Normalize delta to -180 to 180 range
    let normalizedDelta = delta;
    if (normalizedDelta > 180) normalizedDelta -= 360;
    if (normalizedDelta < -180) normalizedDelta += 360;
    
    return normalizeDeg(worldZero + (normalizedDelta / scale) * direction);
  }

  // Legacy anchor-based model
  // Normalize screen angle
  const normalizedScreen = normalizeDeg(screenAngle);

  // Calculate offset from anchor's screen position
  let offset = normalizedScreen - viewFrame.screenAngleDeg;

  // Normalize offset to -180 to 180
  while (offset > 180) offset -= 360;
  while (offset < -180) offset += 360;

  // Apply angular flip if specified
  if (viewFrame.angularFlip) {
    offset = -offset;
  }

  // Apply direction (reverse of worldToScreenAngle)
  if (viewFrame.direction === 'ccw') {
    offset = -offset;
  }

  // Convert to world longitude
  return normalizeDeg(anchorLongitude + offset);
}

/**
 * Check if a lock rule applies to a given element.
 */
export function lockRuleApplies(
  rule: LockRule,
  elementType: 'object' | 'house' | 'sign' | 'angle',
  elementId: number | string | HouseNumber | SignNumber | AngleType
): boolean {
  if (rule.subject.kind !== elementType) {
    return false;
  }

  switch (rule.subject.kind) {
    case 'object':
      return rule.subject.ids.includes(elementId as number | string);
    case 'house':
      if (!rule.subject.indices) return true; // Lock all houses
      return rule.subject.indices.includes(elementId as HouseNumber);
    case 'sign':
      if (!rule.subject.indices) return true; // Lock all signs
      return rule.subject.indices.includes(elementId as SignNumber);
    case 'angle':
      if (!rule.subject.types) return true; // Lock all angles
      return rule.subject.types.includes(elementId as AngleType);
    default:
      return false;
  }
}

/**
 * Generate a stable key for a ViewFrame (useful for caching or serialization)
 */
export function viewFrameToKey(frame: ViewFrame): string {
  const parts = [
    frame.referenceFrame,
    `${frame.anchor.kind}:${anchorTargetToKey(frame.anchor)}`,
    frame.screenAngleDeg.toString(),
    frame.direction,
    frame.radialFlip ? 'rf' : '',
    frame.angularFlip ? 'af' : '',
  ];
  return parts.filter(Boolean).join('|');
}

/**
 * Convert an anchor target to a string key
 */
function anchorTargetToKey(anchor: AnchorTargetUnion): string {
  switch (anchor.kind) {
    case 'object':
      return String(anchor.id);
    case 'house':
      return String(anchor.index);
    case 'sign':
      return String(anchor.index);
    case 'angle':
      return anchor.type;
    default:
      return '';
  }
}

/**
 * Normalize a ViewFrame (ensure all required fields are present, validate ranges)
 */
export function normalizeViewFrame(frame: Partial<ViewFrame>): ViewFrame {
  return {
    referenceFrame: frame.referenceFrame ?? 'ecliptic',
    anchor: frame.anchor ?? { kind: 'angle', type: 'ASC' },
    screenAngleDeg: frame.screenAngleDeg ?? 180,
    direction: frame.direction ?? 'ccw',
    radialFlip: frame.radialFlip ?? false,
    angularFlip: frame.angularFlip ?? false,
  };
}

