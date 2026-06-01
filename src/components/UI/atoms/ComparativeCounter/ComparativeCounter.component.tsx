import React, { useMemo } from 'react'
import { classNames } from '@shared/utils/common'
import { IComparativeCounter } from './ComparativeCounter.interface'
import styles from './ComparativeCounter.module.scss'

const cx = classNames.bind(styles)

const nf = new Intl.NumberFormat('de-DE')

/**
 * Current / max counter label (e.g. character count) — Magneto Design System.
 *
 * **a11y:** `role="status"` + `aria-live="polite"` so updates are announced without focus steal.
 *
 * @param current - Current value.
 * @param max - Maximum value.
 * @param position - Text alignment: `left` | `center` | `right`.
 */
const Component: React.FC<IComparativeCounter> = ({
  current = 0,
  max = 0,
  position = 'left',
  className
}) => {
  const isOverMax = useMemo(() => current > max, [current, max])

  return (
    <p
      data-lib="magneto-ui"
      data-slot="comparative-counter"
      className={cx(
        'magneto-ui-comparative-counter',
        `magneto-ui-comparative-counter--${position}`,
        isOverMax ? 'magneto-ui-comparative-counter--over-max' : undefined,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {nf.format(current)}
      <span className={cx('magneto-ui-comparative-counter__max')}> / {nf.format(max)}</span>
    </p>
  )
}

export const ComparativeCounter = Component
