import React from 'react'
import { IconItem } from '@components/UI/atoms/Icon'
import { renderIconSlot, type IconSlotConfig, type IconSize } from '@shared/icons'
import { classNames, useElementId } from '@shared/utils/common'
import type { IconProps } from '@components/UI/atoms/Icon'
import { IRadioButtonProps } from './RadioButton.interface'
import styles from './RadioButton.module.scss'

const cx = classNames.bind(styles)

const isLegacyIconProps = (icon: IRadioButtonProps['prefixIcon']): icon is IconProps =>
  Boolean(icon && 'icon' in icon && icon.icon != null)

const toIconSlot = (icon?: IRadioButtonProps['prefixIcon']): IconSlotConfig | null => {
  if (!icon || isLegacyIconProps(icon)) return null
  if ('name' in icon && icon.name) {
    return { name: icon.name, family: icon.family }
  }
  return null
}

const renderLegacyIcon = (icon: IconProps, size: IconSize) => (
  <IconItem size={size === 'sm' ? 16 : 18} {...icon} className={cx('magneto-ui-radio-chip__legacy-icon', icon.className)} />
)

/**
 * Chip-style radio variant (legacy). For Figma card + circle use `type="radio"` (RadioDefault).
 *
 * **a11y:** Same as RadioDefault — native radio in label; `:focus-visible` ring on chip label.
 */
const Component: React.FC<IRadioButtonProps> = ({
  checked,
  children,
  childrenClassName,
  className,
  defaultChecked,
  disabled,
  id: idProp,
  onChange,
  prefixIcon,
  suffixIcon,
  size = 'md'
}) => {
  const isChecked = Boolean(checked ?? defaultChecked)
  const generatedId = useElementId('magneto-ui-radio-chip')
  const inputId = idProp ?? generatedId
  const iconSize: IconSize = size === 'sm' ? 'sm' : 'md'
  const leadingSlot = toIconSlot(prefixIcon)
  const trailingSlot = toIconSlot(suffixIcon)
  const leadingLegacy = prefixIcon && isLegacyIconProps(prefixIcon) ? prefixIcon : null
  const trailingLegacy = suffixIcon && isLegacyIconProps(suffixIcon) ? suffixIcon : null

  return (
    <label
      data-lib="magneto-ui"
      data-slot="radio-chip"
      className={cx(
        'magneto-ui-radio-chip',
        isChecked ? 'magneto-ui-radio-chip--checked' : undefined,
        disabled ? 'magneto-ui-radio-chip--disabled' : undefined,
        className
      )}
      htmlFor={inputId}
    >
      {leadingLegacy
        ? renderLegacyIcon(leadingLegacy, iconSize)
        : leadingSlot &&
          renderIconSlot({
            slot: leadingSlot,
            size: iconSize,
            glyphClassName: 'magneto-ui-icon-glyph'
          })}
      <input
        type="radio"
        id={inputId}
        className={cx('magneto-ui-radio-chip__input')}
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        aria-checked={isChecked}
      />
      {children != null && (
        <span className={cx('magneto-ui-radio-chip__children', childrenClassName)}>{children}</span>
      )}
      {trailingLegacy
        ? renderLegacyIcon(trailingLegacy, iconSize)
        : trailingSlot &&
          renderIconSlot({
            slot: trailingSlot,
            size: iconSize,
            glyphClassName: 'magneto-ui-icon-glyph'
          })}
    </label>
  )
}

export const RadioButton = Component
