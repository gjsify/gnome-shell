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

## Looking back

A declaration tagged `@since 51` describes a shell that has not shipped at 50.4, so checking 50.4 does not report it. It is counted as "declared for a newer release" instead. A member without a tag of its own takes the tag of its class, and of several overloads the earliest tag counts. The tag is compared by major version: `51.alpha`, `51.beta` and `51.0` are all 51.

```sh
for tag in 46.0 47.0 48.0 49.0 50.0 51.beta; do yarn check:shell-api --shell /tmp/gnome-shell --tag $tag | tail -1; done
```

What a look back reports is therefore a declaration that is untagged but missing at that release: either its `@since` tag is missing, or it never existed. Untagged is read as "46 or earlier", the oldest release the package covers.

A pre-release can report declarations that arrived later in the same cycle, since the tag only says "51". `51.alpha` is such a case; use the final release or the latest beta.

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

## Report: what is not declared yet

`check-shell-api` looks one way, from the declarations to the shell. It cannot say that something is missing, and a clean run never means the package is complete. `report-shell-api` looks both ways and never fails.

The package mirrors the shell's file tree, `js/ui/foo.js` as `src/ui/foo.d.ts`, so a missing file is a path comparison. Inside a mirrored file it compares the exports, and with `--members` the members of declared classes.

```sh
yarn report:shell-api --shell /tmp/gnome-shell --tag 51.beta
yarn report:shell-api --shell /tmp/gnome-shell --tag 51.beta --members
yarn report:shell-api --shell /tmp/gnome-shell --tag 51.beta --members --visibility all
```

| key | meaning |
| --- | --- |
| `file:ui/screenShield` | upstream has `js/ui/screenShield.js`, the package has no `src/ui/screenShield.d.ts` |
| `export:ui/main::breakManager` | upstream exports it, the `.d.ts` does not declare it |
| `member:ui/slider::Slider#foo` | upstream class member the declared class lacks, only with `--members` |

A private member (leading underscore) is optional to declare. By default the report lists only public members that are missing; `--visibility all` adds the private ones. A private member that is declared must still exist upstream, which `check-shell-api` enforces.

The report also lists declarations gone upstream, with exports on. It exits 0 whatever it finds, so it is never a gate: being unfinished is the normal state, and the number is the progress. Once nothing is left to declare, make the last line fail on a finding.

`report-ignore.json` lists what is not planned, each with the reason: `dbusServices` and `portalHelper` are separate processes, outside the shell process an extension lives in. `gdm` is not listed: it runs in the shell process and can be imported. `--json` gives the same for tools.

Both commands compare names, so a declared export that has the wrong shape still counts as declared.
