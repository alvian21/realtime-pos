"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
      <h1 className="text-4xl font-semibold">Welcome {user?.fullName}</h1>
      <Link href={user?.role === "Admin" ? "/admin" : "/order"}>
        <Button className="bg-teal-500 text-white">Access Dashboard</Button>
      </Link>
    </div>
  );
}
