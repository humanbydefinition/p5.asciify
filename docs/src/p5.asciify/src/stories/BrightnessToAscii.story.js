// BrightnessToAscii.story.js
import { createSketch, DEFAULT_OPTIONS } from '../../examples/brightness_to_ascii/sketch';

export default {
  title: 'Tests/BrightnessToAscii',
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => createSketch({ ...args, container: document.createElement('div') }),
};

export const BrightnessToAscii = {
  args: DEFAULT_OPTIONS
};
