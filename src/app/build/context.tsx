'use client'

import type { Content } from '@prismicio/client'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

interface CustomizerControlsContextType {
  /** 选中的轮子 */
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void
  /** 选中的甲板 */
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void
  /** 选中的车架 */
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem
  setTruck: (trucks: Content.BoardCustomizerDocumentDataMetalsItem) => void
  /** 选中的螺栓 */
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem
  setBolt: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void
}

const defaultContext: CustomizerControlsContextType = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
}

const CustomizerControlsContext = createContext(defaultContext)

interface CustomizerControlsProviderProps {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem
  children?: ReactNode
}

export function CustomizerControlsProvider(props: CustomizerControlsProviderProps) {
  const { defaultWheel, defaultDeck, defaultTruck, defaultBolt, children } = props

  const [selectedWheel, setWheel] = useState(defaultWheel)
  const [selectedDeck, setDeck] = useState(defaultDeck)
  const [selectedTruck, setTruck] = useState(defaultTruck)
  const [selectedBolt, setBolt] = useState(defaultBolt)

  const value = useMemo<CustomizerControlsContextType>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    }
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt])

  return (
    <CustomizerControlsContext value={value}>
      {children}
    </CustomizerControlsContext>
  )
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext)
}
