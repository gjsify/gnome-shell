// Bump every @girs/* dependency in the given package.json files to a caret range
// (`^x.y.z`) on its npm `latest` dist-tag.
//
// Why caret ranges?
// Since ts-for-gir 4.1 (gjsify/ts-for-gir#432) @girs packages version as the
// ts-for-gir release alone (e.g. "4.1.0"; the targeted library version lives in a
// `libraryVersion` field). On that release-only scheme a caret range dedupes
// across stable releases AND excludes prereleases (`4.2.0-rc.1` does not satisfy
// `^4.1.0`) — on Yarn 4 too. It also matches how the @girs packages now pin their
// own siblings (e.g. `@girs/clutter-18` -> `"@girs/gobject-2.0": "^4.1.0"`), so
// transitive resolution dedupes to a single copy.
//
// This job advances the caret *floor* to the latest release: it refreshes the
// declared minimum and gives the workflow a concrete diff to validate the new
// types against. Exact pins are deliberately avoided — an exact top-level pin
// re-diverges from the transitive `^x` deps as soon as a newer patch ships, which
// re-opens the duplicate-copy issue (gjsify/ts-for-gir#431).
//
// Scope: only updates the version of @girs/* keys that already exist. It does not
// add, remove or rename packages (namespace changes like cogl-2.0 -> cogl-18 are
// rare correctness fixes and stay manual), and it never touches protocol
// specifiers such as "workspace:".
//
// Usage: node scripts/update-girs.mjs <package.json> [<package.json> ...]

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const files = process.argv.slice(2);
if (files.length === 0) {
    console.error('usage: node scripts/update-girs.mjs <package.json> [<package.json> ...]');
    process.exit(2);
}

// "@girs/<name>": "<version-or-range>"
const re = /(["']@girs\/[^"']+["']\s*:\s*["'])([^"']+)(["'])/g;

const cache = new Map();
const allChanges = [];

function latestVersion(name) {
    if (cache.has(name)) return cache.get(name);
    let version = '';
    try {
        // execFileSync (no shell) — the package name is never passed through a shell.
        version = execFileSync('npm', ['view', name, 'dist-tags.latest'], { encoding: 'utf8' }).trim();
    } catch {
        version = '';
    }
    cache.set(name, version);
    return version;
}

for (const file of files) {
    let text = readFileSync(file, 'utf8');
    text = text.replace(re, (full, pre, ver, post) => {
        const name = pre.match(/@girs\/[^"']+/)[0];
        // Leave protocol-based specifiers untouched (workspace:, npm:, file:, link:, …).
        if (ver.includes(':')) return full;
        const latest = latestVersion(name);
        if (!latest) {
            console.error(`WARN: could not resolve latest for ${name}, leaving as "${ver}"`);
            return full;
        }
        // Caret on the release-only version (dedupes stable releases, excludes rc).
        const next = `^${latest}`;
        if (next !== ver) allChanges.push(`${name}: ${ver} -> ${next}`);
        return pre + next + post;
    });
    writeFileSync(file, text);
}

if (allChanges.length) {
    // De-duplicate (the same package can appear in more than one file).
    for (const line of [...new Set(allChanges)].sort()) console.log(line);
    console.log(`\n${new Set(allChanges).size} dependency change(s)`);
} else {
    console.log('All @girs dependencies already up to date.');
}
