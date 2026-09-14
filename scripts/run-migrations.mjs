import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Client } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const ref = "vowvjcloedewmvrwwcky";
const password = process.env.SUPABASE_DB_PASSWORD;
const connectionString = `postgresql://postgres.${ref}:${password}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`;

const dir = join(process.cwd(), "supabase", "migrations");
const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();

const client = new Client({ connectionString });
await client.connect();

await client.query(`
  create table if not exists public._migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  );
`);
const { rows } = await client.query("select name from public._migrations");
const applied = new Set(rows.map((r) => r.name));

for (const file of files) {
  if (applied.has(file)) {
    console.log(`SKIP (already applied): ${file}`);
    continue;
  }
  const sql = readFileSync(join(dir, file), "utf8");
  console.log(`--- Running ${file} ---`);
  try {
    await client.query(sql);
    await client.query("insert into public._migrations (name) values ($1)", [file]);
    console.log(`OK: ${file}`);
  } catch (err) {
    console.error(`FAILED: ${file}:`, err.message);
    await client.end();
    process.exit(1);
  }
}

await client.end();
console.log("All migrations applied.");
