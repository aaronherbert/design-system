import type { Preview } from '@storybook/react-vite';
import '../src/styles/fonts.css';
import '../src/styles/index.css';
import { ThemeProvider } from '../src/components/ThemeProvider';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'fullscreen',
    // Chromatic snapshots every story once per theme, so the visual review covers dark and light.
    chromatic: {
      modes: {
        dark: { theme: 'dark' },
        light: { theme: 'light' },
      },
    },
    controls: { matchers: { color: /(background|color)$/i } },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Form controls', 'Layout', 'Examples'] },
    },
  },
  decorators: [
    (Story, ctx) => (
      // Stories set `fullBleed: true` to render edge to edge (page-level examples).
      <ThemeProvider theme={ctx.globals.theme ?? 'dark'} style={{ padding: ctx.parameters.fullBleed ? 0 : '1.5rem', minHeight: ctx.viewMode === 'story' ? '100vh' : undefined }}>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
