import React from 'react'
import { classNames } from '@shared/utils/common'
import { TCollapseHeader } from './CollapseHeader.interface'
import styles from './CollapseHeader.module.scss'

const cx = classNames.bind(styles)

const Component: React.FC<TCollapseHeader> = ({ children, className, ...props }) => (
  <header className={cx('magneto-ui-collapse-header', className)} {...props}>
    {children}
  </header>
)

export const CollapseHeader = Component
