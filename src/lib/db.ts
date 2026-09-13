import Database from "libsql";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

// Single shared connection across hot-reloads in dev.
declare global {
  // eslint-disable-next-line no-var
  var __ocdDb: Database.Database | undefined;
}

/**
 * Opens the database connection.
 *
 * In production we talk to a hosted Turso (libSQL) database over the network,
 * configured via `TURSO_DATABASE_URL` (+ `TURSO_AUTH_TOKEN`). Locally, with no
 * such env var, we fall back to a plain SQLite file under `data/` so `npm run
 * dev` works with zero setup. The query API (`prepare`/`get`/`all`/`run`) is
 * identical in both modes, so the rest of the app is unchanged.
 */
function createConnection(): Database.Database {
  const url = process.env.TURSO_DATABASE_URL;

  if (url) {
    const options = { authToken: process.env.TURSO_AUTH_TOKEN } as Database.Options;
    const db = new Database(url, options);
    // Best-effort; harmless if the remote ignores it.
    try {
      db.pragma("foreign_keys = ON");
    } catch {
      /* remote may not support per-connection pragmas */
    }
    return db;
  }

  const configured = process.env.DATABASE_PATH;
  const file = configured || path.join(process.cwd(), "data", "ocd.db");
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

function init(): Database.Database {
  const db = createConnection();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL,
      phone         TEXT NOT NULL UNIQUE,
      username      TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'member',
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS payments (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      period     TEXT NOT NULL,            -- 'YYYY-MM'
      status     TEXT NOT NULL DEFAULT 'paid',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, period)
    );

    CREATE TABLE IF NOT EXISTS training_slots (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      date       TEXT NOT NULL,            -- 'YYYY-MM-DD'
      start_time TEXT NOT NULL,            -- 'HH:MM'
      end_time   TEXT NOT NULL,            -- 'HH:MM'
      capacity   INTEGER NOT NULL DEFAULT 12,
      notes      TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_slots_date ON training_slots(date);

    CREATE TABLE IF NOT EXISTS slot_signups (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_id    INTEGER NOT NULL REFERENCES training_slots(id) ON DELETE CASCADE,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(slot_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS private_requests (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      preferred  TEXT,
      note       TEXT,
      status     TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed the initial admin (trainer) account.
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  // INSERT OR IGNORE keeps this idempotent even if several processes
  // (e.g. parallel build workers) initialise the DB at the same time.
  db.prepare(
    `INSERT OR IGNORE INTO users (name, phone, username, password_hash, role)
     VALUES (?, ?, ?, ?, 'admin')`
  ).run("Trener", "admin", adminUsername, bcrypt.hashSync(adminPassword, 10));

  return db;
}

export function getDb(): Database.Database {
  if (!global.__ocdDb) {
    global.__ocdDb = init();
  }
  return global.__ocdDb;
}
