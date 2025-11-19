import { describe, it, expect, beforeEach } from 'vitest';
import {
  registerWheelDefinition,
  getWheelDefinition,
  listWheelDefinitions,
  unregisterWheelDefinition,
} from './registry';
import type { WheelDefinitionWithPresets } from './types';

describe('Wheel Registry', () => {
  beforeEach(() => {
    // Clear registry before each test
    // Note: This assumes there's a way to clear the registry
    // If not, we may need to add a clearRegistry function
  });

  describe('registerWheelDefinition', () => {
    it('should register a wheel definition', () => {
      const wheel: WheelDefinitionWithPresets = {
        name: 'Test Wheel',
        description: 'A test wheel',
        version: '1.0.0',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel);
      const retrieved = getWheelDefinition('Test Wheel');
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe('Test Wheel');
    });

    it('should overwrite existing wheel definition with same name', () => {
      const wheel1: WheelDefinitionWithPresets = {
        name: 'Test Wheel',
        version: '1.0.0',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      const wheel2: WheelDefinitionWithPresets = {
        name: 'Test Wheel',
        version: '2.0.0',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel1);
      registerWheelDefinition(wheel2);
      const retrieved = getWheelDefinition('Test Wheel');
      expect(retrieved?.version).toBe('2.0.0');
    });
  });

  describe('getWheelDefinition', () => {
    it('should retrieve a registered wheel definition', () => {
      const wheel: WheelDefinitionWithPresets = {
        name: 'Retrieval Test',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel);
      const retrieved = getWheelDefinition('Retrieval Test');
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe('Retrieval Test');
    });

    it('should return undefined for non-existent wheel', () => {
      const retrieved = getWheelDefinition('Non-Existent Wheel');
      expect(retrieved).toBeUndefined();
    });

    it('should be case-insensitive when retrieving', () => {
      const wheel: WheelDefinitionWithPresets = {
        name: 'Case Test',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel);
      const retrieved1 = getWheelDefinition('case test');
      const retrieved2 = getWheelDefinition('CASE TEST');
      expect(retrieved1).toBeDefined();
      expect(retrieved2).toBeDefined();
    });
  });

  describe('listWheelDefinitions', () => {
    it('should return all registered wheel definitions', () => {
      const wheel1: WheelDefinitionWithPresets = {
        name: 'List Test 1',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      const wheel2: WheelDefinitionWithPresets = {
        name: 'List Test 2',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel1);
      registerWheelDefinition(wheel2);
      
      const allWheels = listWheelDefinitions();
      expect(allWheels.length).toBeGreaterThanOrEqual(2);
      expect(allWheels.some(w => w.name === 'List Test 1')).toBe(true);
      expect(allWheels.some(w => w.name === 'List Test 2')).toBe(true);
    });
  });

  describe('unregisterWheelDefinition', () => {
    it('should remove a wheel definition', () => {
      const wheel: WheelDefinitionWithPresets = {
        name: 'Unregister Test',
        rings: [
          {
            slug: 'signs',
            type: 'signs',
            label: 'Zodiac Signs',
            orderIndex: 0,
            radiusInner: 0.85,
            radiusOuter: 1.0,
            dataSource: { kind: 'static_zodiac' },
          },
        ],
        config: {},
      };

      registerWheelDefinition(wheel);
      expect(getWheelDefinition('Unregister Test')).toBeDefined();
      
      const removed = unregisterWheelDefinition('Unregister Test');
      expect(removed).toBe(true);
      expect(getWheelDefinition('Unregister Test')).toBeUndefined();
    });

    it('should return false when trying to remove non-existent wheel', () => {
      const removed = unregisterWheelDefinition('Non-Existent');
      expect(removed).toBe(false);
    });
  });
});

