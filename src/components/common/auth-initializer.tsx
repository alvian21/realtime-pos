"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { authPermissions } from "@/actions/auth-action";

export default function AuthInitializer() {
  const setPermissions = useAuthStore((state) => state.setPermissions);

  useEffect(() => {
    async function loadPermissions() {
      try {
        const permissions = await authPermissions();

        if (permissions) {
          setPermissions([
            ...permissions.permission,
            ...permissions.role,
            ...permissions.user,
          ]);
        }
      } catch (e) {
        console.error("Failed to load permissions", e);
      }
    }

    loadPermissions();
  }, [setPermissions]);

  return null;
}
