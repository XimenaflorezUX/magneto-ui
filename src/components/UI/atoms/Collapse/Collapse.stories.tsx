import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { renderIconSlot } from '@shared/icons'
import { classNames } from '@shared/utils/common'
import { Typography } from '../Typography'
import { Collapse } from './Collapse.component'
import collapseStyles from './Collapse.module.scss'

const cx = classNames.bind(collapseStyles)

const collapseIconClass = 'magneto-ui-collapse-toggler__icon magneto-ui-icon-glyph'

const meta: Meta<typeof Collapse> = {
  title: 'Atoms/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  render: (args) => (
    <Collapse {...args} panelVariant="dark" defaultOpen onChangeOpen={(open) => console.log(open)}>
      <Collapse.Header style={{ justifyContent: 'space-between' }}>
        <Typography.Text color="grey-50">Header</Typography.Text>
        <Collapse.Toggler>
          {renderIconSlot({
            slot: { name: 'arrow-down' },
            size: 'sm',
            glyphClassName: collapseIconClass
          })}
        </Collapse.Toggler>
      </Collapse.Header>
      <Collapse.Body>
        <div className={cx('magneto-ui-collapse__body-padding')}>
          <Typography.Text color="grey-50">Body content</Typography.Text>
        </div>
      </Collapse.Body>
    </Collapse>
  )
}

export default meta

type Story = StoryObj<typeof Collapse>

export const Default: Story = {}

export const Closed: Story = {
  render: (args) => (
    <Collapse {...args} panelVariant="dark" defaultOpen={false}>
      <Collapse.Header style={{ justifyContent: 'space-between' }}>
        <Typography.Text color="grey-50">Collapsed</Typography.Text>
        <Collapse.Toggler>
          {renderIconSlot({
            slot: { name: 'arrow-down' },
            size: 'sm',
            glyphClassName: collapseIconClass
          })}
        </Collapse.Toggler>
      </Collapse.Header>
      <Collapse.Body>
        <div className={cx('magneto-ui-collapse__body-padding')}>
          <Typography.Text color="grey-50">Hidden until expanded</Typography.Text>
        </div>
      </Collapse.Body>
    </Collapse>
  )
}
