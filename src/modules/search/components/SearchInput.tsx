"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

type Props = {
  initialValue: string;
};

export default function SearchInput({ initialValue }: Props) {
  const [query, setQuery] = useState(initialValue);

  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        if (query.trim()) {
          router.replace(`/search?query=${encodeURIComponent(query)}`);
        } else {
          router.replace("/search");
        }
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, router]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="h-12 bg-zinc-900"
    />
  );
}