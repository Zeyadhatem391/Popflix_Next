import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export default async function LoginLink() {
  const session = await getServerSession(authOptions);

  if (session) return null;

  return <Link href="/login">Login</Link>;
}
