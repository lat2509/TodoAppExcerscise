import type { AuthState } from "../Todos/types"
import { persist } from "zustand/middleware"
import { create } from "zustand"
const UseAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login(email) {
                set({ user: email })
            },
            logout() {
                set({ user: null });
            },
        }),
        { name: "auth-storage" }
    )
);

export default UseAuthStore