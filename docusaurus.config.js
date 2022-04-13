/**
 * Copyright (c) Moodle Pty Ltd.
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
 */

require('dotenv').config();

const Versions = require('./versions.json');

const versionConfig = Object.fromEntries(Versions.map((version) => [version, {
    label: version,
    banner: 'none',
}]));
versionConfig.current = {
    label: 'master',
    banner: 'none',
};

// Share the remarkPlugins between all presets.
const remarkPlugins = [
    require('./src/remark/trackerLinks'),
    require('./src/remark/legacyDocLinks'),
    require('mdx-mermaid'),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Moodle',
    tagline: '(Un)official Developer Resources',
    // url: 'https://develop.moodle.org',
    url: process.env?.url || 'https://andrewnicols.github.io',
    baseUrl: process.env?.baseUrl || '/dinodevdocs/',
    trailingSlash: false,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'moodle', // Usually your GitHub org/user name.
    projectName: 'devdocs', // Usually your repo name.
    i18n: {
        locales: [
            'en-AU',
        ],
        defaultLocale: 'en-AU',
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars/docs.js'),
                    editUrl: 'https://github.com/andrewnicols/dinodevdocs/edit/main/',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    remarkPlugins,
                    lastVersion: 'current',
                    versions: versionConfig,
                    /*
                    versions: {
                        current: {
                            label: 'master',
                            banner: 'none',
                        },
                        "4.0": {
                            banner: 'none',
                        },
                    },
                    */
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    themeConfig: ({
        navbar: require('./config/navbar.js'),

        // Customisation for the left sidebar:
        autoCollapseSidebarCategories: true,
        hideableSidebar: true,

        footer: require('./config/footer.js'),
        prism: require('./config/prism.js'),
        imageZoom: require('./config/imageZoom.js'),
    }),
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    plugins: [
        [require.resolve('@cmfcmf/docusaurus-search-local'), {
            indexBlog: false,
        }],
        'plugin-image-zoom',
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'general',
                path: 'general',
                routeBasePath: 'general',
                sidebarPath: require.resolve('./sidebars/general.js'),
                editUrl: 'https://github.com/andrewnicols/dinodevdocs/edit/main/',
                showLastUpdateAuthor: true,
                showLastUpdateTime: true,
                remarkPlugins,
                editCurrentVersion: true,
            },
        ],

        [
            '@docusaurus/plugin-pwa',
            {
                debug: true,
                offlineModeActivationStrategies: [
                    'appInstalled',
                    'standalone',
                    'queryString',
                ],
                pwaHead: [
                    {
                        tagName: 'link',
                        rel: 'icon',
                        href: '/img/icons/orange_m.svg',
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: '/manifest.json',
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: 'rgb(208, 99, 0)',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#000',
                    },
                    {
                        tagName: 'link',
                        rel: 'apple-touch-icon',
                        href: '/img/icons/maskable_icon.png',
                    },
                    {
                        tagName: 'link',
                        rel: 'mask-icon',
                        href: '/img/icons/maskable_icon.png',
                        color: 'rgb(208, 99, 0)',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileImage',
                        content: '/img/icons/maskable_icon.png',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileColor',
                        content: '#000',
                    },
                ],
            },
        ],
    ],
};

module.exports = config;
