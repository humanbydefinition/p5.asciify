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
    ],
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
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/humanbydefinition/p5.asciify/edit/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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

    imageZoom: {
      // CSS selector to apply the plugin to, defaults to '.markdown img'
      selector: '.markdown img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        margin: 0,
        background: 'rgba(25, 25, 25, 0.8)',
        scrollOffset: 0,
      },
    },

    navbar: {
      title: 'p5.textmode.art',
      logo: {
        alt: 'p5.textmode.art logo',
        src: 'img/doc_logo.svg',
        width: 22, // specify desired width in pixels
        height: 22, // specify desired height in pixels
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
        { to: '/blog', label: 'Blog', position: 'left' },
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
              label: 'Blog',
              to: '/blog',
            },
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