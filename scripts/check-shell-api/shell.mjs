// What the two commands share: reading a gnome-shell checkout at a tag, walking
// the declarations of this package, and comparing them in either direction.
//
//   findStale    declared here, gone upstream    (cli.mjs)
//   findMissing  defined upstream, not declared  (coverage.mjs)

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { declaredIn, definedIn, diffModule } from './parse.mjs';

export const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);

// Keys may use `*`, as in `file:gdm/*`.
export function globMatcher(patterns) {
    const matchers = patterns.map((pattern) => new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\#]/g, '\\$&').replace(/\*/g, '.*') + '$'));
    return (key) => matchers.some((matcher) => matcher.test(key));
}

// A leading underscore marks a member private by GJS convention. Classes, files
// and exports are always public.
export const visibilityOf = (key) => (/[#.][_#][^#.]*$/.test(key) ? 'private' : 'public');

// 50.4, 51.beta and 49.alpha.0 are all releases of their major version.
export const majorOf = (tag) => Number.parseInt(tag, 10);

// Reads files with `git show <tag>:<path>`, so any clone that has the tag works
// and nothing is checked out.
export function openShell(dir, tag) {
    const git = (...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    const files = new Set(
        git('ls-tree', '-r', '--name-only', tag, 'js')
            .split('\n')
            .filter((path) => path.endsWith('.js'))
    );
    return { tag, files, read: (path) => git('show', `${tag}:${path}`) };
}

export function declarationFiles(dir) {
    const files = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'types') files.push(...declarationFiles(path));
        } else if (entry.name.endsWith('.d.ts')) files.push(path);
    }
    return files.sort();
}

export function findStale(shell, src, { exports = false } = {}) {
    const findings = [];
    const skipped = [];
    const shellMajor = majorOf(shell.tag);
    for (const file of declarationFiles(src)) {
        const module = relative(src, file).replace(/\.d\.ts$/, '');
        const upstream = `js/${module}.js`;
        if (!shell.files.has(upstream)) {
            findings.push(`${module}::file`);
            continue;
        }
        const result = diffModule(module, declaredIn(readFileSync(file, 'utf8'), file), definedIn(shell.read(upstream), upstream), { exports, shellMajor });
        findings.push(...result.findings);
        skipped.push(...result.skipped);
    }
    return { findings, skipped };
}

// Upstream modules without a `.d.ts` at the mirrored path, exports a module
// has that its `.d.ts` does not declare, and, on request, members of declared
// classes that the `.d.ts` lacks. Keys:
//   `file:ui/screenShield`              no src/ui/screenShield.d.ts
//   `export:ui/main::getThemeStylesheet`  upstream export nobody declares
//   `member:ui/slider::Slider#foo`      upstream member of a declared class
export function findMissing(shell, src, { members = false } = {}) {
    const missing = { files: [], exports: [], members: [] };
    for (const upstream of [...shell.files].sort()) {
        const module = upstream.slice('js/'.length, -'.js'.length);
        const declarations = join(src, `${module}.d.ts`);
        if (!existsSync(declarations)) {
            missing.files.push(`file:${module}`);
            continue;
        }
        const declared = declaredIn(readFileSync(declarations, 'utf8'), declarations);
        const defined = definedIn(shell.read(upstream), upstream);
        const declaredNames = new Set([...declared.exports, ...declared.classes.keys()]);
        for (const name of defined.exports) {
            if (name !== 'default' && !declaredNames.has(name)) missing.exports.push(`export:${module}::${name}`);
        }
        if (!members) continue;
        const declaredMembers = new Set([...declared.classes.values()].flatMap((keys) => [...keys]));
        for (const [className, keys] of defined.classes) {
            if (!declared.classes.has(className)) continue;
            for (const key of keys) {
                if (!declaredMembers.has(key)) missing.members.push(`member:${module}::${className}${key}`);
            }
        }
    }
    return missing;
}
