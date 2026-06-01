import { Meta, StoryObj } from '@storybook/react'
import { BarLoader } from './BarLoader.component'

const meta: Meta<typeof BarLoader> = {
  title: 'Atoms/Bar Loader',
  component: BarLoader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'color' }
  }
}

export default meta

type Story = StoryObj<typeof BarLoader>

export const Indeterminate: Story = {
  name: 'Indeterminate (loading)',
  args: {}
}

export const Determinate: Story = {
  args: {
    percent: 65
  }
}

export const Complete: Story = {
  args: {
    percent: 100
  }
}
