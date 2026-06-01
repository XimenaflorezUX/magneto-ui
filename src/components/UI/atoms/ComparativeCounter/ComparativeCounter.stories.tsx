import { Meta, StoryObj } from '@storybook/react'
import { ComparativeCounter } from './ComparativeCounter.component'

const meta: Meta<typeof ComparativeCounter> = {
  title: 'Atoms/Comparative Counter',
  component: ComparativeCounter,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    current: { control: 'number' },
    max: { control: 'number' }
  },
  args: {
    max: 125,
    current: 10,
    position: 'center'
  }
}

export default meta

type Story = StoryObj<typeof ComparativeCounter>

export const Default: Story = {}

export const OverMax: Story = {
  args: {
    current: 150,
    max: 125
  }
}
