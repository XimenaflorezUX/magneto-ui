import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio.component'

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['radio', 'button'] },
    size: { control: 'select', options: ['sm', 'md'] }
  },
  args: {
    id: 'radio-demo',
    children: 'Lorem ipsum',
    size: 'md',
    type: 'radio'
  }
}

export default meta

type Story = StoryObj<typeof Radio>

export const Default: Story = {}

export const Selected: Story = {
  args: { checked: true, defaultChecked: true }
}

export const Disabled: Story = {
  args: { disabled: true, checked: true }
}

export const SizeSmall: Story = {
  args: { size: 'sm' }
}

export const ControlOnly: Story = {
  name: 'Without background card',
  render: () => (
    <Radio id="r-inline" withBackground={false}>
      Inline radio
    </Radio>
  )
}

export const ChipVariant: Story = {
  name: 'Chip variant (legacy type=button)',
  args: { type: 'button' }
}

export const AllStates: Story = {
  name: 'All states — md',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
      <Radio id="r1" name="group" defaultChecked>
        Selected
      </Radio>
      <Radio id="r2" name="group">
        Default
      </Radio>
      <Radio id="r3" name="group" disabled>
        Disabled
      </Radio>
    </div>
  )
}
