import type { IconSize } from './types'

/** Button height scale — mirrors `ButtonSize` without coupling atoms to this module. */
export type ButtonScaleSize = 'xl' | 'lg' | 'md' | 'sm'

/**
 * Maps button size to semantic icon size tokens (`icon.json`).
 * Aligns with Figma icon slots inside Primary Button.
 */
export const getButtonIconSize = (buttonSize: ButtonScaleSize): IconSize => {
  const map: Record<ButtonScaleSize, IconSize> = {
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
    xl: 'md'
  }
  return map[buttonSize]
}
