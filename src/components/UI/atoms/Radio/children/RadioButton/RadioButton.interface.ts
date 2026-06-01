import type { IconFamily } from '@shared/icons'
import type { IconProps } from '@components/UI/atoms/Icon'
import { IRadioCommonProps } from '../../Radio.interface'

export interface IRadioButtonIconSlot {
  name: string
  family?: IconFamily
}

export interface IRadioButtonProps extends IRadioCommonProps {
  /** Leading icon — DS registry (`name`) or legacy `IconProps`. */
  prefixIcon?: IRadioButtonIconSlot | IconProps
  suffixIcon?: IRadioButtonIconSlot | IconProps
}
