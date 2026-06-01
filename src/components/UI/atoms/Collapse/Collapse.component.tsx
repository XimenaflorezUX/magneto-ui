import React from 'react'
import { classNames } from '@shared/utils/common'
import { Body, Header, Toggler } from './children'
import { TCollapse } from './Collapse.interface'
import * as context from './Collapse.context'
import styles from './Collapse.module.scss'

const cx = classNames.bind(styles)

/**
 * Collapsible panel compound atom — Magneto Design System.
 *
 * Compose with `Collapse.Header`, `Collapse.Toggler`, and `Collapse.Body`.
 * Use `Collapse.useCollapse()` inside children for controlled state.
 *
 * @example
 * <Collapse defaultOpen>
 *   <Collapse.Header>...</Collapse.Header>
 *   <Collapse.Body>...</Collapse.Body>
 * </Collapse>
 */
const Component: React.FC<TCollapse> = ({
  children,
  className,
  defaultOpen,
  open,
  onChangeOpen,
  panelVariant,
  ...props
}) => (
  <context.Provider defaultOpen={defaultOpen} open={open} onChangeOpen={onChangeOpen}>
    <div
      data-lib="magneto-ui"
      data-slot="collapse"
      className={cx(
        'magneto-ui-collapse',
        panelVariant === 'dark' ? 'magneto-ui-collapse--panel-dark' : undefined,
        className
      )}
      {...props}
    >
      {children}
    </div>
  </context.Provider>
)

export const Collapse = Object.assign(Component, {
  Body,
  Header,
  Toggler,
  ...context
})
