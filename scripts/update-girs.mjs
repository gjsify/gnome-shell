// Pin every @girs/* dependency in the given package.json files to its npm
// `latest` dist-tag, as an EXACT version (no caret/tilde range).
//
// Why exact pins?
// @girs versions concatenate the library version and the ts-for-gir version into
// a single semver string, e.g. "2.88.0-4.0.4". That makes the ts-for-gir part a
// *prerelease tag*. By semver precedence a stable suffix like "-4.0.4" sorts
// LOWER than a release-candidate suffix like "-4.0.0-rc.17" (a numeric identifier
// such as "4" has lower precedence than an alphanumeric one such as "0-rc"). As a
// result any caret/tilde range happily resolves back to the newest release
// candidate and the `latest` dist-tag is never selected. Exact pins are the only
// reliable way to track the stable releases — and it matches how the @girs
// packages pin their own siblings.
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
        if (latest !== ver) allChanges.push(`${name}: ${ver} -> ${latest}`);
        return pre + latest + post;
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
