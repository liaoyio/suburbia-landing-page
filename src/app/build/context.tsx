'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

interface CustomizerControlsContext {}

const defaultContext: CustomizerControlsContext = {}

const CustomizerControlsContext = createContext(defaultContext)

interface CustomizerControlsProviderProps {
  children?: ReactNode
}

export function CustomizerControlsProvider({ children }: CustomizerControlsProviderProps) {
  const value = useMemo<CustomizerControlsContext>(() => {
    return {}
  }, [])

  return (
    <CustomizerControlsContext value={value}>
      {children}
    </CustomizerControlsContext>
  )
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext)
}

// use: const { selectedDeck } = useCustomizerControls()
