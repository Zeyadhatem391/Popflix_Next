import { auth } from "@/auth";
import Link from "next/link";

export default async function LoginLink() {
  const session = await auth();

  if (session) return null;

  return <Link href="/login">Login</Link>;
}
