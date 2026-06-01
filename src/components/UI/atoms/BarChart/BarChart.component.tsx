import React, { useEffect, useMemo, useRef, useState } from 'react'
import { numberToCurrency } from '@utils/currency/currency.util'
import { classNames, useElementId } from '@shared/utils/common'
import { IBarChart } from './BarChart.interface'
import { EPositions } from './enums'
import type { TPopoverPosition } from './interfaces'
import styles from './BarChart.module.scss'

const cx = classNames.bind(styles)

const VIEWPORT_EDGE_OFFSET = 50

/**
 * Single histogram bar with hover/focus popover — Magneto Design System.
 *
 * **a11y:** `role="img"` + `aria-label` summary; keyboard focusable (`tabIndex={0}`).
 * Tooltip uses `role="tooltip"` linked via `aria-describedby` when visible.
 *
 * @param bin - Salary range `[min, max]` for the popover label.
 * @param heightPercentage - Bar height as a fraction of `maxPercentage`.
 * @param jobText - Label suffix in the popover (e.g. "empleos").
 * @param point - Marker color on top of the bar (CSS color). Defaults to DS blue-light token.
 */
const Component: React.FC<IBarChart> = ({
  bin: range,
  heightPercentage: percentage,
  jobText,
  point,
  maxHeight = 400,
  maxPercentage = 1
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const tooltipId = useElementId('magneto-ui-chart-bar-tooltip')
  const [isHover, setIsHover] = useState(false)
  const [minRange, maxRange] = useMemo(() => range, [range])
  const [popoverPosition, setPopoverPosition] = useState<TPopoverPosition>(EPositions.center)

  useEffect(() => {
    if (!isHover || !barRef.current) return

    const rect = barRef.current.getBoundingClientRect()
    const screenWidth = window.innerWidth

    if (rect.right > screenWidth - VIEWPORT_EDGE_OFFSET) {
      setPopoverPosition(EPositions.left)
    } else if (rect.left < VIEWPORT_EDGE_OFFSET) {
      setPopoverPosition(EPositions.right)
    } else {
      setPopoverPosition(EPositions.center)
    }
  }, [isHover])

  const barHeight = Math.max((percentage / maxPercentage) * maxHeight, 1)
  const pointStyle = point ? ({ ['--magneto-chart-bar-point-color' as string]: point } as const) : undefined

  return (
    <div
      ref={barRef}
      data-lib="magneto-ui"
      data-slot="chart-bar"
      role="img"
      aria-label={`${numberToCurrency(minRange)} - ${numberToCurrency(maxRange)}, ${Math.round(percentage * 100)}% ${jobText}`}
      aria-describedby={isHover ? tooltipId : undefined}
      style={{ height: barHeight, ...pointStyle }}
      className={cx('magneto-ui-chart-bar')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      tabIndex={0}
    >
      <div className={cx('magneto-ui-chart-bar__point')} aria-hidden="true" />
      {isHover && (
        <div
          id={tooltipId}
          className={cx(
            'magneto-ui-chart-bar__popover',
            popoverPosition !== EPositions.center ? `magneto-ui-chart-bar__popover--${popoverPosition}` : undefined
          )}
          role="tooltip"
        >
          <div>{`${numberToCurrency(minRange)} - ${numberToCurrency(maxRange)}`}</div>
          <div>{`${Math.round(percentage * 100)}% ${jobText}`}</div>
        </div>
      )}
    </div>
  )
}

export const BarChart = Component
