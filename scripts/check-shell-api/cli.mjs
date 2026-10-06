// Report declarations in packages/gnome-shell/src that GNOME Shell no longer has.
//
// The compiler cannot see this: a declared member that upstream dropped still
// type-checks, it just describes a shell nobody runs. So compare each `.d.ts`
// with the matching `js/` file of a gnome-shell checkout at a given tag.
//
// Usage: node scripts/check-shell-api/cli.mjs --shell <gnome-shell checkout> [options]
// See README.md in this directory.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { declaredIn, definedIn, diffModule } from './parse.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');

const { values: options } = parseArgs({
    options: {
        shell: { type: 'string' },
        tag: { type: 'string' },
        src: { type: 'string', default: join(repoRoot, 'packages/gnome-shell/src') },
        baseline: { type: 'string', default: join(here, 'baseline.json') },
        ignore: { type: 'string', default: join(here, 'ignore.json') },
        'no-baseline': { type: 'boolean', default: false },
        'update-baseline': { type: 'boolean', default: false },
        exports: { type: 'boolean', default: false },
        json: { type: 'boolean', default: false },
    },
});

const fail = (message) => {
    console.error(`check-shell-api: ${message}`);
    process.exit(2);
};

if (!options.shell) fail('--shell <path to a gnome-shell git checkout> is required');
const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);

const baseline = readJson(options.baseline, { tag: null, entries: [] });
const ignore = readJson(options.ignore, {});
const ignoreMatchers = Object.keys(ignore).map((pattern) => new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\#]/g, '\\$&').replace(/\*/g, '.*') + '$'));
const isIgnored = (key) => ignoreMatchers.some((matcher) => matcher.test(key));
const tag = options.tag ?? baseline.tag;
if (!tag) fail('no --tag given and the baseline names none');

// A baseline describes one tag. Comparing it with another is meaningless.
const useBaseline = !options['no-baseline'] && !options['update-baseline'];
if (useBaseline && baseline.tag && baseline.tag !== tag) fail(`baseline is for ${baseline.tag}, not ${tag}; pass --no-baseline to see every finding`);

const git = (...args) => execFileSync('git', ['-C', options.shell, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
const upstreamFiles = new Set(git('ls-tree', '-r', '--name-only', tag, 'js').split('\n'));

function declarationFiles(dir) {
    const files = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'types') files.push(...declarationFiles(path));
        } else if (entry.name.endsWith('.d.ts')) files.push(path);
    }
    return files.sort();
}

const found = [];
for (const file of declarationFiles(options.src)) {
    const module = relative(options.src, file).replace(/\.d\.ts$/, '');
    const upstream = `js/${module}.js`;
    if (!upstreamFiles.has(upstream)) {
        found.push(`${module}::file`);
        continue;
    }
    found.push(...diffModule(module, declaredIn(readFileSync(file, 'utf8'), file), definedIn(git('show', `${tag}:${upstream}`), upstream), { exports: options.exports }));
}

if (options['update-baseline']) {
    const entries = found.filter((key) => !isIgnored(key)).sort();
    writeFileSync(options.baseline, JSON.stringify({ tag, entries }, null, 4) + '\n');
    console.log(`baseline written: ${entries.length} entries for ${tag}`);
    process.exit(0);
}

const known = new Set(useBaseline ? baseline.entries : []);
const current = new Set(found);
const ignored = found.filter(isIgnored);
const added = found.filter((key) => !isIgnored(key) && !known.has(key));
const fixed = [...known].filter((key) => !current.has(key));

if (options.json) {
    console.log(JSON.stringify({ tag, added, fixed, ignored: ignored.length, known: known.size }, null, 2));
} else {
    const list = (title, keys) => keys.length && console.log(`${title}\n${keys.map((key) => `  ${key}`).join('\n')}\n`);
    list(`Declared, but not in GNOME Shell ${tag}${useBaseline ? ' (not in the baseline)' : ''}:`, added);
    list('In the baseline, but no longer found; remove from baseline.json (run with --update-baseline):', fixed);
    console.log(`${tag}: ${added.length} new, ${fixed.length} fixed, ${known.size - fixed.length} known, ${ignored.length} ignored`);
}
process.exit(added.length || fixed.length ? 1 : 0);
