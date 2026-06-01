import React, { forwardRef, useMemo } from 'react'
import { getButtonIconSize, renderIconSlot } from '@shared/icons'
import { IButton } from './Button.interface'
import { classNames } from '@shared/utils/common'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const isValidIconNode = (node: React.ReactNode): node is React.ReactElement => React.isValidElement(node)

/**
 * Primary action atom — Magneto Design System.
 *
 * Supports 7 color variants, 4 sizes (xl / lg / md / sm) and all interactive
 * states: Default · Hover · Active · Focus · Disabled.
 *
 * @example
 * <Button variant="blue" size="md" leadingIcon={{ name: 'add' }}>
 *   Guardar
 * </Button>
 *
 * @param variant      - Visual color: 'blue' | 'green' | 'grey' | 'danger' | 'ghost' | 'white' | 'light-blue'
 * @param size         - Height scale: 'xl' (52px) | 'lg' (40px) | 'md' (32px) | 'sm' (28px)
 * @param leadingIcon  - Leading icon from DS registry (iconsax-outline by default)
 * @param trailingIcon - Trailing icon from DS registry
 * @param iconLeft     - Custom leading node (legacy / overrides registry)
 * @param iconRight    - Custom trailing node (legacy / overrides registry)
 * @param fullWidth    - Stretch to 100% container width
 */
const BaseComponent = (
  {
    addHover,
    children,
    buttonText,
    className,
    disabled,
    fullWidth = false,
    iconLeft,
    iconRight,
    leadingIcon,
    prefixIcon,
    size = 'md',
    suffixIcon,
    trailingIcon,
    type = 'button',
    variant = 'blue',
    ...props
  }: IButton,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const iconSize = getButtonIconSize(size)
  const iconGlyphClass = cx('magneto-ui-button__icon-image', 'magneto-ui-icon-glyph')

  const leadingRegistryIcon = useMemo(
    () =>
      leadingIcon?.name
        ? renderIconSlot({ slot: leadingIcon, size: iconSize, glyphClassName: iconGlyphClass })
        : null,
    [iconGlyphClass, iconSize, leadingIcon]
  )

  const trailingRegistryIcon = useMemo(
    () =>
      trailingIcon?.name
        ? renderIconSlot({ slot: trailingIcon, size: iconSize, glyphClassName: iconGlyphClass })
        : null,
    [iconGlyphClass, iconSize, trailingIcon]
  )

  const startIcon =
    (isValidIconNode(iconLeft) ? iconLeft : null) ??
    (isValidIconNode(prefixIcon) ? prefixIcon : null) ??
    leadingRegistryIcon

  const endIcon =
    (isValidIconNode(iconRight) ? iconRight : null) ??
    (isValidIconNode(suffixIcon) ? suffixIcon : null) ??
    trailingRegistryIcon
  const label = children ?? buttonText
  void addHover

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      data-lib="magneto-ui"
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-disabled={disabled}
      className={cx(
        'magneto-ui-button',
        `magneto-ui-button--${variant}`,
        `magneto-ui-button--${size}`,
        fullWidth ? 'magneto-ui-button--full-width' : undefined,
        disabled ? 'magneto-ui-button--disabled' : undefined,
        className
      )}
    >
      {startIcon != null && (
        <span className={cx('magneto-ui-button__icon')} aria-hidden="true">
          {startIcon}
        </span>
      )}

      {label && (
        <span className={cx('magneto-ui-button__label')}>{label}</span>
      )}

      {endIcon != null && (
        <span className={cx('magneto-ui-button__icon')} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  )
}

const Component = forwardRef<HTMLButtonElement, IButton>(BaseComponent)

export const Button = Object.assign(Component, {})
