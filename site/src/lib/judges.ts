import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { JudgeSchema, type Judge } from './schema';

const DATA_ROOT = resolve(
  fileURLToPath(new URL('../../../data/judges/', import.meta.url))
);

function walkYaml(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walkYaml(p));
    else if (entry.endsWith('.yaml') || entry.endsWith('.yml')) out.push(p);
  }
  return out;
}

let cache: Judge[] | null = null;

export function getAllJudges(): Judge[] {
  if (cache) return cache;
  const paths = walkYaml(DATA_ROOT);
  const judges: Judge[] = [];
  for (const p of paths) {
    const raw = readFileSync(p, 'utf8');
    const parsed = yaml.load(raw);
    const result = JudgeSchema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n');
      throw new Error(`Invalid judge record at ${p}:\n${issues}`);
    }
    judges.push(result.data);
  }
  judges.sort((a, b) => a.name.localeCompare(b.name));
  cache = judges;
  return judges;
}

export function getJudge(jurisdiction: string, slug: string): Judge | undefined {
  return getAllJudges().find(
    (j) => j.jurisdiction === jurisdiction && j.slug === slug
  );
}

export interface JurisdictionSummary {
  slug: string;
  name: string;
  count: number;
}

export function getJurisdictions(): JurisdictionSummary[] {
  const map = new Map<string, JurisdictionSummary>();
  for (const j of getAllJudges()) {
    const cur =
      map.get(j.jurisdiction) ??
      { slug: j.jurisdiction, name: jurisdictionName(j.jurisdiction), count: 0 };
    cur.count += 1;
    map.set(j.jurisdiction, cur);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const JURISDICTION_NAMES: Record<string, string> = {
  casd: 'Southern District of California',
};

export function jurisdictionName(slug: string): string {
  return JURISDICTION_NAMES[slug] ?? slug.toUpperCase();
}
