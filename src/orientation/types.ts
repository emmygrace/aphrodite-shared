/**
 * Orientation and view frame types for chart rendering.
 * These types define how charts are oriented and what elements are locked during animation.
 */

export type ReferenceFrame = 'ecliptic' | 'houses' | 'signs' | 'angles';

/**
 * Planet/object identifier - matches the object IDs used in the system
 * Standard planets: 0=Sun, 1=Moon, 2=Mercury, 3=Venus, 4=Mars, 5=Jupiter, 6=Saturn, 7=Uranus, 8=Neptune, 9=Pluto
 * Special objects: 'chiron', 'north_node', 'south_node', 'vertex', etc.
 */
export type AstroObjectId = number | string;

/**
 * House index (1-12, but stored as 0-11 internally)
 */
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Sign index (0-11, where 0 = Aries, 11 = Pisces)
 */
export type SignNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Angle type identifier
 */
export type AngleType = 'ASC' | 'DESC' | 'MC' | 'IC';

/**
 * Defines what element is anchored (pinned) to a specific screen position
 */
export interface AnchorTarget {
  kind: 'object';
  id: AstroObjectId;
}
export interface AnchorTargetHouse {
  kind: 'house';
  index: HouseNumber;
}
export interface AnchorTargetSign {
  kind: 'sign';
  index: SignNumber;
}
export interface AnchorTargetAngle {
  kind: 'angle';
  type: AngleType;
}

export type AnchorTargetUnion =
  | AnchorTarget
  | AnchorTargetHouse
  | AnchorTargetSign
  | AnchorTargetAngle;

/**
 * ViewFrame maps world longitudes to screen angles.
 * It defines the reference frame, what is anchored, and where it appears on screen.
 */
export interface ViewFrame {
  /**
   * The reference frame for longitude calculations
   * - 'ecliptic': Use ecliptic longitudes directly
   * - 'houses': Use house cusp positions
   * - 'signs': Use sign boundaries (0° Aries, 30° Taurus, etc.)
   * - 'angles': Use angular positions (ASC, MC, etc.)
   */
  referenceFrame: ReferenceFrame;

  /**
   * Which object/sign/house/angle is pinned to a specific screen position
   */
  anchor: AnchorTargetUnion;

  /**
   * Polar angle where the anchor appears on screen
   * 0° = 3 o'clock (right), 90° = 12 o'clock (top), 180° = 9 o'clock (left), 270° = 6 o'clock (bottom)
   */
  screenAngleDeg: number;

  /**
   * Direction of sign order around the wheel
   * 'cw' = clockwise, 'ccw' = counterclockwise
   */
  direction: 'cw' | 'ccw';

  /**
   * Optional: Flip the radial mapping (inner/outer radius swap)
   */
  radialFlip?: boolean;

  /**
   * Optional: Mirror across the anchor axis
   */
  angularFlip?: boolean;

  /**
   * Optional: World longitude that maps to screenZero (alternative to anchor-based model)
   * If provided along with screenZero, uses direct worldZero/screenZero mapping instead of anchor resolution
   */
  worldZero?: number;

  /**
   * Optional: Screen angle for worldZero (0° = right, 90° = top, 180° = left, 270° = bottom)
   * Must be provided with worldZero to use the simplified model
   */
  screenZero?: number;

  /**
   * Optional: Direction multiplier for world-to-screen mapping
   * +1 = world increases CCW on screen (default), -1 = world increases CW (mirror)
   * Only used when worldZero and screenZero are provided
   */
  direction?: 1 | -1;

  /**
   * Optional: Scale factor - degrees of world per degree of screen
   * Default is 1 (1:1 mapping). Allows zooming if needed.
   * Only used when worldZero and screenZero are provided
   */
  scale?: number;
}

/**
 * Lock frame - defines what coordinate system the lock operates in
 */
export type LockFrame = 'world' | 'houses' | 'signs' | 'screen';

/**
 * Subject of a lock rule - what element(s) are being locked
 */
export interface LockSubjectObject {
  kind: 'object';
  ids: AstroObjectId[];
}
export interface LockSubjectHouse {
  kind: 'house';
  indices?: HouseNumber[]; // If undefined, locks all houses
}
export interface LockSubjectSign {
  kind: 'sign';
  indices?: SignNumber[]; // If undefined, locks all signs
}
export interface LockSubjectAngle {
  kind: 'angle';
  types?: AngleType[]; // If undefined, locks all angles
}

export type LockSubject =
  | LockSubjectObject
  | LockSubjectHouse
  | LockSubjectSign
  | LockSubjectAngle;

/**
 * LockRule describes what is visually fixed vs moving during animation
 */
export interface LockRule {
  /**
   * What element(s) are being locked
   */
  subject: LockSubject;

  /**
   * The coordinate frame in which the lock operates
   * - 'world': Lock to world/ecliptic coordinates
   * - 'houses': Lock relative to house positions
   * - 'signs': Lock relative to sign positions
   * - 'screen': Lock to screen coordinates (completely fixed)
   */
  frame: LockFrame;

  /**
   * Lock mode
   * - 'exact': Lock to exact position in the specified frame
   * - 'follow-anchor': Lock relative to the anchor, maintaining offset
   */
  mode: 'exact' | 'follow-anchor';

  /**
   * Optional: When mode is 'follow-anchor', specify which anchor to follow
   * If not specified, uses the ViewFrame's anchor
   */
  followAnchor?: AnchorTargetUnion;
}

/**
 * Orientation preset - a friendly configuration combining ViewFrame and LockRules
 */
export interface OrientationPreset {
  id: string;
  name: string;
  description: string;
  frame: ViewFrame;
  locks: LockRule[];
}

/**
 * Chart snapshot - contains chart data needed for orientation calculations
 * This type matches ChartDataForOrientation from aphrodite-core
 */
export interface ChartSnapshot {
  /**
   * Planet longitudes: planet index -> longitude (0-360)
   */
  planetLongitudes?: Map<number | string, number>;

  /**
   * House cusps: house number (1-12) -> cusp longitude (0-360)
   */
  houseCusps?: Map<HouseNumber, number>;

  /**
   * Angle longitudes: angle type -> longitude (0-360)
   */
  angleLongitudes?: Map<AngleType, number>;
}

/**
 * Orientation trigger - defines when an orientation rule should fire
 */
export type OrientationTrigger =
  | { type: 'ascLeavesHouse'; house: number }
  | { type: 'planetCrossesHouse'; planet: string; house: number }
  | { type: 'planetCrossesAngle'; planet: string; angle: AngleType }
  | { type: 'custom'; id: string };

/**
 * Orientation effect - defines what happens when a rule triggers
 */
export type OrientationEffect =
  | { type: 'rotate'; wheel: 'zodiac' | 'houses' | 'all'; delta: number }
  | { type: 'setViewFrame'; viewFrame: ViewFrame }
  | { type: 'mirror'; wheel: 'zodiac' | 'houses' | 'all' }
  | { type: 'snapHouseToAngle'; house: HouseNumber; screenAngle: number }
  | { type: 'snapAnchorToAngle'; anchor: AngleType; screenAngle: number };

/**
 * Orientation rule - combines a trigger and effect for dynamic view frame changes
 */
export interface OrientationRule {
  /**
   * Unique identifier for this rule
   */
  id: string;

  /**
   * Condition that triggers this rule
   */
  trigger: OrientationTrigger;

  /**
   * Effect to apply when rule triggers
   */
  effect: OrientationEffect;

  /**
   * Optional: Animation duration in milliseconds
   */
  animationMs?: number;

  /**
   * Optional: Additional locks that apply while this rule's effect is active
   */
  locks?: LockRule[];
}

/**
 * Orientation program - defines base frame, locks, and dynamic rules
 */
export interface OrientationProgram {
  /**
   * Base view frame (starting point)
   */
  baseFrame: ViewFrame;

  /**
   * Base lock rules
   */
  locks?: LockRule[];

  /**
   * Dynamic rules that modify the frame based on chart state
   */
  rules?: OrientationRule[];
}

/**
 * Runtime state for orientation program evaluation
 */
export interface OrientationRuntimeState {
  /**
   * Set of rule IDs that have been applied (for one-time transitions)
   */
  appliedRuleIds: Set<string>;

  /**
   * Previous house positions for tracking transitions
   * Key format: "planetId:houseNumber" or "ASC:houseNumber"
   */
  previousHousePositions?: Map<string, number>;
}

