import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { listCatalogIcons } from '@shared/icons'
import { Button } from './Button.component'
import type { ButtonVariant, ButtonSize } from './Button.interface'

const buttonVariants: ButtonVariant[] = ['blue', 'green', 'grey', 'danger', 'ghost', 'white', 'light-blue']
const buttonSizes: ButtonSize[] = ['xl', 'lg', 'md', 'sm']
const iconOptions = listCatalogIcons()

/** Storybook-only args — not part of the Button public API. */
type ButtonStoryArgs = React.ComponentProps<typeof Button> & {
  showLeadingIcon?: boolean
  leadingIconName?: string
  showTrailingIcon?: boolean
  trailingIconName?: string
}

const hiddenControl = { control: false, table: { disable: true } } as const

const renderButton = ({
  showLeadingIcon,
  leadingIconName,
  showTrailingIcon,
  trailingIconName,
  leadingIcon: _leadingIcon,
  trailingIcon: _trailingIcon,
  iconLeft: _iconLeft,
  iconRight: _iconRight,
  prefixIcon: _prefixIcon,
  suffixIcon: _suffixIcon,
  addHover: _addHover,
  buttonText: _buttonText,
  ...buttonProps
}: ButtonStoryArgs) => (
  <Button
    {...buttonProps}
    leadingIcon={
      showLeadingIcon && leadingIconName ? { name: leadingIconName } : undefined
    }
    trailingIcon={
      showTrailingIcon && trailingIconName ? { name: trailingIconName } : undefined
    }
  />
)

const meta: Meta<ButtonStoryArgs> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  render: renderButton,
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants
    },
    size: {
      control: 'select',
      options: buttonSizes
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Muestra icono izquierdo del registro DS (iconsax-outline).'
    },
    leadingIconName: {
      control: 'select',
      options: iconOptions,
      description: 'Nombre kebab-case del icono (catálogo Figma).',
      if: { arg: 'showLeadingIcon' }
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Muestra icono derecho del registro DS.'
    },
    trailingIconName: {
      control: 'select',
      options: iconOptions,
      description: 'Nombre kebab-case del icono (catálogo Figma).',
      if: { arg: 'showTrailingIcon' }
    },
    leadingIcon: hiddenControl,
    trailingIcon: hiddenControl,
    iconLeft: hiddenControl,
    iconRight: hiddenControl,
    prefixIcon: hiddenControl,
    suffixIcon: hiddenControl,
    addHover: hiddenControl,
    buttonText: hiddenControl
  },
  args: {
    variant: 'blue',
    size: 'md',
    disabled: false,
    fullWidth: false,
    children: 'Button',
    showLeadingIcon: false,
    leadingIconName: 'add',
    showTrailingIcon: false,
    trailingIconName: 'arrow-right'
  },
  parameters: {
    controls: {
      exclude: [
        'leadingIcon',
        'trailingIcon',
        'iconLeft',
        'iconRight',
        'prefixIcon',
        'suffixIcon',
        'addHover',
        'buttonText'
      ]
    }
  }
}

export default meta

type Story = StoryObj<ButtonStoryArgs>

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {}

// ─── Variants ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants — Medium',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '16px' }}>
      {(['blue', 'green', 'grey', 'danger', 'ghost', 'white', 'light-blue'] as ButtonVariant[]).map((v) => (
        <Button key={v} variant={v} size="md">
          {v}
        </Button>
      ))}
    </div>
  )
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes — Blue',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '16px' }}>
      {(['xl', 'lg', 'md', 'sm'] as ButtonSize[]).map((s) => (
        <Button key={s} variant="blue" size={s}>
          Size {s}
        </Button>
      ))}
    </div>
  )
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled state',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '16px' }}>
      {(['blue', 'green', 'grey', 'danger', 'ghost', 'light-blue'] as ButtonVariant[]).map((v) => (
        <Button key={v} variant={v} size="md" disabled>
          {v}
        </Button>
      ))}
    </div>
  )
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With icons (DS registry)',
  args: {
    showLeadingIcon: true,
    leadingIconName: 'add',
    showTrailingIcon: true,
    trailingIconName: 'check',
    children: 'Leading + trailing'
  }
}

export const WithIconsGallery: Story = {
  name: 'With icons — gallery',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '16px' }}>
      <Button variant="blue" size="md" leadingIcon={{ name: 'add' }}>
        Leading icon
      </Button>
      <Button variant="green" size="md" trailingIcon={{ name: 'check' }}>
        Trailing icon
      </Button>
      <Button
        variant="grey"
        size="md"
        leadingIcon={{ name: 'search-normal' }}
        trailingIcon={{ name: 'arrow-right' }}
      >
        Both icons
      </Button>
      <Button variant="blue" size="xl" leadingIcon={{ name: 'add' }}>
        XL + add
      </Button>
      <Button
        variant="danger"
        size="md"
        leadingIcon={{ name: 'add', family: 'iconsax-bold' }}
      >
        Bold family override
      </Button>
    </div>
  )
}

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    fullWidth: true,
    size: 'lg',
    showLeadingIcon: true,
    leadingIconName: 'add',
    children: 'Full width button'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '16px' }}>
        <Story />
      </div>
    )
  ]
}

// ─── Variant matrix ───────────────────────────────────────────────────────────

export const VariantMatrix: Story = {
  name: 'Variant × Size matrix',
  render: () => {
    const variants: ButtonVariant[] = ['blue', 'green', 'grey', 'danger', 'ghost', 'light-blue']
    const sizes: ButtonSize[] = ['xl', 'lg', 'md', 'sm']

    return (
      <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${sizes.length}, auto)`, gap: '8px', alignItems: 'center', padding: '16px' }}>
        <span style={{ fontSize: '12px', color: '#666' }} />
        {sizes.map((s) => (
          <span key={s} style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>{s}</span>
        ))}
        {variants.flatMap((v) => [
          <span key={`label-${v}`} style={{ fontSize: '12px', color: '#666' }}>{v}</span>,
          ...sizes.map((s) => (
            <Button key={`${v}-${s}`} variant={v} size={s}>
              {v}
            </Button>
          ))
        ])}
      </div>
    )
  }
}
