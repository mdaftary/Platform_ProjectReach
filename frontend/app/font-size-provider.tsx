'use client'

import React from 'react'

type FontSizeMode = 'normal' | 'large' | 'grandparent'

type FontSizeContextValue = {
  mode: FontSizeMode
  isLarge: boolean
  isGrandparent: boolean
  setMode: (mode: FontSizeMode) => void
  toggle: () => void
  getFontSizeLabel: () => string
  getFontSizeDescription: () => string
}

const FontSizeContext = React.createContext<FontSizeContextValue | undefined>(
  undefined
)

const LOCAL_STORAGE_KEY = 'app-font-size-mode'

function applyRootFontSize(mode: FontSizeMode) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  
  // Enhanced font size options for better accessibility
  let fontSize: string
  let lineHeight: string
  
  switch (mode) {
    case 'large':
      fontSize = '20px'      // 125% increase
      lineHeight = '1.6'
      break
    case 'grandparent':
      fontSize = '24px'      // 150% increase
      lineHeight = '1.7'
      break
    default: // 'normal'
      fontSize = '16px'      // 100% baseline
      lineHeight = '1.5'
      break
  }
  
  root.style.fontSize = fontSize
  root.style.lineHeight = lineHeight
  root.setAttribute('data-font-size', mode)
  
  // Add CSS custom properties for additional styling
  root.style.setProperty('--font-scale', mode === 'grandparent' ? '1.5' : mode === 'large' ? '1.25' : '1')
  
  console.log(`Applied font size: ${fontSize} (${mode} mode)`) // Debug log
}

export function FontSizeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mode, setMode] = React.useState<FontSizeMode>('normal')

  // Initialize from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY) as FontSizeMode | null
      if (stored === 'normal' || stored === 'large' || stored === 'grandparent') {
        setMode(stored)
        applyRootFontSize(stored)
        return
      }
    } catch {}
    applyRootFontSize('normal')
  }, [])

  // Apply changes and persist
  React.useEffect(() => {
    applyRootFontSize(mode)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, mode)
    } catch {}
  }, [mode])

  const value = React.useMemo<FontSizeContextValue>(
    () => ({
      mode,
      isLarge: mode === 'large',
      isGrandparent: mode === 'grandparent',
      setMode,
      toggle: () => {
        // Cycle through all font sizes: normal -> large -> grandparent -> normal
        setMode((m) => {
          switch (m) {
            case 'normal': return 'large'
            case 'large': return 'grandparent'
            case 'grandparent': return 'normal'
            default: return 'normal'
          }
        })
      },
      getFontSizeLabel: () => {
        switch (mode) {
          case 'large': return 'Large Text'
          case 'grandparent': return 'Grandparent Mode'
          default: return 'Normal Text'
        }
      },
      getFontSizeDescription: () => {
        switch (mode) {
          case 'large': return 'Slightly larger text for better readability'
          case 'grandparent': return 'Very large text optimized for elderly users'
          default: return 'Standard text size'
        }
      },
    }),
    [mode]
  )

  return (
    <FontSizeContext.Provider value={value}>{children}</FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const ctx = React.useContext(FontSizeContext)
  if (!ctx) {
    throw new Error('useFontSize must be used within a FontSizeProvider')
  }
  return ctx
}


