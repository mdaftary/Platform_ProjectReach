"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('light') // Force light mode initially
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Load theme from localStorage on mount, but default to light mode for new users
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme)
    } else {
      // For new users, explicitly set and save light mode
      setThemeState('light')
      localStorage.setItem('theme', 'light')
    }
  }, [])

  // Update resolved theme based on current theme and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          console.log('System theme detected:', systemTheme) // Debug log
          setResolvedTheme(systemTheme)
        } else {
          // Fallback to light theme on server
          setResolvedTheme('light')
        }
      } else {
        console.log('Setting theme to:', theme) // Debug log
        setResolvedTheme(theme)
      }
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateResolvedTheme, 10)

    // Listen for system theme changes only in browser environment
    let mediaQuery: MediaQueryList | null = null
    let handleChange: (() => void) | null = null
    
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      handleChange = () => {
        if (theme === 'system') {
          updateResolvedTheme()
        }
      }
      
      // Use the newer addEventListener if available, fallback to addListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else {
        mediaQuery.addListener(handleChange)
      }
    }

    return () => {
      clearTimeout(timeoutId)
      if (mediaQuery && handleChange) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange)
        } else {
          mediaQuery.removeListener(handleChange)
        }
      }
    }
  }, [theme])

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return // Skip on server
    
    const root = document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(resolvedTheme)
    
    // Update data attribute for CSS selectors
    root.setAttribute('data-theme', resolvedTheme)
    
    // Force a repaint to ensure styles are applied
    root.style.colorScheme = resolvedTheme
    
    console.log('Applied theme:', resolvedTheme, 'to document') // Debug log
  }, [resolvedTheme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const value = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
