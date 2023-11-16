
# GNOME Shell Type Definitions

GJS TypeScript type definitions for GNOME Shell Extensions.

The types are currently in a very experimental state and rely on your contributions. Therefore, this project can be seen as a basic structure for further development. The typescript types of the `.gir` files [are generated](https://www.npmjs.com/package/@girs/gjs) with [ts-for-gir](https://github.com/gjsify/ts-for-gir), the rest is written by hand and contained in this repository.

This is a monorepo for [@girs/gnome-shell](https://www.npmjs.com/package/@girs/gnome-shell), for more information see [./packages/gnome-shell](packages/gnome-shell/README.md).

## Development

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