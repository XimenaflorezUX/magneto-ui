import React from 'react'
import { classNames } from '@shared/utils/common'
import { Checkbox } from '@components/UI/atoms/Checkbox/Checkbox.component'
import { ISelect2ListCheck } from './SelectListCheck.interface'
import { Select } from '../../Select.component'
import { IOption, IValueSelect } from '../../Select.interface'
import styles from './SelectListCheck.module.scss'

const cx = classNames.bind(styles)

const defaultRenderItem = <T,>(option: IOption<T>) => <>{option.label}</>

const isSelected = <T,>(option: IOption<T>, value: IValueSelect<T>[]) =>
  value.findIndex(({ id }) => option.id === id) >= 0

const defaultFilter: ISelect2ListCheck<unknown>['filter'] = (option, searchValue) => {
  return option.label?.toLowerCase().includes(searchValue.toLowerCase()) ?? true
}

const Component = <T,>({ className, renderItem = defaultRenderItem, filter = defaultFilter }: ISelect2ListCheck<T>) => {
  const { options, value, onChange, search, open } = Select.useContext<T>()

  return (
    <ul data-name="select-list" className={cx('select-list', className, { 'select-list--visible': open })}>
      {options
        .filter((option) => filter(option, search, value))
        .map((option) => (
          <li className={cx('select-list__item')} key={option.id}>
            <Checkbox
              id={`select-list-checkbox-${String(option.id)}`}
              variant="box"
              display="block"
              className={cx('select-list__checkbox')}
              checked={isSelected(option, value)}
              onChange={(checked) => {
                if (checked) {
                  onChange([...value, option])
                } else {
                  onChange(value.filter((curr) => curr.id !== option.id))
                }
              }}
            >
              {renderItem(option)}
            </Checkbox>
          </li>
        ))}
    </ul>
  )
}

export const SelectListCheck = Component
