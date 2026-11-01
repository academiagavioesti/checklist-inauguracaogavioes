"use client"

import { useCallback, useEffect, useState } from "react"

export function useStoredState<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initial)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) setValue(JSON.parse(stored) as T)
    } catch {
      // Ignora armazenamento indisponível ou corrompido.
    } finally {
      setLoaded(true)
    }
  }, [key])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignora armazenamento indisponível.
    }
  }, [key, loaded, value])

  return [value, setValue, loaded]
}

export function readStored<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? fallback : (JSON.parse(stored) as T)
  } catch {
    return fallback
  }
}

export function writeStored<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignora armazenamento indisponível.
  }
}
