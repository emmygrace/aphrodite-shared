/**
 * Predefined orientation presets for common chart viewing preferences.
 */

import type { OrientationPreset, ViewFrame, LockRule } from './types.js';

/**
 * ASC at 9 o'clock (left) - Traditional Western astrology default
 * Houses are fixed, planets move through them
 */
export const presetAscLeft: OrientationPreset = {
  id: 'asc-left',
  name: 'ASC at 9 o\'clock',
  description: 'Traditional Western astrology orientation with Ascendant at the left (9 o\'clock). Houses are fixed, planets animate through them.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'angle', type: 'ASC' },
    screenAngleDeg: 180, // 9 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'house' },
      frame: 'houses',
      mode: 'follow-anchor',
    },
  ],
};

/**
 * ASC at 3 o'clock (right) - Alternative orientation
 * Houses are fixed, planets move through them
 */
export const presetAscRight: OrientationPreset = {
  id: 'asc-right',
  name: 'ASC at 3 o\'clock',
  description: 'Alternative orientation with Ascendant at the right (3 o\'clock). Houses are fixed, planets animate through them.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'angle', type: 'ASC' },
    screenAngleDeg: 0, // 3 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'house' },
      frame: 'houses',
      mode: 'follow-anchor',
    },
  ],
};

/**
 * MC at top (12 o'clock) - Midheaven-centered view
 * Houses follow MC, signs rotate
 */
export const presetMcTop: OrientationPreset = {
  id: 'mc-top',
  name: 'MC at Top',
  description: 'Midheaven-centered view with MC at the top (12 o\'clock). Houses follow MC, signs rotate underneath.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'angle', type: 'MC' },
    screenAngleDeg: 90, // 12 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'house' },
      frame: 'houses',
      mode: 'follow-anchor',
    },
  ],
};

/**
 * MC at top (12 o'clock) - Mirrored view using worldZero/screenZero model
 * Houses are numbered from 180° CCW (reversed house numbering)
 * This demonstrates the new worldZero/screenZero model with direction: -1 for mirroring
 * Note: worldZero will be resolved from MC longitude at runtime
 */
export const presetMcTopMirrored: OrientationPreset = {
  id: 'mc-top-mirrored',
  name: 'MC at Top (Mirrored)',
  description: 'MC at top with mirrored orientation. Houses numbered from 180° CCW. Uses worldZero/screenZero model with direction: -1.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'angle', type: 'MC' }, // worldZero will be resolved from MC at runtime
    screenZero: 90, // MC at top (12 o'clock)
    direction: -1, // Mirror: world increases CW instead of CCW
    // Note: worldZero will be set dynamically from MC longitude when chart is available
  },
  locks: [
    {
      subject: { kind: 'angle', types: ['ASC'] },
      frame: 'screen',
      mode: 'exact',
    },
  ],
};

/**
 * Aries at top (12 o'clock) - Zodiac-centric view
 * Signs are fixed, houses rotate
 */
export const presetAriesTop: OrientationPreset = {
  id: 'aries-top',
  name: 'Aries at Top',
  description: 'Zodiac-centric view with Aries at the top (12 o\'clock). Signs are fixed, houses rotate underneath.',
  frame: {
    referenceFrame: 'signs',
    anchor: { kind: 'sign', index: 0 }, // Aries
    screenAngleDeg: 90, // 12 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'sign' },
      frame: 'signs',
      mode: 'exact',
    },
  ],
};

/**
 * Fixed houses - Houses locked to screen, signs rotate
 * Useful for mundane charts
 */
export const presetFixedHouses: OrientationPreset = {
  id: 'fixed-houses',
  name: 'Fixed Houses',
  description: 'Houses are locked to screen positions, signs rotate underneath. Useful for mundane and event charts.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'house', index: 1 }, // House 1
    screenAngleDeg: 180, // 9 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'house' },
      frame: 'screen',
      mode: 'exact',
    },
  ],
};

/**
 * Fixed signs - Signs locked to screen, houses rotate
 * Useful for transit overlays
 */
export const presetFixedSigns: OrientationPreset = {
  id: 'fixed-signs',
  name: 'Fixed Signs',
  description: 'Signs are locked to screen positions, houses rotate underneath. Useful for transit overlays and zodiac-centric analysis.',
  frame: {
    referenceFrame: 'signs',
    anchor: { kind: 'sign', index: 0 }, // Aries
    screenAngleDeg: 90, // 12 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'sign' },
      frame: 'screen',
      mode: 'exact',
    },
  ],
};

/**
 * Sun-locked - Sun centered at chosen angle, other bodies animate relative to it
 */
export const presetSunLocked: OrientationPreset = {
  id: 'sun-locked',
  name: 'Sun Locked',
  description: 'Sun is centered at a chosen angle, other planets animate relative to it. Useful for solar-focused analysis.',
  frame: {
    referenceFrame: 'ecliptic',
    anchor: { kind: 'object', id: 0 }, // Sun (planet index 0)
    screenAngleDeg: 90, // 12 o'clock by default
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'object', ids: [0] }, // Sun
      frame: 'screen',
      mode: 'exact',
    },
  ],
};

/**
 * Biwheel Natal/Transit - Outer wheel with natal houses fixed, inner wheel with transit signs
 * Note: This is a template - actual biwheel implementation may need separate ViewFrames per layer
 */
export const presetBiwheelNatalTransit: OrientationPreset = {
  id: 'biwheel-natal-transit',
  name: 'Biwheel Natal/Transit',
  description: 'Outer wheel: natal houses fixed. Inner wheel: transit signs fixed. For comparing natal and transit charts.',
  frame: {
    referenceFrame: 'houses',
    anchor: { kind: 'angle', type: 'ASC' },
    screenAngleDeg: 180, // 9 o'clock
    direction: 'ccw',
  },
  locks: [
    {
      subject: { kind: 'house' },
      frame: 'houses',
      mode: 'follow-anchor',
    },
  ],
};

/**
 * Default preset - uses ASC at 9 o'clock
 */
export const presetDefault = presetAscLeft;

/**
 * All available presets
 */
export const allPresets: OrientationPreset[] = [
  presetAscLeft,
  presetAscRight,
  presetMcTop,
  presetMcTopMirrored,
  presetAriesTop,
  presetFixedHouses,
  presetFixedSigns,
  presetSunLocked,
  presetBiwheelNatalTransit,
];

/**
 * Get a preset by ID
 */
export function getPresetById(id: string): OrientationPreset | undefined {
  return allPresets.find((p) => p.id === id);
}

/**
 * Get a preset by name (case-insensitive)
 */
export function getPresetByName(name: string): OrientationPreset | undefined {
  return allPresets.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

