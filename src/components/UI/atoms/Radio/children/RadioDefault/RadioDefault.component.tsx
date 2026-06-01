import React from 'react'
import { classNames, useElementId } from '@shared/utils/common'
import { IRadioDefaultProps } from './RadioDefault.interface'
import styles from './RadioDefault.module.scss'

const cx = classNames.bind(styles)

/**
 * Radio control with circular indicator — Magneto DS (Figma: radio button+ text).
 *
 * **a11y:** Native `<input type="radio">` in `<label htmlFor>`. Same `name` for mutually exclusive groups.
 * Keyboard: arrows in group (browser); `:focus-visible` on label. Use `<fieldset>` + `<legend>` for groups.
 */
const Component: React.FC<IRadioDefaultProps> = ({
  checked,
  children,
  childrenClassName,
  className,
  defaultChecked,
  disabled,
  id: idProp,
  indicatorClassName,
  onChange,
  size = 'md',
  withBackground = true
}) => {
  const isChecked = Boolean(checked ?? defaultChecked)
  const generatedId = useElementId('magneto-ui-radio')
  const inputId = idProp ?? generatedId

  return (
    <label
      data-lib="magneto-ui"
      data-slot="radio"
      data-size={size}
      className={cx(
        'magneto-ui-radio',
        isChecked ? 'magneto-ui-radio--checked' : undefined,
        disabled ? 'magneto-ui-radio--disabled' : undefined,
        withBackground ? undefined : 'magneto-ui-radio--inline-only',
        className
      )}
      htmlFor={inputId}
    >
      <span
        className={cx(
          'magneto-ui-radio__indicator',
          `magneto-ui-radio__indicator--${size}`,
          isChecked ? 'magneto-ui-radio__indicator--checked' : undefined,
          indicatorClassName
        )}
        aria-hidden="true"
      />
      <input
        type="radio"
        id={inputId}
        className={cx('magneto-ui-radio__input')}
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        aria-checked={isChecked}
      />
      {children != null && (
        <span className={cx('magneto-ui-radio__label', childrenClassName)}>{children}</span>
      )}
    </label>
  )
}

export const RadioDefault = Component
