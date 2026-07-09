// LoginLink.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginLink() {
  const { data: session } = useSession();

  if (session) return null;

  return <Link href="/login">Login</Link>;
}