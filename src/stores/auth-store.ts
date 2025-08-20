import { INITIAL_STATE_PROFILE, INITIAL_STATE_USER } from "@/constants/auth-constant";
import { Profile } from "@/types/auth";
import { User } from "@/types/auth";
import { create } from "zustand";

type Permission = {
    id: string;
    name: string;
    alias: string;
};

type AuthState = {
    user: User | null;
    profile: Profile | null;
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile | null) => void;
    permissions: string[];
    setPermissions: (permissions: Permission[]) => void;
    hasPermission: (alias: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: INITIAL_STATE_USER,
    profile: INITIAL_STATE_PROFILE,
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    permissions: [],
    setPermissions: (permissions: Permission[]) =>
        set({ permissions: permissions.map((p) => p.alias) }),
    hasPermission: (alias) => get().permissions.includes(alias),
}))