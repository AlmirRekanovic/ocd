import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { SESSION_COOKIE as COOKIE_NAME } from "./constants";
import type { Role, User, UserWithHash } from "./types";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET || "dev-insecure-secret-change-me";
  return new TextEncoder().encode(s);
}

export interface SessionPayload {
  uid: number;
  role: Role;
  name: string;
}

export async function createSession(user: User): Promise<void> {
  const token = await new SignJWT({ uid: user.id, role: user.role, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function destroySession(): void {
  cookies().delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** Verify the JWT cookie value directly (used by middleware on the edge). */
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function authenticate(username: string, password: string): User | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as UserWithHash | undefined;
  if (!row) return null;
  if (!bcrypt.compareSync(password, row.password_hash)) return null;
  const { password_hash, ...user } = row;
  return user as User;
}

export function getUserById(id: number): User | null {
  const db = getDb();
  const row = db
    .prepare("SELECT id, name, phone, username, role, created_at FROM users WHERE id = ?")
    .get(id) as User | undefined;
  return row ?? null;
}
