import { Icon } from './Icon.component'
import { Meta, StoryObj } from '@storybook/react'
import { iconCatalog } from '@shared/icons'
import { Youtube } from '@constants/icons.constants'

const meta: Meta<typeof Icon> = {
  title: 'Design System/Iconography',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Transversal icon library from Figma (libreria-Iconos). Default family: iconsax-outline. Use iconsax-bold, tabler, or lucide only when design specifies an override.'
      }
    }
  },
  argTypes: {
    family: {
      control: 'select',
      options: ['iconsax-outline', 'iconsax-bold', 'tabler', 'lucide'],
      description: 'Defaults to iconsax-outline. Other families only when design requires them.'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  },
  args: {
    name: 'search',
    size: 'md',
    hover: false
  }
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const OutlineFamily: Story = {
  name: 'iconsax-outline (default)',
  args: {
    name: 'add',
    family: 'iconsax-outline'
  }
}

export const BoldOverride: Story = {
  name: 'iconsax-bold (explicit override)',
  args: {
    name: 'home',
    family: 'iconsax-bold',
    size: 'lg'
  }
}

export const TablerOverride: Story = {
  name: 'tabler (explicit override)',
  args: {
    name: 'users',
    family: 'tabler',
    size: 'md'
  }
}

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Icon key={size} name="search" size={size} alt={`search ${size}`} decorative={false} />
      ))}
    </div>
  )
}

const CatalogGrid = ({ family, limit = 120 }: { family: keyof typeof iconCatalog; limit?: number }) => {
  const items = iconCatalog[family].slice(0, limit)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
        gap: 16
      }}
    >
      {items.map(({ name, hasAsset }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            opacity: hasAsset ? 1 : 0.45
          }}
          title={hasAsset ? 'SVG exportado' : 'Solo catálogo — ejecutar yarn sync:icons:export'}
        >
          <Icon name={name} family={family} size="md" />
          <span style={{ textAlign: 'center', wordBreak: 'break-all' }}>{name}</span>
        </div>
      ))}
    </div>
  )
}

export const CatalogOutline: Story = {
  name: 'Catálogo Figma · iconsax-outline',
  render: () => (
    <div>
      <p style={{ marginBottom: 12, fontSize: 13 }}>
        {iconCatalog['iconsax-outline'].length} iconos en Figma · muestra primeros 120
      </p>
      <CatalogGrid family="iconsax-outline" />
    </div>
  )
}

export const CatalogBold: Story = {
  name: 'Catálogo Figma · iconsax-bold',
  render: () => (
    <div>
      <p style={{ marginBottom: 12, fontSize: 13 }}>
        {iconCatalog['iconsax-bold'].length} iconos · usar family=&quot;iconsax-bold&quot; solo cuando diseño lo indique
      </p>
      <CatalogGrid family="iconsax-bold" limit={60} />
    </div>
  )
}

export const CatalogTablerLucide: Story = {
  name: 'Catálogo Figma · tabler + lucide',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h4>Tabler ({iconCatalog.tabler.length})</h4>
        <CatalogGrid family="tabler" limit={200} />
      </div>
      <div>
        <h4>Lucide ({iconCatalog.lucide.length})</h4>
        <CatalogGrid family="lucide" limit={200} />
      </div>
    </div>
  )
}

/** @deprecated Legacy URL-based API */
export const LegacyUrlIcon: Story = {
  render: () => <Icon icon={Youtube} size={20} hover />
}
