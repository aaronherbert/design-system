// Copies the tide-ui Claude Code skill into ~/.claude/skills so it's available in every project.
// Run after changing .claude/skills/tide-ui: `npm run claude:install-skill`.
import { cpSync, existsSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, '.claude', 'skills', 'tide-ui');
const target = join(homedir(), '.claude', 'skills', 'tide-ui');

if (!existsSync(source)) {
  console.error(`Skill source not found: ${source}`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`Installed tide-ui skill → ${target}`);
