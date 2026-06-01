import React from 'react'
import { IconGlyph } from './IconGlyph'
import { resolveIcon } from './resolveIcon'
import { ICON_FAMILY_DEFAULT, type IconSize, type IconSlotConfig } from './types'

export type RenderIconSlotOptions = {
  slot: IconSlotConfig
  size: IconSize
  className?: string
  glyphClassName?: string
}

/**
 * Renders a registry icon inheriting `color` from the parent (currentColor via CSS mask).
 */
export const renderIconSlot = ({
  slot,
  size,
  className,
  glyphClassName
}: RenderIconSlotOptions): React.ReactNode => {
  const family = slot.family ?? ICON_FAMILY_DEFAULT
  const src = resolveIcon(slot.name, family)
  if (!src) return null

  return (
    <IconGlyph
      src={src}
      className={glyphClassName ?? className}
      data-icon-name={slot.name}
      data-icon-family={family}
      data-icon-size={size}
      inheritColor
    />
  )
}
