import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export interface Judge {
  id: string;
  slug: string;
  jurisdiction: string;
  name: string;
  honorific?: string;
  court_name: string;
  court_type: string;
  status: string;
  chambers_location?: string;
  courtroom?: string;
  appointed_by?: string;
  appointed_year?: number;
  prior_practice?: string[];
  law_school?: string;
  undergrad?: string;
  chambers_email?: string;
  proposed_order_email?: string;
  bio_notes?: string;
  created_at: string;
  updated_at: string;
  last_editor_review_at?: string;
  standing_orders: StandingOrder[];
  procedural: Record<string, string | number | string[] | undefined>;
  sources: Source[];
}

export interface StandingOrder {
  title: string;
  effective_date?: string;
  url: string;
  topics?: string[];
  last_fetched_at: string;
}

export interface Source {
  field_key: string;
  source_type: string;
  source_url?: string;
  source_excerpt?: string;
  confidence: string;
  last_verified_at: string;
}

export interface JurisdictionSummary {
  slug: string;
  name: string;
  count: number;
}

const jurisdictionNames: Record<string, string> = {
  ca9: 'U.S. Court of Appeals for the Ninth Circuit',
  cacd: 'U.S. District Court, Central District of California',
  casd: 'U.S. District Court, Southern District of California',
  lasc: 'Los Angeles County Superior Court',
  sdsc: 'San Diego County Superior Court',
};

const repoRoot = path.resolve(process.cwd(), '..');
const judgesRoot = path.join(repoRoot, 'data', 'judges');

function isJudge(value: unknown): value is Judge {
  if (!value || typeof value !== 'object') return false;
  const judge = value as Partial<Judge>;
  return Boolean(
    judge.id &&
      judge.slug &&
      judge.name &&
      judge.jurisdiction &&
      judge.court_name &&
      judge.status &&
      Array.isArray(judge.standing_orders) &&
      judge.procedural &&
      Array.isArray(judge.sources),
  );
}

function readJudge(filePath: string): Judge | undefined {
  const parsed = yaml.load(fs.readFileSync(filePath, 'utf8'));
  if (!isJudge(parsed)) return undefined;
  return parsed;
}

function compareJudges(a: Judge, b: Judge): number {
  return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
}

export function getAllJudges(): Judge[] {
  if (!fs.existsSync(judgesRoot)) return [];

  return fs
    .readdirSync(judgesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((jurisdiction) => {
      const jurisdictionPath = path.join(judgesRoot, jurisdiction.name);
      return fs
        .readdirSync(jurisdictionPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.yaml'))
        .map((entry) => readJudge(path.join(jurisdictionPath, entry.name)))
        .filter((judge): judge is Judge => Boolean(judge));
    })
    .sort(compareJudges);
}

export function getJudge(jurisdiction: string, slug: string): Judge | undefined {
  return getAllJudges().find(
    (judge) => judge.jurisdiction === jurisdiction && judge.slug === slug,
  );
}

export function getJurisdictions(): JurisdictionSummary[] {
  const counts = getAllJudges().reduce<Record<string, number>>((acc, judge) => {
    acc[judge.jurisdiction] = (acc[judge.jurisdiction] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([slug, count]) => ({
      slug,
      name: jurisdictionName(slug),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function jurisdictionName(slug: string): string {
  return jurisdictionNames[slug] ?? slug.toUpperCase();
}

export function labelForField(field: string): string {
  return field
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatFieldValue(value: string | number | string[] | undefined): string {
  if (value === undefined) return 'Not published';
  if (Array.isArray(value)) return value.map(formatToken).join(', ');
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : `${Math.round(value * 100)}%`;
  return formatToken(value);
}

function formatToken(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
