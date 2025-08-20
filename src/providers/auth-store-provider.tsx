"use client";

import { useAuthStore } from "@/stores/auth-store";
import { User } from "@/types/auth";
import { ReactNode, useEffect } from "react";

export default function AuthStoreProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  useEffect(() => {
    if(user){
      useAuthStore.getState().setUser(user);
    }
  });

  return <>{children}</>;
}
