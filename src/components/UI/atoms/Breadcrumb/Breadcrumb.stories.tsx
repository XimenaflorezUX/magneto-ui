import { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb.component'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    breadcrumbText: '/perfil/empleos/sugeridos',
    baseUrl: 'http://localhost:8008'
  }
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {}

export const StaticPath: Story = {
  args: {
    haveRedirect: false,
    breadcrumbText: 'perfil/empleos/sugeridos'
  }
}

export const ServerLinks: Story = {
  args: {
    haveRedirect: true,
    breadCrumbFromServer: ['Inicio', 'Empleos', 'Detalle'],
    urlFromServer: ['/', '/empleos', '/empleos/1']
  }
}

export const WithDetailTitle: Story = {
  args: {
    haveRedirect: true,
    breadCrumbFromServer: ['Inicio', 'Vacante'],
    urlFromServer: ['/', '/vacantes'],
    detailTitle: 'Desarrollador Frontend'
  }
}
