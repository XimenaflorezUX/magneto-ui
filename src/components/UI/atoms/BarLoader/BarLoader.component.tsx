import React, { useCallback, useMemo } from 'react'
import { BAR_LOADER_PREFIX } from './BarLoader.constants'
import { classNames } from '@shared/utils/common'
import { IBarLoader } from './BarLoader.interface'
import styles from './BarLoader.module.scss'

const cx = classNames.bind(styles)

/**
 * Horizontal progress / loading bar — Magneto Design System.
 *
 * **a11y:** `role="progressbar"`, `aria-label` (default `"Loading"`), `aria-valuemin/max/now` when determinate,
 * `aria-busy` when indeterminate.
 *
 * @param percent - When set (0–100), shows a static fill. When omitted, runs indeterminate animation.
 * @param color - Optional CSS color override for the bar fill (`--bar-loader-color`).
 */
const Component: React.FC<IBarLoader> = ({ className, color, percent, 'aria-label': ariaLabel = 'Loading' }) => {
  const validateCompleted = useCallback((value?: number) => {
    if (value == null) return 0
    const numValue = Number(value)
    if (Number.isNaN(numValue) || numValue < 0) return 0
    if (numValue > 100) return 100
    return numValue
  }, [])

  const trackStyle = useMemo(
    () =>
      ({
        ...(color ? { [`${BAR_LOADER_PREFIX}-color`]: color } : {}),
        ...(percent !== undefined
          ? { [`${BAR_LOADER_PREFIX}-completed`]: `${validateCompleted(percent)}%` }
          : {})
      }) as React.CSSProperties,
    [color, percent, validateCompleted]
  )

  const isDeterminate = percent !== undefined

  return (
    <div
      data-lib="magneto-ui"
      data-slot="bar-loader"
      className={cx('magneto-ui-bar-loader', className)}
      style={trackStyle}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isDeterminate ? validateCompleted(percent) : undefined}
      aria-busy={!isDeterminate}
    >
      <div
        className={cx(
          'magneto-ui-bar-loader__bar',
          isDeterminate ? 'magneto-ui-bar-loader__bar--completed' : 'magneto-ui-bar-loader__bar--animated'
        )}
      />
    </div>
  )
}

export const BarLoader = Component
