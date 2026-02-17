/**
 * Test bundle: Signals only
 *
 * Tests tree-shaking for minimal signal usage.
 * Expected size: ~0.5-1KB minified+gzipped
 */

import { $, $e } from "../../src/core/mod";

// Create a signal
const count = $(0);

// Create an effect
$e(() => {
  console.log("Count:", count.value);
});

// Export to prevent elimination
export { count };
