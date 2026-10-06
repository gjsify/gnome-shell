// Report declarations in packages/gnome-shell/src that GNOME Shell no longer has.
//
// The compiler cannot see this: a declared member that upstream dropped still
// type-checks, it just describes a shell nobody runs. So compare each `.d.ts`
// with the matching `js/` file of a gnome-shell checkout at a given tag.
//
// Usage: node scripts/check-shell-api/cli.mjs --shell <gnome-shell checkout> [options]
// See README.md in this directory.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
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
const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);

const ignore = readJson(options.ignore, {});
const ignoreMatchers = Object.keys(ignore).map((pattern) => new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\#]/g, '\\$&').replace(/\*/g, '.*') + '$'));
const isIgnored = (key) => ignoreMatchers.some((matcher) => matcher.test(key));
const tag = options.tag;

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

// A leading underscore marks a member private by GJS convention. Classes, files
// and exports are always public.
const visibilityOf = (key) => (/[#.][_#][^#.]*$/.test(key) ? 'private' : 'public');
const visible = (key) => options.visibility === 'all' || visibilityOf(key) === options.visibility;

const ignored = found.filter(isIgnored);
const findings = found.filter((key) => !isIgnored(key) && visible(key));

if (options.json) {
    console.log(JSON.stringify({ tag, findings, ignored: ignored.length }, null, 2));
} else {
    for (const visibility of ['public', 'private']) {
        const group = findings.filter((key) => visibilityOf(key) === visibility);
        if (group.length) console.log(`Declared, but not in GNOME Shell ${tag} [${visibility}]\n${group.map((key) => `  ${key}`).join('\n')}\n`);
    }
    const publicCount = findings.filter((key) => visibilityOf(key) === 'public').length;
    console.log(`${tag}: ${findings.length} stale (${publicCount} public), ${ignored.length} ignored`);
}
process.exit(findings.length ? 1 : 0);
