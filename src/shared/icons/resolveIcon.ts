import { iconCatalog } from './manifest/catalog'
import { iconRegistry } from './registry'
import { legacyIconBridge } from './legacy-bridge.registry'
import { ICON_FAMILY_DEFAULT, type IconFamily, type IconSource } from './types'

/**
 * Resolves an icon asset URL from the DS registry (exported SVGs + legacy bridge).
 * @param name - kebab-case name matching Figma layer naming
 * @param family - defaults to `iconsax-outline`
 */
export const resolveIcon = (name: string, family: IconFamily = ICON_FAMILY_DEFAULT): IconSource | null => {
  const fromRegistry = iconRegistry[family][name]
  if (fromRegistry) return fromRegistry

  const fromLegacy = legacyIconBridge[family]?.[name]
  if (fromLegacy) return fromLegacy

  return null
}

export const isCatalogIcon = (name: string, family: IconFamily = ICON_FAMILY_DEFAULT): boolean =>
  iconCatalog[family].some((entry) => entry.name === name)

export const hasIcon = (name: string, family: IconFamily = ICON_FAMILY_DEFAULT): boolean =>
  resolveIcon(name, family) != null

export const listCatalogIcons = (family: IconFamily = ICON_FAMILY_DEFAULT): string[] =>
  iconCatalog[family].map((entry) => entry.name)
