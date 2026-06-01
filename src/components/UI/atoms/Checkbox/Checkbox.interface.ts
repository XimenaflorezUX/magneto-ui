export type CheckboxSize = 'sm' | 'md'

/** `background` = Figma check+text (grey-100 card). `box` = control + label only. */
export type CheckboxVariant = 'box' | 'background'

export type CheckboxDisplay = 'inline' | 'block'

export interface ICheckbox
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'type'> {
  /**
   * Associates the visible label with the input (`htmlFor`). Auto-generated if omitted.
   */
  id?: string
  /** Controlled checked state (Figma `estado=select`). */
  checked?: boolean
  /** Indeterminate / mixed (Figma `estado=three state`). */
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  variant?: CheckboxVariant
  /** `md`: 28px control, 20px icon, 14px label. `sm`: 20px control, 16px icon. */
  size?: CheckboxSize
  display?: CheckboxDisplay
  className?: string
}
