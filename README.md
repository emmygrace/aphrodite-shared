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

### Wheel Definitions

```typescript
import { standardNatalWheel, getWheelDefinition } from '@gaia-tools/aphrodite-shared';

// Use the standard natal wheel
const wheel = standardNatalWheel;

// Or get a wheel by name
const wheel2 = getWheelDefinition('standardNatal');
```

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
} from '@gaia-tools/aphrodite-shared/presets';

// Use a preset
const preset = classicPreset;

// Get preset by name
const modern = getChartPreset('modern');

// List all available presets
const names = getPresetNames(); // ['classic', 'modern', 'minimal']
```

## Available Presets

- **classic**: Traditional astrological styling with warm, vibrant colors
- **modern**: Contemporary styling with cooler tones and modern colors
- **minimal**: Clean, minimal design with muted colors

## Package Structure

```
aphrodite-shared/
  src/
    wheels/
      definitions.ts    # Wheel structure definitions
      types.ts          # Wheel/Ring type definitions
    configs/
      visual.ts         # VisualConfig defaults
      glyphs.ts         # GlyphConfig defaults
      types.ts          # Config type definitions
    presets/
      chartPresets.ts   # Complete chart presets
    types/
      index.ts          # Re-export all types
    index.ts            # Main exports
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

- `@gaia-tools/aphrodite-react` - React bindings
- `@gaia-tools/aphrodite-core` - Core rendering engine
- `@gaia-tools/aphrodite-python` - Future Python bindings
- `@gaia-tools/aphrodite-android` - Future Android bindings
- Any other platform that needs chart configuration

## License

MIT

