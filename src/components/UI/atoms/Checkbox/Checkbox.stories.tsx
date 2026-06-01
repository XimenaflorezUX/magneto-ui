import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox.component'
import { withControlField } from '../../../../shared/utils/storybook/withControlField.hoc'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/udlNA8xVfPrSEmTtlQcbW2/Style-guideline-Magneto?node-id=1485-7828'
    }
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    variant: {
      control: 'select',
      options: ['box', 'background'],
      description: 'Figma check+text usa `background` (tarjeta grey-100).'
    },
    display: { control: 'select', options: ['inline', 'block'] },
    checked: { control: 'boolean', description: 'Figma `estado=select`' },
    indeterminate: { control: 'boolean', description: 'Figma `estado=three state`' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    type: { table: { disable: true } }
  },
  args: {
    id: 'checkbox-demo',
    children: 'Lorem ipsum',
    size: 'md',
    variant: 'background'
  }
}

export default meta

type Story = StoryObj<typeof Checkbox>

const CheckboxControlled = withControlField(Checkbox)

/** Playground — usa Controls para size, variant, checked, indeterminate y disabled. */
export const Default: Story = {
  render: (props) => <CheckboxControlled {...props} valueNameProp="checked" />
}

/** Figma matrix — tamaño m (full width items). */
export const AllStatesMd: Story = {
  name: 'All states — md',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 265 }}>
      <Checkbox id="cb-m1" variant="background" size="md" display="block">
        Default
      </Checkbox>
      <Checkbox id="cb-m2" variant="background" size="md" display="block" checked>
        Selected
      </Checkbox>
      <Checkbox id="cb-m3" variant="background" size="md" display="block" indeterminate>
        Three state
      </Checkbox>
      <Checkbox id="cb-m4" variant="background" size="md" display="block" disabled>
        Disabled (unchecked)
      </Checkbox>
    </div>
  )
}

/** Figma matrix — tamaño s (hug contents). */
export const AllStatesSm: Story = {
  name: 'All states — sm',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Checkbox id="cb-s1" variant="background" size="sm">
        Default
      </Checkbox>
      <Checkbox id="cb-s2" variant="background" size="sm" checked>
        Selected
      </Checkbox>
      <Checkbox id="cb-s3" variant="background" size="sm" indeterminate>
        Three state
      </Checkbox>
      <Checkbox id="cb-s4" variant="background" size="sm" disabled>
        Disabled (unchecked)
      </Checkbox>
    </div>
  )
}
