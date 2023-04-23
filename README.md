
# GNOME Shell Type Definitions

GJS TypeScript type definitions for GNOME Shell Extensions.

The types are currently in a very experimental state and rely on your contributions. Therefore, this project can be seen as a basic structure for further development.

## Install

To use this type definitions, install them with NPM like this:
```bash
npm install @girs/gnome-shell
```

## Usage

You can import this package into your project like this:

```ts
import GnomeShell from '@girs/gnome-shell';
```

Or if you prefer CommonJS, you can also use this:

```ts
const GnomeShell = require('@girs/gnome-shell');
```

> GNOME Shell extensions currently do not support ESM imports and instead rely on the global imports variable. However, you can still use ESM syntax in TypeScript, but you need to ensure that your bundler translates these imports to CommonJS.

Depending on your project configuration, it is recommended to use a bundler like [esbuild](https://esbuild.github.io/).