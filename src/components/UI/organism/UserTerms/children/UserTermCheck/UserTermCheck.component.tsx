import React from 'react'
import { useElementId } from '@shared/utils/common'
import { IUserTerm } from '../../UserTerms.interface'
import styles from './UserTermCheck.module.scss'
import { classNames } from '@shared/utils/common'
import { Checkbox } from '@components/UI/atoms/Checkbox'

const cx = classNames.bind(styles)

const Component: React.FC<IUserTerm.Check> = ({ children, className, isChecked, onChange }) => {
  const checkboxId = useElementId('magneto-ui-user-term-check')

  return (
    <div className={cx('user-term-check', className)}>
      <Checkbox
        id={checkboxId}
        variant="box"
        display="block"
        className={cx('select-list__checkbox')}
        checked={isChecked}
        onChange={onChange}
      >
        {children}
      </Checkbox>
    </div>
  )
}
export const UserTermCheck = Component
