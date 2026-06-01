import { withContext } from './withContext.decorator'

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: {
      order: [
        'Design System',
        ['Design System', ['Iconography']],
        'Atoms',
        'Molecules',
        ['Organism', 'organism'],
        'Template',
        'Pages',
        'Hooks'
      ]
    }
  }
}

export const decorators = [withContext]
