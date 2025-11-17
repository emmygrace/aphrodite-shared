/**
 * Wheel definitions module.
 * 
 * This file now re-exports from the registry system.
 * Individual wheel definitions are in the definitions/ subdirectory.
 * 
 * @deprecated Use the registry system directly: import { getWheelDefinition } from './registry'
 */

export * from './registry';
export * from './definitions';

