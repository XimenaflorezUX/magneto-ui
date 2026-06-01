export type ComparativeCounterPosition = 'left' | 'center' | 'right'

export interface IComparativeCounter {
  current: number
  max: number
  position?: ComparativeCounterPosition
  className?: string
}

/** @deprecated Use `ComparativeCounterPosition` */
export type TComparativeCounterPosition = ComparativeCounterPosition
