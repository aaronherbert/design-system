import axe from 'axe-core';
import { expect } from 'vitest';

/**
 * Runs axe on a rendered container and fails with a readable list of violations.
 * Colour contrast is skipped: jsdom doesn't compute styles. Contrast is covered by the theme lab audit.
 */
export async function expectNoAxeViolations(container: Element) {
  const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
  const summary = results.violations.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.html).join('\n  ')}`);
  expect(summary, summary.join('\n\n')).toEqual([]);
}
