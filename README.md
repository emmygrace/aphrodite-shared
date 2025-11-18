# @gaia-tools/aphrodite-shared

Platform-agnostic wheel definitions, visual/glyph configurations, and chart presets for the Aphrodite chart rendering system.

## Overview

This package contains shared data structures and configurations that can be used across all Aphrodite platforms:

- **Wheel Definitions**: Structure definitions for chart wheels (rings, radii, data sources)
- **Visual Configurations**: Default colors, spacing, and styling options
- **Glyph Configurations**: Default symbols for signs, planets, and aspects
- **Chart Presets**: Complete, ready-to-use chart styling configurations

## Installation

```bash
npm install @gaia-tools/aphrodite-shared
```

## Usage

### Wheel Definitions (Registry System)

```typescript
import { 
  getWheelDefinition, 
  registerWheelDefinition,
  listWheelDefinitions 
} from '@gaia-tools/aphrodite-shared/wheels';

// Get a wheel by name
const wheel = getWheelDefinition('Standard Natal Wheel');

// List all available wheels
const allWheels = listWheelDefinitions();
```

### Creating Custom Wheel Definitions

You can create wheel definitions in text form (JSON) for advanced users:

```typescript
import { registerWheelDefinitionFromJSON } from '@gaia-tools/aphrodite-shared/wheels';

const myWheelJSON = `{
  "name": "My Custom Wheel",
  "description": "A custom wheel I created",
  "version": "1.0.0",
  "rings": [
    {
      "slug": "ring_signs",
      "type": "signs",
      "label": "Zodiac Signs",
      "orderIndex": 0,
      "radiusInner": 0.85,
      "radiusOuter": 1.0,
      "dataSource": { "kind": "static_zodiac" }
    }
  ],
  "defaultVisualConfig": {
    "ringWidth": 40,
    "backgroundColor": "#F0F0F0"
  }
}`;

registerWheelDefinitionFromJSON(myWheelJSON);
```

Each wheel definition can include:
- **Wheel structure**: rings, radii, data sources
- **Default visual config**: wheel-specific visual overrides
- **Default glyph config**: wheel-specific glyph overrides
- **Metadata**: version, author, tags

### Visual and Glyph Configurations

```typescript
import {
  defaultVisualConfig,
  defaultGlyphConfig,
  mergeVisualConfig,
  mergeGlyphConfig,
  type VisualConfig,
  type GlyphConfig,
} from '@gaia-tools/aphrodite-shared/configs';

// Use defaults
const visualConfig = defaultVisualConfig;
const glyphConfig = defaultGlyphConfig;

// Merge with custom config
const customVisual = mergeVisualConfig({
  ringWidth: 40,
  backgroundColor: '#F0F0F0',
});
```

### Chart Presets

```typescript
import {
  classicPreset,
  modernPreset,
  minimalPreset,
  getChartPreset,
  getPresetNames,
  createPresetFromWheel,
} from '@gaia-tools/aphrodite-shared/presets';

// Use a preset
const preset = classicPreset;

// Get preset by name
const modern = getChartPreset('modern');

// List all available presets
const names = getPresetNames(); // ['classic', 'modern', 'minimal']

// Create a preset from a wheel definition
const customPreset = createPresetFromWheel(
  'Standard Natal Wheel',
  'My Custom Preset',
  { backgroundColor: '#000000' }, // visual overrides
  { glyphSize: 16 }                // glyph overrides
);
```

Presets merge configurations in this order:
1. Base defaults (from `configs/visual.ts` and `configs/glyphs.ts`)
2. Wheel-specific defaults (from `wheel.defaultVisualConfig/defaultGlyphConfig`)
3. Preset-specific overrides (passed to `createPresetFromWheel`)

## Available Presets

- **classic**: Traditional astrological styling with warm, vibrant colors
- **modern**: Contemporary styling with cooler tones and modern colors
- **minimal**: Clean, minimal design with muted colors

## Vedic Additions

- New built-in wheel: **Vedic Natal Wheel** (nakshatra ring + whole-sign houses + natal planets + Navamsa overlay). Load it via `getWheelDefinition('Vedic Natal Wheel')`.
- Extra ring data sources:
  - `static_nakshatras` — 27 equal segments pre-aligned to the sidereal zodiac.
  - `layer_varga_planets` — renders divisional chart positions returned in `vedic.layers[layerId].vargas[vargaId]`.
- These additions pair with the backend/`iris-core` Vedic payload so the D3 renderer can display nakshatra bands and D-charts without additional wiring.

## Package Structure

```
aphrodite-shared/
  src/
    wheels/
      definitions/
        standardNatal.ts  # Individual wheel definition (self-contained)
        index.ts          # Barrel export for definitions
      definitions.ts      # Re-exports definitions
      registry.ts         # Wheel definition registry & lookup
      loader.ts           # JSON loading/export utilities
      types.ts            # Wheel/Ring type definitions
      index.ts            # Wheel module exports
    configs/
      visual.ts           # VisualConfig defaults
      glyphs.ts           # GlyphConfig defaults
      types.ts            # Config type definitions
      index.ts            # Config module exports
    presets/
      chartPresets.ts     # Complete chart presets
      index.ts            # Preset module exports
    types/
      index.ts            # Re-export all types
    index.ts              # Main exports
```

## Exports

### Main Export

```typescript
import { ... } from '@gaia-tools/aphrodite-shared';
```

### Subpath Exports

```typescript
// Wheels only
import { ... } from '@gaia-tools/aphrodite-shared/wheels';

// Configs only
import { ... } from '@gaia-tools/aphrodite-shared/configs';

// Presets only
import { ... } from '@gaia-tools/aphrodite-shared/presets';
```

## Platform Support

This package is designed to be used by:

- `@gaia-tools/aphrodite-d3` - D3-based rendering engine
- `@gaia-tools/aphrodite-python` - Future Python bindings
- `@gaia-tools/aphrodite-android` - Future Android bindings
- Any other platform that needs chart configuration

## License

MIT

