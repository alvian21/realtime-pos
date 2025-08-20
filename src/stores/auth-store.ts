import { INITIAL_STATE_PROFILE, INITIAL_STATE_USER } from "@/constants/auth-constant";
import { Profile } from "@/types/auth";
import { User } from "@/types/auth";
import { create } from "zustand";

type AuthState = {
    user: User | null;
    profile: Profile | null;
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: INITIAL_STATE_USER,
    profile: INITIAL_STATE_PROFILE,
    setUser: (user) => set({user}),
    setProfile: (profile) => set({profile})
}))