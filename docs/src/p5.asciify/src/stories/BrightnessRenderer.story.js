import { createSketch, DEFAULT_OPTIONS } from '../../examples/0_basic/sketch';


export default {
  title: 'Tests/BrightnessRenderer',
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) =>  createSketch({ ...args, container: document.createElement('div') }),
};

export const BrightnessRenderer = {
  args: DEFAULT_OPTIONS
};
