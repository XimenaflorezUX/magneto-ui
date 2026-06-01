import { useRef } from 'react'

let elementIdCounter = 0

/**
 * Stable DOM id for label/input pairing. Use when `id` prop is optional.
 * React 17 compatible (native `useId` requires React 18+).
 */
export const useElementId = (prefix = 'magneto-ui'): string => {
  const idRef = useRef<string>()

  if (idRef.current === undefined) {
    elementIdCounter += 1
    idRef.current = `${prefix}-${elementIdCounter}`
  }

  return idRef.current
}
