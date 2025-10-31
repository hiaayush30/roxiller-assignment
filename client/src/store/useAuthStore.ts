import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface IUser {
    id: string;
    name: string;
    email: string;
    address: string;
    role: "user" | "admin" | "owner";
    token: string;
}

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: AuthState["user"]) => void;
    clearUser: () => void;
    fetchUser: () => Promise<void>
}

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            isLoading: true,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            fetchUser: async () => {
                set({ isLoading: true });
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        set({ user: null, isLoading: false });
                        return;
                    }

                    const res = await axios.get(
                        import.meta.env.VITE_BACKEND_URL! + "/user/me/"+token,
                    );

                    set({ user: { ...res.data.user, token, generatedNames: [] }, isLoading: false });
                } catch {
                    set({ user: null, isLoading: false });
                }
            },

        }),
        {
            name: "auth-storage", // key in localStorage
        }
    )
);