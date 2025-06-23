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
This project provides TypeScript type definitions for GNOME Shell Extensions. It aims to make the development of GNOME Shell Extensions in TypeScript more intuitive and efficient. The project is currently in an experimental phase and greatly benefits from community contributions.

## How It Works
The TypeScript types for the used libraries are generated from the `.gir` files using [ts-for-gir](https://github.com/gjsify/ts-for-gir) and are available as NPM packages. A significant portion of GNOME Shell is written in JavaScript, lacking `.gir` files. Therefore, these type definitions need to be manually created, which is the primary focus of this project. These additional definitions are manually written and included in this repository. Our build scripts automatically generate *.js (for ESM) and *.cjs files, Ambient Module Definitions, and index files. The structure for these files can be found on [./packages/gnome-shell/src](./packages/gnome-shell/src) and should align with the structure of GNOME Shell's JavaScript source code, available [here](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js). This setup allows contributors to primarily focus on the TypeScript type definitions, with the rest being automatically generated, including the exports in the package.json.

## Showcase
* [gTile](https://github.com/gTile/gTile) is a fully typed Gnome extension for tiling and resizing windows
* [Pano](https://github.com/oae/gnome-shell-pano) is a fully typed Gnome extension that serves as the next-gen Clipboard Manager
* [Rounded Window Corners Reborn](https://github.com/flexagoon/rounded-window-corners) is a fully typed Gnome extension for rounded window (all) corners

We are happy if you link your project through a PR here 😊

## Contributing
**Every contribution, regardless of its size, is incredibly valuable.** If you're using these types and discover missing types necessary for your GNOME Shell Extension, contributing just those types is immensely helpful. This approach ensures the types are tested in real-world scenarios, vital for a project as extensive as the GNOME Shell.

### Getting Started:
- To add TypeScript type definitions, mimic the data structure of the GNOME Shell's JavaScript source code. Visibility modifiers (`private`, `protected`, `public`) must not be included.
- Contributions can range from adding a few types you need for your project to more extensive contributions.

### Development Instructions:
Build the types:
```bash
yarn build:types
# or
cd ./packages/gnome-shell
yarn build
```

Validate the types:

```bash
yarn validate:types

# or
cd ./packages/gnome-shell
yarn validate
```

Build the example:

```bash
yarn build:example

# or
cd ./examples/hello-world
yarn build
```

Validate the example:

```bash
yarn validate:example

# or
cd ./examples/hello-world
yarn validate
```

### How to Contribute:
1. Fork this repository.
2. Create a new branch for your contribution.
3. Make your changes.
4. Submit a pull request with a clear description of the improvements or additions.

Your contributions help in building a comprehensive type definition resource for GNOME Shell Extensions, which in turn fosters a wider adoption and, subsequently, more contributions.

### Contact and Support
For any questions or support, feel free to open an issue in the repository.

Thank you for contributing to the GNOME Shell Type Definitions project!
