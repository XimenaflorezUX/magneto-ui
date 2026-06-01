import { IRadioButtonProps } from './children/RadioButton'
import { IRadioDefaultProps } from './children/RadioDefault'

export enum ERadioType {
  radio = 'radio',
  button = 'button'
}

export type RadioSize = 'sm' | 'md'

export type ComponentProps<T extends keyof typeof ERadioType> = T extends 'radio'
  ? IRadioProps & IRadioDefaultProps
  : T extends 'button'
    ? IRadioProps & IRadioButtonProps
    : IRadioDefaultProps

export interface IRadioCommonProps {
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  className?: string
  childrenClassName?: string
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  size?: RadioSize
}

export interface IRadioProps extends IRadioCommonProps {
  type?: ERadioType | keyof typeof ERadioType
}
