import assert from 'node:assert/strict';
import { test } from 'node:test';
import { declaredIn, definedIn, diffModule } from './parse.mjs';

const members = (api, className) => [...api.classes.get(className)].sort();

test('declaredIn reads instance and static members, skips typing-only helpers', () => {
    const api = declaredIn(`
        export declare class Slider {
            constructor(value: number);
            step(n: number): boolean;
            static make(): Slider;
            value: number;
            get label(): string;
            connect(signal: string): number;
            $signals: unknown;
            [Symbol.iterator](): void;
        }
    `);
    assert.deepEqual(members(api, 'Slider'), ['#label', '#step', '#value', '.make']);
});

test('definedIn reads members, static fields and this assignments', () => {
    const api = definedIn(`
        export class Slider extends Base {
            static limit = 3;
            _init(value) {
                super._init();
                this._handleRadius = 0;
                const later = () => { this._releaseId = 1; };
            }
            step(n) {}
        }
        Slider.extra = 1;
    `);
    assert.deepEqual(members(api, 'Slider'), ['#_handleRadius', '#_init', '#_releaseId', '#step', '.extra', '.limit']);
});

test('definedIn does not leak this assignments of a nested class to the outer one', () => {
    const api = definedIn(`
        class Outer {
            build() {
                return class Inner { constructor() { this.inner = 1; } };
            }
        }
    `);
    assert.equal(api.classes.get('Outer').has('#inner'), false);
    assert.equal(api.classes.get('Inner').has('#inner'), true);
});

test('definedIn registers a class under its variable name and its own name', () => {
    const api = definedIn(`
        export const Button = GObject.registerClass(
        class PanelMenuButton extends Base { setMenu() {} });
    `);
    assert.deepEqual(members(api, 'Button'), ['#setMenu']);
    assert.deepEqual(members(api, 'PanelMenuButton'), ['#setMenu']);
});

test('definedIn reads GObject properties from all three registration styles', () => {
    const api = definedIn(`
        const A = GObject.registerClass({ Properties: { 'use-body-markup': spec } }, class A extends Base {});
        class B extends Base { static [GObject.properties] = { 'icon-name': spec }; }
        class C extends Base {}
        GObject.registerClass({ Properties: { title: spec } }, C);
    `);
    assert.deepEqual(members(api, 'A'), ['#use-body-markup', '#useBodyMarkup']);
    assert.deepEqual(members(api, 'B'), ['#icon-name', '#iconName']);
    assert.deepEqual(members(api, 'C'), ['#title']);
});

test('definedIn lists exports, including re-exports', () => {
    const api = definedIn(`
        export class A {}
        export const B = 1, C = 2;
        export function d() {}
        class Hidden {}
        export { Hidden as E };
    `);
    assert.deepEqual([...api.exports].sort(), ['A', 'B', 'C', 'E', 'd']);
});

const defined = (source) => definedIn(source);
const declared = (source) => declaredIn(source);

test('diffModule reports a member nothing defines', () => {
    const { findings } = diffModule('ui/x', declared('declare class X { gone(): void; kept(): void; static s(): void }'), defined('class X { kept() {} }'));
    assert.deepEqual(findings, ['ui/x::X#gone', 'ui/x::X.s']);
});

test('diffModule matches a member anywhere in the file', () => {
    const { findings } = diffModule('ui/x', declared('declare class Base { shared: number }'), defined('class Base {} class Sub extends Base { constructor() { this.shared = 1; } }'));
    assert.deepEqual(findings, []);
});

test('diffModule reports a class that no longer exists', () => {
    const { findings } = diffModule('ui/x', declared('declare class Gone { a(): void }'), defined('class Other {}'));
    assert.deepEqual(findings, ['ui/x::Gone', 'ui/x::Gone#a']);
});

test('diffModule leaves a declared class alone when upstream has it as a plain value', () => {
    const { findings } = diffModule('misc/x', declared('export declare class Proxy { a(): void }'), defined('const Proxy = Gio.DBusProxy.makeProxyWrapper(xml);'));
    assert.deepEqual(findings, []);
});

test('diffModule checks exports only on request', () => {
    const decl = declared('export declare class Private {}');
    const def = defined('class Private {}');
    assert.deepEqual(diffModule('ui/x', decl, def).findings, []);
    assert.deepEqual(diffModule('ui/x', decl, def, { exports: true }).findings, ['ui/x::export:Private']);
});

test('declaredIn reads @since from a member and from its class', () => {
    const api = declaredIn(`
        /** @since 48 */
        export declare class A {
            /** @since 51 */
            fresh(): void;
            old(): void;
        }
        export declare class B {
            /** @since 51 */
            f(a: number): void;
            /** @since 50 */
            f(a: string): void;
        }
    `);
    assert.equal(api.since.get('A'), 48);
    assert.equal(api.since.get('A#fresh'), 51);
    assert.equal(api.since.has('A#old'), false);
    assert.equal(api.since.get('B#f'), 50);
});

test('diffModule skips what is declared for a newer release than the one checked', () => {
    const decl = declared(`
        /** @since 49 */
        declare class Old {
            gone(): void;
            /** @since 51 */
            fresh(): void;
        }
        /** @since 51 */
        declare class New { a(): void }
        declare class Plain { untagged(): void }
    `);
    const def = defined('class Old {} class Plain {}');
    const at50 = diffModule('ui/x', decl, def, { shellMajor: 50 });
    assert.deepEqual(at50.findings, ['ui/x::Old#gone', 'ui/x::Plain#untagged']);
    assert.deepEqual(at50.skipped, ['ui/x::Old#fresh', 'ui/x::New', 'ui/x::New#a']);
    assert.deepEqual(diffModule('ui/x', decl, def, { shellMajor: 51 }).skipped, []);
});
