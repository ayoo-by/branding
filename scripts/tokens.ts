// Loads tokens/tokens.json and validates it against the rules every consumer relies on.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

export type Token = { name: string; value: string | Record<string, string>; usage?: string };
export type Family = { note?: string; tokens: Token[] };
export type Font = { family: string; file: string; weight: string; style?: string; unicodeRange?: string };
export type TypeStyle = { name: string; fontSize: string; lineHeight: number | string; fontWeight: number | string; [k: string]: unknown };
export type Tokens = {
	name: string;
	version: number;
	color: { themes: { id: string; name: string }[]; tokens: Token[] };
	type: { fonts: Font[]; families: Record<string, string>; groups: { name: string; family: string; note?: string; styles: TypeStyle[] }[] };
	spacing?: Family;
	radius?: Family;
	shadow?: Family;
	meta?: unknown;
};

const NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;
// Hex, or a colour function with plain numeric arguments, or an alias of another colour token.
const COLOUR = /^(#[0-9a-f]{3,4}|#[0-9a-f]{6}|#[0-9a-f]{8}|(rgba?|hsla?|oklch|oklab|lab|lch)\([0-9.,%\s/+-]+\)|\{[A-Za-z0-9][A-Za-z0-9_.-]*\})$/i;
const LENGTH = /^(0|-?[0-9.]+(px|rem|em|%))$/;

export function tokenNames(t: Tokens): string[] {
	return ["color", "spacing", "radius", "shadow"].flatMap((f) => ((t as Record<string, Family | undefined>)[f]?.tokens ?? []).map((x) => x.name));
}

export function loadTokens(path: string): Tokens {
	const t = JSON.parse(readFileSync(path, "utf8")) as Tokens;
	const errors: string[] = [];
	const themes = t.color.themes.map((x) => x.id);

	const names = tokenNames(t);
	const seen = new Set<string>();
	for (const n of names) {
		if (!NAME.test(n)) errors.push(`Bad token name "${n}".`);
		if (seen.has(n)) errors.push(`Duplicate token name "${n}".`);
		seen.add(n);
	}

	const colours = new Set(t.color.tokens.map((x) => x.name));
	for (const tok of t.color.tokens) {
		const values = typeof tok.value === "string" ? { [themes[0]]: tok.value } : tok.value;
		for (const [theme, v] of Object.entries(values)) {
			if (!themes.includes(theme)) errors.push(`${tok.name}: unknown theme "${theme}".`);
			if (!COLOUR.test(v)) errors.push(`${tok.name} (${theme}): "${v}" is not a hex, colour function or alias.`);
			const alias = /^\{(.+)\}$/.exec(v)?.[1];
			if (alias && (!colours.has(alias) || alias === tok.name)) errors.push(`${tok.name}: alias of missing token "${alias}".`);
		}
		if (!tok.usage) errors.push(`${tok.name}: missing usage note.`);
	}

	for (const family of ["spacing", "radius"] as const) {
		for (const tok of t[family]?.tokens ?? []) {
			if (typeof tok.value !== "string" || !LENGTH.test(tok.value)) errors.push(`${tok.name}: "${tok.value}" is not a length.`);
			if (!tok.usage) errors.push(`${tok.name}: missing usage note.`);
		}
	}

	for (const tok of t.shadow?.tokens ?? []) {
		const values = typeof tok.value === "string" ? [tok.value] : Object.values(tok.value);
		for (const v of values) if (/var\(|url\(/.test(v)) errors.push(`${tok.name}: shadows take literal values only.`);
	}

	const base = dirname(dirname(path));
	for (const f of t.type.fonts) {
		if (!existsSync(join(base, f.file))) errors.push(`Font file missing: ${f.file}.`);
	}
	const styleNames = new Set<string>();
	for (const g of t.type.groups) {
		if (!(g.family in t.type.families)) errors.push(`Type group "${g.name}" uses unknown family "${g.family}".`);
		for (const s of g.styles) {
			if (!NAME.test(s.name) || styleNames.has(s.name)) errors.push(`Bad or duplicate type style "${s.name}".`);
			styleNames.add(s.name);
			if (!LENGTH.test(s.fontSize)) errors.push(`${s.name}: fontSize "${s.fontSize}" is not a length.`);
		}
	}

	if (errors.length) {
		console.error(errors.join("\n"));
		process.exit(1);
	}
	return t;
}
