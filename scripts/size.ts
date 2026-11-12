/**
 * Bundle-size budgets. Deterministic, so it's a hard CI gate.
 *
 *   bun run size            check every entry against size-limits.json
 *   bun run size --update   reset budgets to current size + headroom
 *
 * Each entry is bundled for the browser and minified in memory; the budget is
 * on the gzip size (what users download). Brotli is shown for reference. The
 * tree-shaking entries (signals-only, hello-world) guard the /*#__PURE__*\/
 * annotations: losing one pulls the whole element table into small apps.
 */

import { readFileSync, writeFileSync } from "fs";
import { brotliCompressSync, gzipSync } from "zlib";

const LIMITS_FILE = "size-limits.json";
/** Headroom granted by --update, so trivial changes don't need a budget bump */
const HEADROOM = 0.03;

interface Limit {
    name: string;
    entry: string;
    /** max gzip bytes */
    gzip: number;
}

const update = process.argv.includes("--update");
const limits: Limit[] = JSON.parse(readFileSync(LIMITS_FILE, "utf8"));

const fmt = (n: number) => `${(n / 1024).toFixed(2)} kB`;

let failed = false;
const rows: string[] = [];
for (const limit of limits) {
    const result = await Bun.build({ entrypoints: [limit.entry], target: "browser", minify: true });
    if (!result.success) {
        console.error(`size: failed to bundle ${limit.entry}`);
        for (const log of result.logs) console.error(log);
        process.exit(1);
    }
    const code = Buffer.from(await result.outputs[0].arrayBuffer());
    const gzip = gzipSync(code, { level: 9 }).length;
    const brotli = brotliCompressSync(code).length;

    if (update) {
        limit.gzip = Math.ceil(gzip * (1 + HEADROOM));
    }
    const over = gzip > limit.gzip;
    if (over) failed = true;
    const used = ((gzip / limit.gzip) * 100).toFixed(0).padStart(3);
    rows.push(
        `${over ? "FAIL" : "ok  "} ${limit.name.padEnd(16)} min ${fmt(code.length).padStart(9)}  gzip ${fmt(gzip).padStart(8)}  br ${fmt(brotli).padStart(8)}  budget ${fmt(limit.gzip).padStart(8)} (${used}%)`,
    );
}
console.log(rows.join("\n"));

if (update) {
    writeFileSync(LIMITS_FILE, JSON.stringify(limits, null, 2) + "\n");
    console.log(`\nsize: budgets updated (+${HEADROOM * 100}% headroom)`);
} else if (failed) {
    console.error("\nsize: over budget. If the growth is intended, run `bun run size --update` and commit the new limits.");
    process.exit(1);
}
