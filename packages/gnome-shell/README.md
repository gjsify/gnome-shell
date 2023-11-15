
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

## ESM vs. CommonJS

GJS supports two different import syntaxes. The new modern ESM syntax and the old global imports syntax.

In TypeScript projects for GJS and GNOME Shell extensions, you have the flexibility to use `ESM` syntax and then decide the import syntax for your bundled file. If your bundler is configured to use `CommonJS`, it will convert to the GJS-specific global imports syntax, like `const moduleName = imports.gi[moduleName]`. This is different from the traditional `require` syntax seen in Node.js. The global imports syntax is chosen because it aligns with the CommonJS format supported by NPM, which is used for the generated type definitions and this package.

On the other hand, if you configure your bundler to use ESM, it will retain the ESM import syntax. It's crucial to ensure that your bundler is set up to correctly translate and bundle these imports into either CommonJS or ESM format, depending on your project's requirements.

This approach is particularly important due to the `@girs` types, which include both `*.cjs `files, using the GJS global imports syntax, and `*.js` files, which utilize the ESM syntax. By appropriately setting up your bundler, you can control which syntax—CommonJS or ESM—is used in your project. The choice of CommonJS in this context is also due to the similarity between the GJS-specific global imports and CommonJS syntax, allowing for easier management and bundling in these specific types of projects.

If you build an GNOME Shell extension for the GNOME Shell < 45, you need to use CommonJS because it has [no support for ESM](https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1499) and you need to use the global imports syntax, but since GNOME Shell 45 you can use the ESM syntax.

We recommended to use [esbuild](https://esbuild.github.io/) for bundling, which we also use [in our example](examples/hello-world).