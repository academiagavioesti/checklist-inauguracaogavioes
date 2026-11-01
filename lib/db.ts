import "server-only"
import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL ?? "")
let schemaPromise: Promise<void> | undefined
export function ensureSchema() {
  schemaPromise ??= (async () => {
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`
    await sql`CREATE TABLE IF NOT EXISTS termos (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), nome text NOT NULL, cpf text NOT NULL, tipo text NOT NULL, tipo_label text NOT NULL, nome_outro text NOT NULL DEFAULT '', marca text NOT NULL DEFAULT '', modelo text NOT NULL DEFAULT '', specific_label text NOT NULL DEFAULT '', specific_value text NOT NULL DEFAULT '', acessorios text NOT NULL DEFAULT '', data_termo text NOT NULL, unidade text NOT NULL DEFAULT '', termo jsonb NOT NULL)`
    await sql`CREATE TABLE IF NOT EXISTS app_settings (key text PRIMARY KEY, value jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())`
    await sql`CREATE INDEX IF NOT EXISTS termos_created_at_idx ON termos (created_at DESC)`
    await sql`CREATE INDEX IF NOT EXISTS termos_tipo_label_idx ON termos (tipo_label)`
  })()
  return schemaPromise
}
