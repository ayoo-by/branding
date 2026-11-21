// Builds tokens/tokens.css from tokens/tokens.json, the single source of the Sage design tokens.
// Usage: bun scripts/build.ts            (write tokens/tokens.css)
//        bun scripts/build.ts --check    (exit 1 if tokens/tokens.css is stale or the tokens are invalid)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadTokens, tokenNames, type Tokens } from "./tokens.ts";

const root = join(import.meta.dir, "..");
const outPath = join(root, "tokens", "tokens.css");

// The web stylesheet keeps the theme's own selectors (:root for light, :root[data-theme="dark"] for dark),
// so swapping it in for the theme's old inline tokens changes nothing in the cascade.
export function webCss(t: Tokens): string {
	const themes = t.color.themes.map((x) => x.id);
	const first = themes[0];
	const out: string[] = [
		"/* Sage design tokens. Generated from tokens/tokens.json by scripts/build.ts: edit the JSON, then run `bun run build`. */",
		"",
	];

	for (const f of t.type.fonts) {
		out.push(
			"@font-face {",
			`\tfont-family: "${f.family}";`,
			`\tsrc: url("../${f.file}") format("woff2");`,
			`\tfont-weight: ${f.weight};`,
			`\tfont-style: ${f.style ?? "normal"};`,
			"\tfont-display: swap;",
			...(f.unicodeRange ? [`\tunicode-range: ${f.unicodeRange};`] : []),
			"}",
			"",
		);
	}

	themes.forEach((theme, i) => {
		const lines: string[] = [];
		for (const family of ["color", "shadow"] as const) {
			for (const tok of t[family]?.tokens ?? []) {
				const v = valueFor(tok.value, theme, first);
				if (v === undefined) continue;
				lines.push(`\t--${tok.name}: ${cssValue(v)};`);
			}
		}
		out.push(i === 0 ? ":root {" : `:root[data-theme="${theme}"] {`, ...lines, "}", "");
	});

	const shared: string[] = [];
	for (const family of ["spacing", "radius"] as const) {
		for (const tok of t[family]?.tokens ?? []) shared.push(`\t--${tok.name}: ${tok.value};`);
	}
	for (const [key, stack] of Object.entries(t.type.families)) shared.push(`\t--font-${key}: ${stack};`);
	out.push(":root {", ...shared, "}", "");
	return out.join("\n");
}

// A plain string value belongs to the first theme; later themes only declare what they change.
export function valueFor(value: string | Record<string, string>, theme: string, first: string): string | undefined {
	if (typeof value === "string") return theme === first ? value : undefined;
	if (theme === first) return value[theme];
	return value[theme] !== undefined && value[theme] !== value[first] ? value[theme] : undefined;
}

// An alias such as "{sage-600}" becomes a reference to that token's custom property.
export function cssValue(v: string): string {
	const m = /^\{([A-Za-z0-9][A-Za-z0-9_.-]*)\}$/.exec(v);
	return m ? `var(--${m[1]})` : v;
}

if (import.meta.main) {
	const tokens = loadTokens(join(root, "tokens", "tokens.json"));
	const css = webCss(tokens);
	if (process.argv.includes("--check")) {
		const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : "";
		if (current !== css) {
			console.error("tokens/tokens.css is out of date: run `bun run build`.");
			process.exit(1);
		}
		console.log(`tokens/tokens.css is current (${tokenNames(tokens).length} tokens).`);
	} else {
		writeFileSync(outPath, css);
		console.log(`Wrote tokens/tokens.css (${tokenNames(tokens).length} tokens).`);
	}
}
