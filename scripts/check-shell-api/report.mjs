// Report what GNOME Shell has that packages/gnome-shell/src does not declare yet,
// and, with the exports on, what is declared but gone. Both directions in full.
//
// The package mirrors the shell's file tree, `js/ui/foo.js` as `src/ui/foo.d.ts`,
// so a missing file is a plain path comparison. Inside a mirrored file the exports
// are compared, and with --members the members of declared classes.
//
// A report, not a check: it exits 0 whatever it finds. When nothing is left to
// declare, turn the last line into `process.exit(count ? 1 : 0)`.
//
// Usage: node scripts/check-shell-api/report.mjs --shell <gnome-shell checkout> --tag <release> [options]
// See README.md in this directory.

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { findMissing, findStale, globMatcher, openShell, readJson, visibilityOf } from './shell.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

const { values: options } = parseArgs({
    options: {
        shell: { type: 'string' },
        tag: { type: 'string' },
        src: { type: 'string', default: join(repoRoot, 'packages/gnome-shell/src') },
        ignore: { type: 'string', default: join(here, 'report-ignore.json') },
        members: { type: 'boolean', default: false },
        visibility: { type: 'string', default: 'all' },
        json: { type: 'boolean', default: false },
    },
});

const fail = (message) => {
    console.error(`report-shell-api: ${message}`);
    process.exit(2);
};

if (!options.shell) fail('--shell <path to a gnome-shell git checkout> is required');
if (!options.tag) fail('--tag <release to report against, e.g. 51.beta> is required');
if (!['all', 'public', 'private'].includes(options.visibility)) fail('--visibility is all, public or private');

// Not planned: the keys of report-ignore.json, each with its reason.
const isNotPlanned = globMatcher(Object.keys(readJson(options.ignore, {})));
// What check-shell-api already knows to be wrong about the stale direction.
const isKnownStale = globMatcher(Object.keys(readJson(join(here, 'ignore.json'), {})));
const { tag } = options;

const shell = openShell(options.shell, tag);
const missing = findMissing(shell, options.src, { members: options.members });
const split = (keys) => ({ kept: keys.filter((key) => !isNotPlanned(key)), skipped: keys.filter(isNotPlanned) });
const files = split(missing.files);
const exports = split(missing.exports);
const members = split(missing.members.filter((key) => options.visibility === 'all' || visibilityOf(key) === options.visibility));
const gone = findStale(shell, options.src, { exports: true }).findings.filter((key) => !isKnownStale(key));
const notPlanned = files.skipped.length + exports.skipped.length + members.skipped.length;

if (options.json) {
    console.log(JSON.stringify({ tag, gone, missing: { files: files.kept, exports: exports.kept, members: members.kept }, notPlanned }, null, 2));
    process.exit(0);
}

const lines = (title, keys) => keys.length && console.log(`${title} (${keys.length})\n${keys.map((key) => `  ${key}`).join('\n')}\n`);

// `ui/foo` and `ui/status/bar` both belong to the first two path parts at most.
const byDirectory = (keys) => {
    const counts = new Map();
    for (const key of keys) {
        const parts = key
            .slice(key.indexOf(':') + 1)
            .split('::')[0]
            .split('/');
        const directory = parts.length > 2 ? parts.slice(0, 2).join('/') : parts[0];
        counts.set(directory, (counts.get(directory) ?? 0) + 1);
    }
    return [...counts]
        .sort()
        .map(([directory, count]) => `${directory} ${count}`)
        .join(', ');
};

console.log(`GNOME Shell ${tag} against ${options.src}\n`);
lines('Declared here, but gone upstream', gone);
if (files.kept.length) console.log(`Upstream files without a .d.ts: ${byDirectory(files.kept)}\n`);
lines('Upstream files without a .d.ts', files.kept);
lines('Exports upstream has that the .d.ts does not declare', exports.kept);
if (options.members) lines('Members upstream has that the declared class lacks', members.kept);
else console.log('Members of declared classes are left out, add --members to list them.\n');
console.log(`${tag}: ${gone.length} gone upstream, ${files.kept.length} files and ${exports.kept.length} exports missing${options.members ? `, ${members.kept.length} members missing` : ''}, ${notPlanned} not planned`);
