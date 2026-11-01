// Report declarations in packages/gnome-shell/src that GNOME Shell no longer has.
//
// The compiler cannot see this: a declared member that upstream dropped still
// type-checks, it just describes a shell nobody runs. So compare each `.d.ts`
// with the matching `js/` file of a gnome-shell checkout at a given tag.
//
// Usage: node scripts/check-shell-api/cli.mjs --shell <gnome-shell checkout> [options]
// See README.md in this directory.

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { findStale, globMatcher, openShell, readJson, visibilityOf } from './shell.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

const { values: options } = parseArgs({
    options: {
        shell: { type: 'string' },
        tag: { type: 'string' },
        src: { type: 'string', default: join(repoRoot, 'packages/gnome-shell/src') },
        ignore: { type: 'string', default: join(here, 'ignore.json') },
        exports: { type: 'boolean', default: false },
        visibility: { type: 'string', default: 'all' },
        json: { type: 'boolean', default: false },
    },
});

const fail = (message) => {
    console.error(`check-shell-api: ${message}`);
    process.exit(2);
};

if (!options.shell) fail('--shell <path to a gnome-shell git checkout> is required');
if (!options.tag) fail('--tag <release to check against, e.g. 51.beta> is required');
if (!['all', 'public', 'private'].includes(options.visibility)) fail('--visibility is all, public or private');

const ignore = readJson(options.ignore, {});
const isIgnored = globMatcher(Object.keys(ignore));
const tag = options.tag;

const { findings: found, skipped: skippedNewer } = findStale(openShell(options.shell, tag), options.src, { exports: options.exports });

const visible = (key) => options.visibility === 'all' || visibilityOf(key) === options.visibility;

const ignored = found.filter(isIgnored);
const findings = found.filter((key) => !isIgnored(key) && visible(key));

if (options.json) {
    console.log(JSON.stringify({ tag, findings, ignored: ignored.length, newer: skippedNewer.length }, null, 2));
} else {
    for (const visibility of ['public', 'private']) {
        const group = findings.filter((key) => visibilityOf(key) === visibility);
        if (group.length) console.log(`Declared, but not in GNOME Shell ${tag} [${visibility}]\n${group.map((key) => `  ${key}`).join('\n')}\n`);
    }
    const publicCount = findings.filter((key) => visibilityOf(key) === 'public').length;
    console.log(`${tag}: ${findings.length} stale (${publicCount} public), ${ignored.length} ignored, ${skippedNewer.length} declared for a newer release`);
}
process.exit(findings.length ? 1 : 0);
