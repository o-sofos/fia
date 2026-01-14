import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Configuration
const FLICK_BENCH_DIR = path.resolve("benchmark_repo/frameworks/keyed/flick");
const WEBDRIVER_DIR = path.resolve("benchmark_repo/webdriver-ts");
const RESULTS_DIR = path.resolve(WEBDRIVER_DIR, "results");

// Competitor Baselines (Approximate Keyed results for comparison)
const BASELINES = {
    "01_run1k": { label: "Create 1k", solid: 26, vue: 28, react: 43 },
    "02_replace1k": { label: "Replace 1k", solid: 29, vue: 32, react: 47 },
    "05_swap1k": { label: "Swap Rows", solid: 17, vue: 20, react: 85 },
    // "07_create10k": { label: "Create 10k", solid: 800, vue: 900, react: 1200 }, // Example
};

// Utilities
const runCommand = (cmd: string, args: string[], cwd: string) => {
    return new Promise<void>((resolve, reject) => {
        console.log(`\n> Running: ${cmd} ${args.join(" ")} in ${cwd}`);
        const proc = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
        proc.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command failed with code ${code}`));
        });
    });
};

async function main() {
    try {
        // 1. Build Flick Benchmark
        console.log("🏗️  Building Flick Benchmark...");
        await runCommand("bun", ["run", "build_benchmark.ts"], FLICK_BENCH_DIR);

        // 2. Run Benchmarks
        console.log("🚀 Running Benchmarks via webdriver-ts...");
        const benchmarks = Object.keys(BASELINES);
        // Note: --headless true is important for automation
        await runCommand(
            "npm",
            ["run", "bench", "--", "--framework", "keyed/flick", "--benchmark", ...benchmarks, "--headless", "true"],
            WEBDRIVER_DIR
        );

        // 3. Analyze Results
        console.log("\n📊 Analyzing Results...");

        // Find result files
        // Filename format: flick-v0.2.9-keyed_01_run1k.json
        const files = fs.readdirSync(RESULTS_DIR).filter(f => f.startsWith("flick") && f.endsWith(".json"));

        const results: Record<string, number> = {};

        for (const file of files) {
            const content = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), "utf-8"));
            // Extract benchmark ID (e.g. 01_run1k)
            // Format: flick-v..._BENCHMARK_ID.json ... wait, benchmark id is at the end?
            // Actually usually it is `framework_benchmark.json`
            // Let's rely on the content or partial match
            const benchId = benchmarks.find(b => file.includes(b));
            if (benchId) {
                // Correct path: content.values.total.median
                if (content.values && content.values.total) {
                    results[benchId] = content.values.total.median;
                } else {
                    console.warn(`Warning: Unexpected JSON structure in ${file}`);
                }
            }
        }

        // 4. Output Comparison
        console.log("\n🏆 PERFORMANCE COMPARISON (Lower is Better)");
        console.log("--------------------------------------------------------------------------------");
        console.log(`| ${"Benchmark".padEnd(20)} | ${"Flick".padEnd(10)} | ${"SolidJS".padEnd(10)} | ${"Vue 3".padEnd(10)} | ${"React".padEnd(10)} |`);
        console.log("--------------------------------------------------------------------------------");

        for (const [id, baseline] of Object.entries(BASELINES)) {
            const flickVal = results[id];
            const flickDisplay = flickVal ? `${flickVal.toFixed(1)} ms` : "N/A";

            console.log(
                `| ${baseline.label.padEnd(20)} ` +
                `| ${flickDisplay.padEnd(10)} ` +
                `| ${`~${baseline.solid}`.padEnd(10)} ` +
                `| ${`~${baseline.vue}`.padEnd(10)} ` +
                `| ${`~${baseline.react}`.padEnd(10)} |`
            );
        }
        console.log("--------------------------------------------------------------------------------\n");

    } catch (err) {
        console.error("❌ Benchmark Failed:", err);
        process.exit(1);
    }
}

main();
