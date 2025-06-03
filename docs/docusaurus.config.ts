import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'p5.asciify',
  tagline: 'Apply real-time ASCII conversion to your favorite WEBGL p5.js sketches instantly.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://p5.textmode.art',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'humanbydefinition', // Usually your GitHub org/user name.
  projectName: 'p5.asciify', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/lib/index.ts'],
        tsconfig: '../tsconfig.json',
        readme: 'none',
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: false,
        includeVersion: true,
        exclude: ['**/node_modules/**'],
        logLevel: 'Verbose',
        // Table formatting options
        indexFormat: 'table',
        parametersFormat: 'table',
        interfacePropertiesFormat: 'table',
        classPropertiesFormat: 'table',
        enumMembersFormat: 'table',
        propertyMembersFormat: 'table',
        typeDeclarationFormat: 'table',
        cleanOutputDir: true,
        skipErrorChecking: true,
        formatWithPrettier: true,
      },
    ],
    [
      "@dipakparmar/docusaurus-plugin-umami",
      /** @type {import('@dipakparmar/docusaurus-plugin-umami').Options} */
      ({
        websiteID: "17c7b414-d8ef-4054-9679-aee98a98c367",
        analyticsDomain: "analytics.textmode.art",
        dataDomains: "p5.textmode.art",
      }),
    ]
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/humanbydefinition/p5.asciify/edit/main/docs/',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',

    // SEO metadata
    metadata: [
      { name: 'keywords', content: 'p5.js, ascii, ascii art, textmode, textmode art, petscii, ansi, creative coding, webgl, javascript, open source, real-time conversion, generative, generative art, interactive art' },
      { name: 'description', content: 'p5.asciify is the most advanced ASCII conversion library available, powered by p5.js. Transform WEBGL canvases into dynamic ASCII art in real-time for interactive experiences and generative art.' },
      { name: 'author', content: 'humanbydefinition' },

      // Twitter Card metadata
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@textmode_art' },
      { name: 'twitter:creator', content: '@textmode_art' },
      { name: 'twitter:title', content: 'p5.asciify - Real-time ASCII conversion for p5.js' },
      { name: 'twitter:description', content: 'Transform your WEBGL p5.js sketches into dynamic ASCII art instantly with the most advanced open-source ASCII conversion library.' },

      // Open Graph metadata
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'p5.asciify - Real-time ASCII conversion for p5.js' },
      { property: 'og:description', content: 'Transform your WEBGL p5.js sketches into dynamic ASCII art instantly with the most advanced open-source ASCII conversion library.' },
      { property: 'og:url', content: 'https://p5.textmode.art' },
      { property: 'og:site_name', content: 'p5.asciify documentation' },
    ],

    headTags: [
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json',
        },
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'SoftwareLibrary',
          name: 'p5.asciify',
          author: {
            '@type': 'Person',
            name: 'humanbydefinition',
            url: 'https://github.com/humanbydefinition'
          },
          description: 'p5.asciify is the most advanced ASCII conversion library available, powered by p5.js. Transform WEBGL canvases into dynamic ASCII art in real-time for interactive experiences and generative art.',
          url: 'https://p5.textmode.art',
          downloadUrl: 'https://github.com/humanbydefinition/p5.asciify/releases',
          license: 'https://github.com/humanbydefinition/p5.asciify/blob/main/LICENSE',
          codeRepository: 'https://github.com/humanbydefinition/p5.asciify',
          programmingLanguage: 'TypeScript',
          runtimePlatform: 'Web Browser',
          targetProduct: {
            '@type': 'SoftwareLibrary',
            name: 'p5.js',
            url: 'https://p5js.org'
          },
          applicationCategory: 'DeveloperApplication',
          keywords: 'p5.js, ascii, ascii art, textmode, textmode art, petscii, ansi, creative coding, webgl, javascript, open source, real-time conversion, generative, generative art, interactive art',
        }),
      },
    ],

    docs: {
      sidebar: {
        hideable: true,
      },
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    algolia: {
      // The application ID provided by Algolia
      appId: '1MOHTBWX3U',

      // Public API key: it is safe to commit it
      apiKey: '6780498578935c810e7465a0e23480c7',

      indexName: 'p5-textmode',
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,
    },

    navbar: {
      title: 'p5.textmode.art',
      logo: {
        alt: 'p5.textmode.art logo',
        src: 'img/doc_logo.svg',
        width: 22,
        height: 22,
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'api/index',
          position: 'left',
          label: 'API',
        },
        {
          type: 'doc',
          docId: 'community/support',
          position: 'left',
          label: 'Community',
        },
        {
          type: 'doc',
          docId: 'donate/index',
          position: 'left',
          label: 'Donate',
        },
        {
          href: 'https://discord.gg/sjrw8QXNks',
          className: 'header-discord-link',
          'aria-label': 'Discord server',
          position: 'right',
        },
        {
          href: 'https://github.com/humanbydefinition/p5.asciify',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },

      ],
    },

    stylesheets: [
      // ...other stylesheets...
      {
        href: 'https://cdn.jsdelivr.net/npm/@codesandbox/sandpack-react/dist/index.css',
        type: 'text/css',
      },
    ],

    footer: {
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },
            {
              label: 'API',
              to: '/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/sjrw8QXNks',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/humanbydefinition/p5.asciify',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Donate',
              to: '/docs/donate/',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Imprint',
              to: '/docs/legal/imprint-en',
            },
            {
              label: 'Data Protection Policy',
              to: '/docs/legal/data-protection-policy-en',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://textmode.art" target="_blank" rel="noopener noreferrer">textmode.art</a>. Built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>. Created with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#25c2a0" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-heart" style="display: inline-block; vertical-align: text-bottom;"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" fill="none" stroke="#25c2a0"></path></svg> by <a href="https://github.com/humanbydefinition" target="_blank" rel="noopener noreferrer">humanbydefinition</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;