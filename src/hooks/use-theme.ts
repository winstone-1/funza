import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null

    if (stored) {
      setThemeState(stored)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(prefersDark ? 'dark' : 'light')
    }

    setIsLoaded(true)
  }, [])

  // Apply theme to DOM when theme changes
  useEffect(() => {
    if (!isLoaded || !theme) return

    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme, isLoaded])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme, isLoaded }
}
