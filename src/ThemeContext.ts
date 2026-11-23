import { createContext } from "react"

type ThemeContextValue = {
  theme: boolean
  setTheme: (theme: boolean) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: false,
  setTheme: () => undefined,
})
