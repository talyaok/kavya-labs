import "server-only";
import { auth } from "@/auth";

export async function getAdminSession() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = session?.user?.email?.trim().toLowerCase();

  if (!session?.user || !adminEmail || userEmail !== adminEmail) {
    return null;
  }

  return session;
}

export async function isAdmin() {
  const session = await getAdminSession();
  return Boolean(session);
}