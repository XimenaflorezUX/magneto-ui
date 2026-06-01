import React from 'react'
import { classNames } from '@shared/utils/common'
import { IBadge } from './Badge.interface'
import styles from './Badge.module.scss'

const cx = classNames.bind(styles)

/**
 * Notification count badge — Magneto Design System.
 *
 * **a11y:** When `number` is shown, uses `role="status"` and `aria-label` for the count.
 * Decorative when empty (no role). Pulse ring is `aria-hidden`.
 *
 * @param number - Count displayed inside the badge. Omitted when undefined or 0.
 * @param pulse - Enables the pulse animation ring (default: true when count is shown).
 */
const Component: React.FC<IBadge> = ({ number, className, pulse = true }) => {
  const showCount = number != null && number > 0

  return (
    <span
      data-lib="magneto-ui"
      data-slot="badge"
      className={cx('magneto-ui-badge', className)}
      role={showCount ? 'status' : undefined}
      aria-label={showCount ? `${number} notifications` : undefined}
    >
      {showCount && pulse && <span className={cx('magneto-ui-badge__pulse')} aria-hidden="true" />}
      {showCount ? number : null}
    </span>
  )
}

export const Badge = Component
