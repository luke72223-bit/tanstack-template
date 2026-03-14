import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Theme = 'dark' | 'light' | 'system'

interface UIState
{
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const dummyStorage =
{
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'dark',
            setTheme: (theme) => set({ theme }),
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'dark' ? 'light' : 'dark'
            })),
        }),
        {
            name: 'ui-storage',
            storage: createJSONStorage(
                () => (typeof window !== 'undefined' ? localStorage : dummyStorage)
            ),
        }
    )
)

const applyTheme = (theme: Theme) =>
{
    if (typeof window === 'undefined') return
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system")
    {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light"

        root.classList.add(systemTheme)
        return
    }

    root.classList.add(theme)
}

if (typeof window !== 'undefined')
{
    useUIStore.subscribe((state) => applyTheme(state.theme))
    applyTheme(useUIStore.getState().theme)
}
