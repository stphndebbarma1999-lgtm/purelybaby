import { createClient } from "@supabase/supabase-js";
import { Client } from "pg";
import { config } from "dotenv";
import crypto from "crypto";

config({ path: ".env.local" });

const email = "admin@purelybaby.shop";
const password = crypto.randomBytes(9).toString("base64").replace(/[/+=]/g, "x") + "!9Aa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: "Admin" },
});

if (error) {
  console.error("FAILED to create user:", error.message);
  process.exit(1);
}

console.log("Created auth user:", data.user.id);

const ref = "vowvjcloedewmvrwwcky";
const dbPassword = process.env.SUPABASE_DB_PASSWORD;
const client = new Client({
  connectionString: `postgresql://postgres.${ref}:${dbPassword}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`,
});
await client.connect();

// The handle_new_user trigger should have already inserted a profiles row;
// upsert defensively in case of trigger timing, then promote to admin.
await client.query(
  `insert into public.profiles (id, full_name, is_admin) values ($1, 'Admin', true)
   on conflict (id) do update set is_admin = true`,
  [data.user.id]
);

await client.end();

console.log("\n=== Admin credentials ===");
console.log("Email:   ", email);
console.log("Password:", password);
console.log("==========================");
