import type { StorybookConfig } from '@storybook/react-vite';

// Plugins that only matter for the library build (vite.config.ts), not for Storybook.
const libraryOnlyPlugins = ['unplugin-dts', 'copy-fonts-css'];

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { defaultName: 'Docs' },
  viteFinal: (config) => ({
    ...config,
    plugins: config.plugins
      ?.flat()
      .filter((p) => !(p && typeof p === 'object' && 'name' in p && libraryOnlyPlugins.includes(p.name))),
  }),
};

export default config;
