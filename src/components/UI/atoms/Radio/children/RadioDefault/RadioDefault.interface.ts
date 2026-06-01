import type { RadioSize } from '../../Radio.interface'
import { IRadioCommonProps } from '../../Radio.interface'

export interface IRadioDefaultProps extends IRadioCommonProps {
  /** sm (20px) | md (28px) — Figma tamaño s / m. */
  size?: RadioSize
  /** Card with grey background (default) or control only. */
  withBackground?: boolean
  indicatorClassName?: string
}
