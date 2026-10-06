// Extract the API surface of one module, from either side of the comparison.
//
// `declaredIn` reads a `.d.ts` from this package, `definedIn` reads the matching
// `js/` file of a gnome-shell checkout. Both return the same shape, so the diff
// is a plain set difference:
//
//   { classes: Map<className, Set<memberKey>>, exports: Set<exportName> }
//
// A member key is `#name` for an instance member and `.name` for a static one.
// Only the syntax tree is read, never the type checker, so a file parses in
// milliseconds and needs no module resolution.

import ts from 'typescript';

const { SyntaxKind } = ts;

const hasModifier = (node, kind) => node.modifiers?.some((modifier) => modifier.kind === kind) ?? false;
const isStatic = (node) => hasModifier(node, SyntaxKind.StaticKeyword);
const isAssignment = (kind) => kind >= SyntaxKind.FirstAssignment && kind <= SyntaxKind.LastAssignment;

const parse = (fileName, text, scriptKind) => ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKind);

// Computed names (`[GObject.signals]`) have no stable spelling, so they are skipped.
function nameOf(node) {
    const name = node.name;
    if (name && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name))) return name.text;
    return null;
}

// Added by ts-for-gir's typings of GObject classes; no shell source defines them.
const TYPING_ONLY = new Set(['$signals', 'connect', 'connect_after', 'emit', 'disconnect']);

const memberKey = (node, name) => (isStatic(node) ? '.' : '#') + name;

function isMember(node) {
    return ts.isMethodDeclaration(node) || ts.isMethodSignature(node) || ts.isPropertyDeclaration(node) || ts.isPropertySignature(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node);
}

function addTo(classes, className, key) {
    if (!classes.has(className)) classes.set(className, new Set());
    if (key) classes.get(className).add(key);
}

// A class can be known under two names: `export const Button = GObject.registerClass(
// class PanelMenuButton …)` is `Button` to importers and `PanelMenuButton` inside.
function classNamesOf(node) {
    const names = new Set();
    if (node.name) names.add(node.name.text);
    let parent = node.parent;
    while (parent && !ts.isVariableDeclaration(parent) && !ts.isSourceFile(parent)) parent = parent.parent;
    if (parent && ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) names.add(parent.name.text);
    return [...names];
}

const camelCase = (name) => name.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());

// GObject properties are not class members upstream, they are the keys of the
// `Properties` object, in the `registerClass` metadata or in
// `static [GObject.properties]`. GJS exposes each as `kebab-case` and `camelCase`.
function keysOfProperties(object) {
    const keys = [];
    for (const property of object.properties) {
        const name = ts.isPropertyAssignment(property) ? nameOf(property) : null;
        if (name) keys.push('#' + name, '#' + camelCase(name));
    }
    return keys;
}

function keysOfMetadata(metadata) {
    if (!metadata || !ts.isObjectLiteralExpression(metadata)) return [];
    return metadata.properties.flatMap((property) => (ts.isPropertyAssignment(property) && nameOf(property) === 'Properties' && ts.isObjectLiteralExpression(property.initializer) ? keysOfProperties(property.initializer) : []));
}

function propertyKeys(classNode) {
    const keys = classNode.parent && ts.isCallExpression(classNode.parent) ? keysOfMetadata(classNode.parent.arguments[0]) : [];
    for (const member of classNode.members) {
        if (ts.isPropertyDeclaration(member) && isStatic(member) && ts.isComputedPropertyName(member.name) && member.name.expression.getText().endsWith('.properties') && member.initializer && ts.isObjectLiteralExpression(member.initializer)) {
            keys.push(...keysOfProperties(member.initializer));
        }
    }
    return keys;
}

// `GObject.registerClass({ Properties: … }, Notification);` as a statement of its
// own, after the class.
function registeredLater(sourceFile, classes) {
    for (const statement of sourceFile.statements) {
        if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) continue;
        const [metadata, target] = statement.expression.arguments;
        if (target && ts.isIdentifier(target) && classes.has(target.text)) {
            for (const key of keysOfMetadata(metadata)) addTo(classes, target.text, key);
        }
    }
}

// Every top-level name, exported or not. A declared class may be a `const` upstream
// (`Gio.DBusProxy.makeProxyWrapper(…)`), which exists but has no members to compare.
function topLevelNames(sourceFile) {
    const names = new Set();
    for (const statement of sourceFile.statements) {
        if (ts.isVariableStatement(statement)) {
            for (const declaration of statement.declarationList.declarations) {
                for (const name of bindingNames(declaration.name)) names.add(name);
            }
        } else if ((ts.isClassDeclaration(statement) || ts.isFunctionDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isModuleDeclaration(statement)) && statement.name) names.add(statement.name.text);
    }
    return names;
}

// `export const {gettext, ngettext} = …` exports every name it destructures.
function bindingNames(name) {
    if (ts.isIdentifier(name)) return [name.text];
    return name.elements.flatMap((element) => (ts.isOmittedExpression(element) ? [] : bindingNames(element.name)));
}

// Type-only exports exist for the compiler and have no counterpart in js/.
function exportsOf(sourceFile) {
    const names = new Set();
    for (const statement of sourceFile.statements) {
        if (ts.isExportDeclaration(statement)) {
            if (statement.isTypeOnly) continue;
            if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
                for (const element of statement.exportClause.elements) {
                    if (!element.isTypeOnly) names.add(element.name.text);
                }
            }
        } else if (hasModifier(statement, SyntaxKind.ExportKeyword)) {
            if (hasModifier(statement, SyntaxKind.DefaultKeyword)) names.add('default');
            else if (ts.isVariableStatement(statement)) {
                for (const declaration of statement.declarationList.declarations) {
                    for (const name of bindingNames(declaration.name)) names.add(name);
                }
            } else if ((ts.isClassDeclaration(statement) || ts.isFunctionDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isModuleDeclaration(statement)) && statement.name) names.add(statement.name.text);
        }
    }
    return names;
}

// The release that introduced a declaration, from its `@since 51` tag.
function sinceOf(node) {
    const tag = ts.getJSDocTags(node).find((candidate) => candidate.tagName.text === 'since');
    const match = typeof tag?.comment === 'string' ? tag.comment.match(/^\s*(\d+)/) : null;
    return match ? Number(match[1]) : null;
}

export function declaredIn(text, fileName = 'module.d.ts') {
    const sourceFile = parse(fileName, text, ts.ScriptKind.TS);
    const classes = new Map();
    const since = new Map();
    // Overloads of one member can carry different tags; the earliest one counts.
    const noteSince = (key, node) => {
        const release = sinceOf(node);
        if (release !== null) since.set(key, Math.min(release, since.get(key) ?? Infinity));
    };
    for (const statement of sourceFile.statements) {
        if (!ts.isClassDeclaration(statement) || !statement.name) continue;
        const className = statement.name.text;
        addTo(classes, className, null);
        noteSince(className, statement);
        for (const member of statement.members) {
            const name = isMember(member) ? nameOf(member) : null;
            if (!name || TYPING_ONLY.has(name)) continue;
            addTo(classes, className, memberKey(member, name));
            noteSince(className + memberKey(member, name), member);
        }
    }
    return { classes, exports: exportsOf(sourceFile), names: new Set(), since };
}

// Besides the members written in the class body, upstream creates most of its
// state as `this.foo = …` inside `_init`, and a few statics as `Foo.bar = …` after
// the class. Both count as defined.
export function definedIn(text, fileName = 'module.js') {
    const sourceFile = parse(fileName, text, ts.ScriptKind.JS);
    const classes = new Map();

    const collectThisAssignments = (classNode, classNames) => {
        const walk = (node) => {
            if (node !== classNode && ts.isClassLike(node)) return;
            if (ts.isBinaryExpression(node) && isAssignment(node.operatorToken.kind) && ts.isPropertyAccessExpression(node.left) && node.left.expression.kind === SyntaxKind.ThisKeyword) {
                for (const className of classNames) addTo(classes, className, '#' + node.left.name.text);
            }
            ts.forEachChild(node, walk);
        };
        walk(classNode);
    };

    const visit = (node) => {
        if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
            const classNames = classNamesOf(node);
            for (const className of classNames) {
                addTo(classes, className, null);
                for (const member of node.members) {
                    const name = isMember(member) ? nameOf(member) : null;
                    if (name) addTo(classes, className, memberKey(member, name));
                }
                for (const key of propertyKeys(node)) addTo(classes, className, key);
            }
            collectThisAssignments(node, classNames);
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    registeredLater(sourceFile, classes);

    const visitStatic = (node) => {
        if (ts.isBinaryExpression(node) && isAssignment(node.operatorToken.kind) && ts.isPropertyAccessExpression(node.left) && ts.isIdentifier(node.left.expression) && classes.has(node.left.expression.text)) {
            addTo(classes, node.left.expression.text, '.' + node.left.name.text);
        }
        ts.forEachChild(node, visitStatic);
    };
    visitStatic(sourceFile);

    return { classes, exports: exportsOf(sourceFile), names: topLevelNames(sourceFile), since: new Map() };
}

// Everything declared but not defined, as stable keys:
//   `ui/slider::Slider#step`   instance member
//   `ui/slider::Slider.step`   static member
//   `ui/slider::Slider`        class that no longer exists
//   `ui/search::export:Name`   exported name that no longer exists (only with `exports`)
export function diffModule(module, declared, defined, { exports = false, shellMajor = Infinity } = {}) {
    // Upstream splits state across a base class and its subclasses where the
    // declarations flatten it onto one, so members match anywhere in the file.
    const definedMembers = new Set([...defined.classes.values()].flatMap((members) => [...members]));
    const findings = [];
    const skipped = [];
    // A declaration tagged for a later release than the one checked is no error:
    // it describes a shell that has not shipped yet at that tag. A member without
    // a tag of its own takes the tag of its class.
    const report = (key, since) => (since !== undefined && since > shellMajor ? skipped : findings).push(key);
    for (const [className, members] of declared.classes) {
        if (!defined.classes.has(className) && !defined.names.has(className)) report(`${module}::${className}`, declared.since.get(className));
        if (!defined.classes.has(className) && defined.names.has(className)) continue;
        for (const key of members) {
            if (!definedMembers.has(key)) report(`${module}::${className}${key}`, declared.since.get(className + key) ?? declared.since.get(className));
        }
    }
    for (const name of exports ? declared.exports : []) {
        if (!defined.exports.has(name)) findings.push(`${module}::export:${name}`);
    }
    return { findings, skipped };
}
