---
sidebar_position: 2
title: Playgrounds
---

import PlaygroundGrid from '@site/src/components/PlaygroundGrid/PlaygroundGrid';


Playgrounds allow you to run `p5.js` sketches using `p5.asciify` in your browser, without installing anything!

They are mostly useful for:
- Testing `p5.asciify` and its features
- Sharing your sketches with others
- Reporting bugs or issues

Choose one of the available options below to get started: (work in progress)

<PlaygroundGrid 
  cards={[
    {
      image: '/img/p5_web_editor.png',
      title: 'p5.js Web Editor',
      description: 'The official p5.js web editor. Create and share your sketches online.',
      buttons: [
        { 
          label: 'Open Playground', 
          url: 'https://editor.p5js.org/'
        },
        { 
          label: 'Explore Examples', 
          url: 'https://editor.p5js.org/examples/'
        }
      ]
    },
    {
      image: '/img/openProcessing_screenshot.png',
      title: 'OpenProcessing',
      description: 'A platform for sharing and discovering creative coding projects, including p5.js sketches.',
      buttons: [
        { 
          label: 'Open Playground', 
          url: 'https://openprocessing.org/' 
        }
      ]
    },
    {
      image: '/img/codesandbox_screenshot.png',
      title: 'CodeSandbox',
      description: 'CodeSandbox is an online code editor and development environment that allows developers to create, share and collaborate on web development projects in a browser-based environment.',
      buttons: [
        { 
          label: 'Open Playground', 
          url: 'https://codesandbox.io/s/new' 
        }
      ]
    },
        {
      image: '/img/stackblitz_screenshot.png',
      title: 'StackBlitz',
      description: 'StackBlitz is an online IDE and development environment that enables developers to create, prototype and share web applications directly in the browser. It offers instant setup, live collaboration features, and seamless GitHub integration with zero configuration required.',
      buttons: [
        { 
          label: 'Open Playground', 
          url: 'https://stackblitz.com/fork/react' 
        }
      ]
    }
  ]}
/>