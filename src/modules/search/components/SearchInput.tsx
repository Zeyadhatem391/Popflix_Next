"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";

type Props = {
  initialValue: string;
};

export default function SearchInput({ initialValue }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(initialValue);

  const [, setUrlQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    })
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUrlQuery(query.trim() || null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, setUrlQuery]);

  return (
    <Input
      ref={inputRef}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="h-12 bg-zinc-900"
    />
  );
}