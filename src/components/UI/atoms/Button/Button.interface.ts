import type { IconSlotConfig } from '@shared/icons'

/**
 * Visual color variant of the button.
 * Maps directly to Figma's "Color" property on the Primary Button component.
 */
export type ButtonVariant = 'blue' | 'green' | 'grey' | 'danger' | 'ghost' | 'white' | 'light-blue'

/** Icon from the DS registry (`name` + optional `family`). Default family: `iconsax-outline`. */
export type ButtonIconSlot = IconSlotConfig

/**
 * Size of the button following Magneto's 5-step scale.
 * xl=52px · lg=40px · md=32px · sm=28px
 */
export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant. Defaults to 'blue'.
   * - blue: primary action — dark navy background
   * - green: positive/confirmation action
   * - grey: secondary neutral action
   * - danger: destructive action — red background
   * - ghost: low-emphasis action — transparent background
   * - white: on-dark-surface action
   * - light-blue: informational / CTA variant
   */
  variant?: ButtonVariant
  /**
   * Button size following Magneto's scale.
   * xl → 52px | lg → 40px | md → 32px | sm → 28px
   * Defaults to 'md'.
   */
  size?: ButtonSize
  /**
   * Leading icon from the DS registry (`resolveIcon`). Preferred over manual `iconLeft`.
   * @example leadingIcon={{ name: 'add' }}
   */
  leadingIcon?: ButtonIconSlot
  /**
   * Trailing icon from the DS registry.
   * @example trailingIcon={{ name: 'arrow-right' }}
   */
  trailingIcon?: ButtonIconSlot
  /**
   * Icon node rendered before the label text.
   * Wraps in an aria-hidden span — keep icons purely decorative here.
   */
  iconLeft?: React.ReactNode
  /**
   * Legacy alias for iconLeft.
   */
  prefixIcon?: React.ReactNode
  /**
   * Icon node rendered after the label text.
   * Wraps in an aria-hidden span — keep icons purely decorative here.
   */
  iconRight?: React.ReactNode
  /**
   * Legacy alias for iconRight.
   */
  suffixIcon?: React.ReactNode
  /**
   * Legacy alias for children.
   */
  buttonText?: React.ReactNode
  /**
   * Legacy visual flag kept for consumers that still pass it.
   */
  addHover?: boolean
  /**
   * When true the button stretches to 100% of its container.
   */
  fullWidth?: boolean
}
