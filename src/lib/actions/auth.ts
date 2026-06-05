"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession, destroySession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function memberLoginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const locale = String(formData.get("locale") || "bs");

  const user = authenticate(username, password);
  if (!user) return { error: "invalid" };

  await createSession(user);
  redirect(user.role === "admin" ? "/admin" : `/${locale}/member`);
}

export async function adminLoginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  const user = authenticate(username, password);
  if (!user || user.role !== "admin") return { error: "invalid" };

  await createSession(user);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  destroySession();
  redirect("/");
}
