// Assembles the Sage Design System artifact's files from this repository and the ayoo.by theme.
// Usage: bun scripts/design-system.ts --theme ../ayoo.by/themes/sage [--out dist/design-system]
//
// The output's project/ folder holds every file the artifact publishes except its index
// (project/design-system.json), which records the uploaded images by their store ids and so is
// written at publish time. uploads.json lists those images by group. Nothing here is edited by
// hand: change tokens/, fonts/, icons/, DESIGN.md or design-system/, or the theme, and rebuild.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { loadTokens, type Tokens } from "./tokens.ts";
import { valueFor, cssValue } from "./build.ts";

const root = join(import.meta.dir, "..");

function arg(name: string, fallback?: string): string {
	const i = process.argv.indexOf(`--${name}`);
	if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
	if (fallback !== undefined) return fallback;
	console.error(`Missing --${name}. Usage: bun scripts/design-system.ts --theme <path to themes/sage> [--out dist/design-system]`);
	process.exit(2);
}

// Names the commit a checkout is at, as "branch@shortsha", or null outside a git checkout.
function gitRef(dir: string): string | null {
	try {
		const sha = execFileSync("git", ["-C", dir, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
		const branch = execFileSync("git", ["-C", dir, "rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
		const dirty = execFileSync("git", ["-C", dir, "status", "--porcelain"], { encoding: "utf8" }).trim() !== "";
		return `${branch === "HEAD" ? "detached" : branch}@${sha}${dirty ? "+changes" : ""}`;
	} catch {
		return null;
	}
}

// The Design System page's own compiled layout (its format.md, "tokens.css as compiled"), so a
// system synced from code publishes the same file the page would write on a save.
function artifactCss(t: Tokens, title: string): string {
	const themes = t.color.themes.map((x) => x.id);
	const first = themes[0];
	const out: string[] = [`/* ${title} — generated from tokens.json */`];
	themes.forEach((theme, i) => {
		const lines: string[] = [];
		for (const family of ["color", "shadow"] as const) {
			for (const tok of t[family]?.tokens ?? []) {
				const v = valueFor(tok.value, theme, first);
				if (v !== undefined) lines.push(`  --${tok.name}: ${cssValue(v)};`);
			}
		}
		out.push(`${i === 0 ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`} {`, ...lines, "}");
	});
	const shared: string[] = [];
	for (const family of ["spacing", "radius"] as const) {
		for (const tok of t[family]?.tokens ?? []) shared.push(`  --${tok.name}: ${tok.value};`);
	}
	for (const [key, stack] of Object.entries(t.type.families)) shared.push(`  --font-${key}: ${stack};`);
	out.push(":root {", ...shared, "}");
	for (const g of t.type.groups) {
		for (const s of g.styles) {
			const family = (s.family as string | undefined) ?? g.family;
			const decl = [`font-family: var(--font-${family})`, `font-size: ${s.fontSize}`, `line-height: ${s.lineHeight}`, `font-weight: ${s.fontWeight}`];
			if (s.letterSpacing) decl.push(`letter-spacing: ${s.letterSpacing}`);
			if (s.fontStyle) decl.push(`font-style: ${s.fontStyle}`);
			out.push(`.${s.name} { ${decl.join("; ")}; }`);
		}
	}
	for (const f of t.type.fonts) {
		out.push(
			`@font-face { font-family: "${f.family}"; src: url("${f.file}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style ?? "normal"}; font-display: swap;${f.unicodeRange ? ` unicode-range: ${f.unicodeRange};` : ""} }`,
		);
	}
	return out.join("\n") + "\n";
}

if (import.meta.main) {
	const theme = resolve(arg("theme"));
	const out = resolve(arg("out", join(root, "dist", "design-system")));
	const themeCss = join(theme, "assets", "css", "main.css");
	if (!existsSync(themeCss)) {
		console.error(`No stylesheet at ${themeCss}: --theme must point at the theme folder (themes/sage).`);
		process.exit(2);
	}

	const tokens = loadTokens(join(root, "tokens", "tokens.json"));
	const brandingRef = gitRef(root);
	const themeRef = gitRef(theme);
	const project = join(out, "project");
	rmSync(out, { recursive: true, force: true });
	mkdirSync(join(project, "components"), { recursive: true });

	// Tokens, with a provenance note the page shows on a re-sync.
	const withMeta = {
		...tokens,
		meta: {
			source: "github",
			repo: "ayoo-by/branding",
			...(brandingRef ? { ref: brandingRef } : {}),
			paths: { tokens: ["tokens/tokens.json"], fonts: ["fonts/"], assets: ["eagle-*.svg", "png/", "favicons/", "icons/"], docs: ["DESIGN.md", "design-system/"] },
			theme: { repo: "ayoo-by/ayoo.by", path: "themes/sage", ...(themeRef ? { ref: themeRef } : {}) },
			synced: new Date().toISOString().slice(0, 10),
		},
	};
	writeFileSync(join(project, "tokens.json"), JSON.stringify(withMeta, null, 2) + "\n");
	writeFileSync(join(project, "tokens.css"), artifactCss(tokens, tokens.name));
	cpSync(join(root, "fonts"), join(project, "fonts"), { recursive: true, filter: (p) => !p.endsWith(".txt") });

	// The brand book is DESIGN.md without its H1 (the page shows the system's name), plus the sync note.
	const design = readFileSync(join(root, "DESIGN.md"), "utf8").replace(/^# [^\n]*\n+/, "");
	const notes = readFileSync(join(root, "design-system", "not-synced.md"), "utf8");
	writeFileSync(join(project, "README.md"), design.trimEnd() + "\n\n" + notes.trimEnd() + "\n");

	// Component guidelines and previews, then the theme's component stylesheet minus its token import.
	cpSync(join(root, "design-system", "components"), join(project, "components"), { recursive: true });
	const css = readFileSync(themeCss, "utf8").replace(/^@import\s+["']sage\/tokens\/tokens\.css["'];\n/m, "");
	if (/@import/.test(css)) {
		console.error("The theme stylesheet has an @import this build does not resolve.");
		process.exit(1);
	}
	const header = `/*\n * Sage component styles: the ayoo.by theme's stylesheet (themes/sage/assets/css/main.css${themeRef ? ` at ${themeRef}` : ""})\n * without its token import. Tokens reach it as custom properties from tokens.css.\n */\n`;
	writeFileSync(join(project, "components", "bundle.css"), header + css);

	// Asset group notes are files; the images themselves are uploads, listed for the publisher.
	const uploads: Record<string, { name: string; path: string }[]> = {
		Logos: readdirSync(root).filter((f) => /^eagle-.*\.svg$/.test(f)).sort().map((f) => ({ name: f, path: f })),
		Rasters: readdirSync(join(root, "png")).filter((f) => f.endsWith(".png")).sort().map((f) => ({ name: f, path: `png/${f}` })),
		Favicons: readdirSync(join(root, "favicons")).filter((f) => /\.(svg|png)$/.test(f)).sort().map((f) => ({ name: f, path: `favicons/${f}` })),
		Icons: readdirSync(join(root, "icons")).filter((f) => f.endsWith(".svg")).sort().map((f) => ({ name: f, path: `icons/${f}` })),
	};
	for (const group of Object.keys(uploads)) {
		mkdirSync(join(project, "assets", group), { recursive: true });
		cpSync(join(root, "design-system", "assets", group, "README.md"), join(project, "assets", group, "README.md"));
	}
	cpSync(join(root, "favicons", "site.webmanifest"), join(project, "assets", "Favicons", "site.webmanifest"));
	writeFileSync(join(out, "uploads.json"), JSON.stringify(uploads, null, 2) + "\n");

	const count = (dir: string): number => readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1), 0);
	console.log(`Wrote ${count(project)} files to ${project} and ${Object.values(uploads).flat().length} uploads to ${basename(out)}/uploads.json.`);
	console.log(`Sources: branding ${brandingRef ?? "(not a git checkout)"}, theme ${themeRef ?? "(not a git checkout)"}.`);
}
