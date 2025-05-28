---
sidebar_position: 2
title: Playgrounds
description: Test p5.asciify in your browser without installation. Access interactive playgrounds on p5.js Web Editor, OpenProcessing, CodeSandbox, and StackBlitz to experiment with ASCII art features and share sketches.
keywords: [p5.asciify playground, p5.js web editor p5.asciify, OpenProcessing ASCII art, CodeSandbox p5.asciify, StackBlitz p5.asciify, online ASCII editor, p5.asciify examples, browser ASCII testing, p5.asciify demo, interactive ASCII playground]
---
import PlaygroundGrid from '@site/src/components/PlaygroundGrid/PlaygroundGrid';


Playgrounds allow you to run `p5.js` sketches using `p5.asciify` in your browser, without installing anything!

They are mostly useful for:
- Testing `p5.asciify` and its features
- Sharing your sketches with others
- Reporting bugs or issues

Choose one of the available options below to get started:

<PlaygroundGrid 
  cards={[
    {
      image: '/img/p5_web_editor.png',
      title: 'p5.js Web Editor',
      description: 'The official p5.js web editor. Create and share your sketches online.',
      buttons: [
        { 
          label: 'Open playground', 
          url: 'https://editor.p5js.org/humanbydefinition/sketches/LyjURtFvm'
        }
      ]
    },
    {
      image: '/img/openProcessing_screenshot.png',
      title: 'OpenProcessing',
      description: 'A platform for sharing and discovering creative coding projects, including p5.js sketches.',
      buttons: [
        { 
          label: 'Open playground', 
          url: 'https://openprocessing.org/sketch/2635694' 
        },
        { 
          label: 'Explore examples', 
          url: 'https://openprocessing.org/curation/89166' 
        },
        { 
          label: 'Explore curation', 
          url: 'https://openprocessing.org/curation/89429' 
        }
      ]
    },
    {
      image: '/img/codesandbox_screenshot.png',
      title: 'CodeSandbox',
      description: 'CodeSandbox is an online code editor and development environment that allows developers to create, share and collaborate on web development projects in a browser-based environment.',
      buttons: [
        { 
          label: 'Open playground', 
          url: 'https://codesandbox.io/p/sandbox/frosty-cohen-dlz6cv' 
        }
      ]
    },
        {
      image: '/img/stackblitz_screenshot.png',
      title: 'StackBlitz',
      description: 'StackBlitz is an online IDE and development environment that enables developers to create, prototype and share web applications directly in the browser. It offers instant setup, live collaboration features, and seamless GitHub integration with zero configuration required.',
      buttons: [
        { 
          label: 'Open playground', 
          url: 'https://stackblitz.com/edit/stackblitz-starters-77exu2qi' 
        }
      ]
    }
  ]}
/>