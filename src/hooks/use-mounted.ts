// src/hooks/use-mounted.ts
import { useEffect, useState } from 'react'

/**
 * Hook to check if component is mounted on client side
 * Prevents hydration errors with SSR
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}