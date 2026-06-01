import type { MagnetoUIIcon } from '@shared/tokens'

/**
 * Icon families aligned with the Figma library (libreria-Iconos).
 * `iconsax-outline` is the global default; other families require an explicit override.
 */
export const ICON_FAMILIES = ['iconsax-outline', 'iconsax-bold', 'tabler', 'lucide'] as const

export type IconFamily = (typeof ICON_FAMILIES)[number]

/** Default family for all DS components unless design specifies otherwise. */
export const ICON_FAMILY_DEFAULT: IconFamily = 'iconsax-outline'

export type IconSize = MagnetoUIIcon

export type IconSource = string

export type IconRegistryMap = Record<IconFamily, Record<string, IconSource>>

/** Registry icon reference (kebab-case name + optional family override). */
export interface IconSlotConfig {
  name: string
  family?: IconFamily
}
