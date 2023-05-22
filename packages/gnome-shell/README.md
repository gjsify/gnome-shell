
# GNOME Shell TypeScript Type Definitions

GJS TypeScript type definitions for GNOME Shell Extensions.

The types are currently in a very experimental state and rely on your contributions. Therefore, this project can be seen as a basic structure for further development. The typescript types of the `.gir` files [are generated](https://www.npmjs.com/package/@girs/gjs) with [ts-for-gir](https://github.com/gjsify/ts-for-gir), the rest is written by hand and contained in this repository.

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

If you prefer CommonJS, you can also use this:

```ts
const GnomeShell = require('@girs/gnome-shell');
```

GNOME Shell extensions currently [do not yet support ESM imports](https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1499) and instead rely on the global `imports` [variable from GJS](https://gjs.guide/guides/gjs/intro.html). However, you can still use ESM syntax in TypeScript, but you need to ensure that your bundler translates these imports to CommonJS. We recommended to use [esbuild](https://esbuild.github.io/), which we also use [in our example](examples/hello-world).