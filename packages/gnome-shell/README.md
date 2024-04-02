<p align="center">
  <img src="https://raw.githubusercontent.com/gjsify/gnome-shell/main/.github/avatar_x8.png" />
  <h1 align="center">TypeScript <small>for</small> GNOME Shell</h1>
</p>

<p align="center">
  <a href="https://github.com/gjsify/gnome-shell/actions"><img src="https://img.shields.io/github/actions/workflow/status/gjsify/gnome-shell/ci.yml" /></a>
  <a href="https://github.com/gjsify/gnome-shell/blob/main/LICENSE"><img src="https://img.shields.io/github/license/gjsify/gnome-shell" /></a>
  <a href="https://www.npmjs.com/package/@girs/gnome-shell"><img src="https://img.shields.io/npm/v/@girs/gnome-shell" /></a>
  <a href="https://www.npmjs.com/package/@girs/gnome-shell"><img src="https://img.shields.io/npm/dw/@girs/gnome-shell" /></a>
</p>

<p align="center">Write GNOME Shell Extensions in TypeScript</p>

## Overview
This NPM package, `@girs/gnome-shell`, provides TypeScript type definitions for developing GNOME Shell Extensions. It is tailored to enhance the development experience for those using TypeScript. The types are currently in an experimental phase, and community contributions play a significant role in their refinement and expansion.

## Installation
To integrate these type definitions into your project, install the package via NPM:

```bash
npm install @girs/gnome-shell --save-dev
```

## Usage

To use this package in your project, you can import it using either ESM or CommonJS syntax:

ESM syntax:

```ts
import GnomeShell from '@girs/gnome-shell';
```

CommonJS syntax:

```ts
const GnomeShell = require('@girs/gnome-shell');
```

## Ambient Module Type Definitions

This package also includes Ambient module type definitions, allowing for imports similar to standard JavaScript practices. This method can be preferable for some developers and does not necessarily require a bundler.

To import all Ambient modules at once, use:

```ts
import '@girs/gnome-shell/ambient';
```

For specific Ambient module imports, such as:
    
```ts
import '@girs/gnome-shell/ui/ambient';  // For UI-related types
```

or even more specifically:

```ts
import '@girs/gnome-shell/ui/components/automountManager/ambient';  // For a specific component
```

These Ambient types can be integrated into your project by including them in your `tsconfig.json` or by importing them at the top of your main project file, typically `extension.ts`.

## GNOME Shell globals

GNOME Shell defines some specific globals and monkey-patches some built-in GJS objects.
To import the corresponding types, use:

```ts
import '@girs/gnome-shell/extensions/global';
```

Note that these globals are not available in the environment that runs the preferences code from `prefs.js`.  If You make use of these global types take care in `prefs.js`.

## ESM vs. CommonJS in GJS

GJS supports two import syntaxes: the modern ESM syntax and the traditional global imports syntax. This package is designed to accommodate both, depending on your project's setup and requirements.

* **CommonJS:** If your bundler (like esbuild) is configured for CommonJS, it converts the imports to GJS-specific global imports syntax (`const moduleName = imports.gi[moduleName]`). This syntax differs from Node.js's traditional `require` but aligns well with CommonJS format. It's suitable for GNOME Shell versions prior to 45, which do not support ESM.

* **ESM:** For GNOME Shell 45 and later, you can utilize the ESM syntax. Ensure your bundler is set up to handle ESM correctly.

The `@girs/*` types include both `*.cjs` and `*.js` files, corresponding to CommonJS and ESM syntaxes, respectively. Proper bundler configuration is crucial to leverage the appropriate syntax for your project.

## Example and Bundling

For an example of how to bundle an extension, refer to our [Hello World example](https://github.com/gjsify/gnome-shell/tree/main/examples/hello-world), which uses [esbuild](https://esbuild.github.io/) (other bundlers can also be used). This example demonstrates effective bundling practices for ESM in the context of GJS and GNOME Shell extensions.

## Contributing

We welcome contributions to improve and expand the type definitions in this package. If you encounter missing types necessary for your extension or have suggestions for enhancements, please consider contributing. Your input is invaluable in making this resource more comprehensive for all users.

or information on how to contribute, please refer to the [main repository's README](https://github.com/gjsify/gnome-shell).

## Contact and Support

For questions or support related to this package, feel free to open an issue in the repository. We appreciate your feedback and contributions to the GNOME Shell TypeScript Type Definitions project!

Thank you for using `@girs/gnome-shell`!