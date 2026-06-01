import React, { useCallback } from 'react'
import { classNames } from '@shared/utils/common'
import { useCollapse } from '../../Collapse.context'
import { TCollapseToggler } from './CollapseToggler.interface'
import styles from './CollapseToggler.module.scss'

const cx = classNames.bind(styles)

const Component: React.FC<TCollapseToggler> = ({
  children,
  className,
  onClick,
  'aria-label': ariaLabel = 'Toggle section',
  ...props
}) => {
  const { open, onChangeOpen } = useCollapse()

  const handleOnClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick?.(evt)
      if (!evt.defaultPrevented) {
        onChangeOpen(!open)
      }
    },
    [open, onChangeOpen, onClick]
  )

  return (
    <button
      type="button"
      {...props}
      aria-expanded={open}
      aria-label={ariaLabel}
      onClick={handleOnClick}
      className={cx('magneto-ui-collapse-toggler', className)}
    >
      {children}
    </button>
  )
}

export const CollapseToggler = Component
