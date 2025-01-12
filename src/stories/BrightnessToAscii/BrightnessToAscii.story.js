import { createSketch } from './BrightnessToAsciiSketch';

export default {
  title: 'Tests/BrightnessToAscii',
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => createSketch(args)
};

export const BrightnessToAscii = {
  args: {
    enabled: true,
    characters: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    characterColor: "#ffffff",
    characterColorMode: 1,
    backgroundColor: "#000000",
    backgroundColorMode: 1,
    invertMode: false,
    fontSize: 32
  }
};