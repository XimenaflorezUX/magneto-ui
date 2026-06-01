import { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge.component'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    number: { control: 'number' },
    pulse: { control: 'boolean' }
  },
  args: {
    number: 10,
    pulse: true
  }
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const WithoutNumber: Story = {
  args: {
    number: undefined
  }
}

export const NoPulse: Story = {
  args: {
    number: 5,
    pulse: false
  }
}
