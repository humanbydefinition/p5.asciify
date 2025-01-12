import { createSketch } from './BrightnessRendererSketch';

export default {
  title: 'Tests/BrightnessRenderer',
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => createSketch(args)
};

export const BrightnessRenderer = {
  args: {
    enabled: true,
    characters: " .:-=+*#%@",
    characterColor: "#ffffff",
    characterColorMode: 0,
    backgroundColor: "#000000",
    backgroundColorMode: 1,
    invertMode: true,
    fontSize: 16,
    rotationAngle: 0
  }
};