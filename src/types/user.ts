export interface User {
  id: string; // uuid
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}
