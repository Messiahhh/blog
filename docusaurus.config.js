// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Akara',
  tagline: 'Never Knows Best',
  url: 'https://messiahhh.github.io/',
  baseUrl: '/blog/', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'messiahhh', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  plugins: ['@docusaurus/theme-live-codeblock'],
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'no-referrer'
      }
    }
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true
        }
      },
      announcementBar: {
        id: 'support_us',
        content: '⭐️ 如果这个网站能帮助到你，欢迎给一个star支持作者  <a target="_blank" rel="noopener noreferrer" href="https://github.com/Messiahhh/blog">GitHub</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      }, 
      navbar: {
        title: 'Akara的博客',
        hideOnScroll: true,
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'HTML',
            position: 'right',
            label: '正文',
          },
          {to: 'blog/面经', label: '面经', position: 'right'},
          {
            href: 'https://github.com/messiahhh/blog',
            label: 'GitHub',
            position: 'right',
          },
        ],
      }, 
      prism: { 
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'javascript',
        additionalLanguages: ['rust'],
      }, 
      colorMode: {
        respectPrefersColorScheme: true
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'BWG0DEIDEP',
    
        // Public API key: it is safe to commit it
        apiKey: 'd3f9fff64e1510e7299229fb32996203',
    
        indexName: 'messiahhh',
      }
    }),
};

module.exports = config;
