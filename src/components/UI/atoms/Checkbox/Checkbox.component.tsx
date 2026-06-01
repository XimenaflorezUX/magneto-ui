import React, { useEffect, useRef } from 'react'
import { renderIconSlot } from '@shared/icons'
import { classNames, useElementId } from '@shared/utils/common'
import { ICheckbox } from './Checkbox.interface'
import styles from './Checkbox.module.scss'

const cx = classNames.bind(styles)

/**
 * Checkbox atom — Magneto DS `check+text` ([Figma 1485:7828](https://www.figma.com/design/udlNA8xVfPrSEmTtlQcbW2/Style-guideline-Magneto?node-id=1485-7828)).
 *
 * **a11y:** Native `<input type="checkbox">` inside `<label htmlFor={id}>`. Pass a stable `id`.
 * `aria-checked="mixed"` when `indeterminate`. Decorative control uses `aria-hidden`.
 * Keyboard: Space toggles; `:focus-visible` ring on the label (`blue-light-300`).
 * Groups in forms: wrap related options in `<fieldset>` + `<legend>` (consumer).
 *
 * States: default · checked (select) · indeterminate (three state) · disabled.
 * Sizes: `md` (28px) · `sm` (20px). Variant `background` = grey-100 card per Figma.
 */
const Component: React.FC<ICheckbox> = ({
  id: idProp,
  checked = false,
  indeterminate = false,
  onChange,
  children,
  variant = 'background',
  size = 'md',
  className,
  display = 'inline',
  disabled,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const generatedId = useElementId('magneto-ui-checkbox')
  const inputId = idProp ?? generatedId
  const showControlIcon = checked || indeterminate

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const iconSize = size === 'sm' ? 'sm' : 'md'

  const controlIcon = indeterminate
    ? renderIconSlot({
        slot: { name: 'minus' },
        size: iconSize,
        glyphClassName: cx('magneto-ui-checkbox__icon', 'magneto-ui-icon-glyph')
      })
    : checked
      ? renderIconSlot({
          slot: { name: 'check' },
          size: iconSize,
          glyphClassName: cx('magneto-ui-checkbox__icon', 'magneto-ui-icon-glyph')
        })
      : null

  return (
    <label
      data-lib="magneto-ui"
      data-slot="checkbox"
      data-variant={variant}
      data-size={size}
      className={cx(
        'magneto-ui-checkbox',
        `magneto-ui-checkbox--${display}`,
        variant === 'background' ? 'magneto-ui-checkbox--background' : undefined,
        checked ? 'magneto-ui-checkbox--checked' : undefined,
        indeterminate ? 'magneto-ui-checkbox--indeterminate' : undefined,
        disabled ? 'magneto-ui-checkbox--disabled' : undefined,
        `magneto-ui-checkbox--${size}`,
        className
      )}
      htmlFor={inputId}
    >
      <span
        className={cx(
          'magneto-ui-checkbox__control',
          `magneto-ui-checkbox__control--${size}`,
          checked ? 'magneto-ui-checkbox__control--checked' : undefined,
          indeterminate ? 'magneto-ui-checkbox__control--indeterminate' : undefined
        )}
        aria-hidden="true"
      >
        {showControlIcon && controlIcon != null && (
          <span className={cx('magneto-ui-checkbox__icon-wrap')}>{controlIcon}</span>
        )}
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="checkbox"
        className={cx('magneto-ui-checkbox__input')}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        aria-checked={indeterminate ? 'mixed' : checked}
        {...rest}
      />
      {children != null && <span className={cx('magneto-ui-checkbox__label')}>{children}</span>}
    </label>
  )
}

export const Checkbox = Component
