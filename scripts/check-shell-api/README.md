# check-shell-api

Reports declarations in `packages/gnome-shell/src` that GNOME Shell no longer has.

The compiler cannot see this. A member that upstream dropped still type-checks, the declaration just describes a shell nobody runs. So the script compares every `.d.ts` with the matching `js/` file of a gnome-shell checkout at a given tag.

```sh
git clone --depth 1 --branch 51.beta https://gitlab.gnome.org/GNOME/gnome-shell.git /tmp/gnome-shell
yarn check:shell-api --shell /tmp/gnome-shell --tag 51.beta
yarn test:shell-api
```

`--shell` is any git checkout that has the tag, so an existing clone works as well. The script reads files with `git show <tag>:<path>` and never checks anything out.

## What counts as a finding

Both sides are parsed with the TypeScript compiler API, syntax only, no type checking.

| key | meaning |
| --- | --- |
| `ui/slider::Slider#step` | instance member that no class of the upstream file defines |
| `ui/slider::Slider.step` | static member, same rule |
| `ui/slider::Slider` | class that is neither a class nor any other top-level name upstream |
| `ui/search::export:Name` | exported name upstream does not export, only with `--exports` |
| `ui/foo::file` | no `js/ui/foo.js` upstream |

A member counts as defined when upstream has it as a method, accessor or field, as `this.x = …` anywhere in a class, as `Class.x = …` after the class, or as a GObject property (`Properties` in the `registerClass` metadata, `static [GObject.properties]`, or a later `GObject.registerClass({…}, Class)`), under both the `kebab-case` and the `camelCase` spelling.

Members are matched anywhere in the file, not per class: upstream often splits state over a base class and its subclasses where the declarations flatten it onto one class.

## Public and private

A member with a leading underscore is private by GJS convention. The report lists public findings first, since a wrong public declaration is what consumers actually hit, and the summary counts them. `--visibility public` or `--visibility private` narrows the report; classes, files and exports are always public.

## Limits

- It compares **names, never signatures**. A method whose parameters changed is invisible.
- It finds declarations upstream lost, **not members upstream gained** that nobody declared.
- Members set from outside their class (`obj._x = …` elsewhere) look undefined.
- Exports are off by default: several `.d.ts` files export classes that upstream keeps module-private, and removing an export breaks consumers.

## Ignore list

The check fails on every finding. `ignore.json` is for findings the script gets wrong, each with the reason. Keys may use `*`.

`--tag` is required. Any release works: `--tag 50.4` looks at another one.
