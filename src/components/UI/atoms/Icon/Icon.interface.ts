import type { IconFamily, IconSize } from '@shared/icons'
import type { MagnetoUIIcon } from '@shared/tokens'

type IconCommonProps = {
  /**
   * Icon family from the Figma library. Defaults to `iconsax-outline`.
   * Use `iconsax-bold`, `tabler`, or `lucide` only when design explicitly specifies it.
   */
  family?: IconFamily
  /**
   * Semantic size from icon tokens (`xs`–`xl`). Defaults to `md`.
   * Legacy numeric pixel values are still supported when passing `icon` directly.
   */
  size?: IconSize | number
  /**
   * Sets the fallback icon when the resolved icon is not available
   */
  fallbackIcon?: string
  /**
   * Shows the default fallback icon with alt text
   */
  showDefaultFallback?: boolean
  /**
   * Hover scale animation
   */
  hover?: boolean
  /**
   * Icon color — prefer `currentColor` (default) so the icon inherits from the parent.
   */
  color?: string
  className?: string
  /**
   * Accessible label. Omit when the icon is decorative (parent provides the label).
   */
  alt?: string | null
  /**
   * Rotate image 180deg
   */
  isRotate?: boolean
  /**
   * Marks the icon as decorative for assistive technologies.
   * @default true when `alt` is omitted
   */
  decorative?: boolean
}

/** DS registry lookup by kebab-case name (Figma layer name). */
export type IconPropsByName = IconCommonProps & {
  name: string
  icon?: never
}

/** @deprecated Legacy API — pass asset URL from icons.constants. Prefer `name` + registry. */
export type IconPropsLegacy = IconCommonProps & {
  name?: never
  icon?: string | null
}

export type IconProps = IconPropsByName | IconPropsLegacy

export type { IconFamily, IconSize, MagnetoUIIcon }
