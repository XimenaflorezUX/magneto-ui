import { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar.component'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    userImage:
      'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'User avatar'
  }
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const FallbackIcon: Story = {
  name: 'Fallback — DS icon',
  args: {
    userImage: ''
  }
}

export const Interactive: Story = {
  args: {
    userImage: '',
    onClick: () => undefined
  }
}
