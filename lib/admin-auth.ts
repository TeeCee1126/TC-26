import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "tc26_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  const session = cookieStore.get(ADMIN_SESSION_COOKIE);

  return session?.value === "authenticated";
}

export { ADMIN_SESSION_COOKIE };