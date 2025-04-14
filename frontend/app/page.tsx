"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // redirect to page 1 of form
  useEffect(() => {
    router.push("/form/step1");
  }, [router]);

  return null;
}
