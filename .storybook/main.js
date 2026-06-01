const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/** Relative assets for GitHub Pages subpath — avoids /magneto-ui/magneto-ui/ double prefix. */
const applyGitHubPagesPublicPath = (config) => {
  if (process.env.STORYBOOK_PAGES === 'true') {
    config.output = { ...config.output, publicPath: './' }
  }
  return config
}

const applyPreviewWebpack = (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@constants': path.resolve(__dirname, '../src/constants'),
    '@shared': path.resolve(__dirname, '../src/shared'),
    '@utils': path.resolve(__dirname, '../src/utils')
  }

  config.resolve.plugins = [
    ...(config.resolve.plugins || []),
    new TsconfigPathsPlugin({
      extensions: config.resolve.extensions
    })
  ]

  return applyGitHubPagesPublicPath(config)
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
    'storybook-css-modules',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  babel: async (options) => ({
    ...options,
    plugins: []
  }),
  features: {
    previewMdx2: true,
    babelModeV7: true
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  },
  webpackFinal: async (config) => applyPreviewWebpack(config),
  managerWebpack: async (config) => applyGitHubPagesPublicPath(config)
}
