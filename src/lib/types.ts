export type Role = "admin" | "member";

export interface User {
  id: number;
  name: string;
  phone: string;
  username: string;
  role: Role;
  created_at: string;
}

export interface UserWithHash extends User {
  password_hash: string;
}

export interface TrainingSlot {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  notes: string | null;
  created_by: number | null;
  created_at: string;
}

export interface PrivateRequest {
  id: number;
  user_id: number;
  preferred: string | null;
  note: string | null;
  status: "pending" | "approved" | "declined";
  created_at: string;
}
