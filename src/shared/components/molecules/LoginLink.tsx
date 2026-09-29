import { auth } from "@/auth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function LoginLink() {
  const session = await auth();
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (session || user) return null;

  return <Link href="/login">Login</Link>;
}