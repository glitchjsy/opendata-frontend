// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import("@docusaurus/types").Config} */
const config = {
    title: "Jersey Open Data",
    tagline: "Jersey open data, made easy.",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://opendata.je",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often "/<projectName>/"
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren"t using GitHub pages, you don"t need these.
    organizationName: "glitchjsy", // Usually your GitHub org/user name.
    projectName: "opendata-frontend", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don"t use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    presets: [
        [
            "classic",
            /** @type {import("@docusaurus/preset-classic").Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/glitchjsy/opendata-frontend/tree/master/"
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                },
                gtag: {
                    trackingID: "G-WT81BC84V7"
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
        ({
            image: "img/social-card.png",
            navbar: {
                title: "Open Data",
                logo: {
                    alt: "Logo",
                    src: "img/logo.png"
                },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "mainSidebar",
                        position: "left",
                        label: "Documentation"
                    },
                    {
                        href: "/map",
                        position: "left",
                        label: "Map"
                    },
                    {
                        href: "/charts",
                        position: "left",
                        label: "Charts"
                    },
                    {
                        type: "dropdown",
                        label: "Tools",
                        items: [
                            {
                                href: "/tools/foi-search",
                                label: "FOI Seach"
                            },
                            {
                                href: "/tools/vehicle-search",
                                label: "Vehicle Search"
                            },
                            {
                                href: "/tools/courts-search",
                                label: "Magistrates Court Search"
                            }
                        ]
                    },
                    {
                        href: "/about",
                        position: "left",
                        label: "About"
                    },
                    {
                        href: "/account",
                        position: "right",
                        id: "account-navbar-item",
                        label: "Account"
                    }
                ]
            },
            footer: {
                style: "dark",
                copyright: `Copyright © ${new Date().getFullYear()} Luke Wyatt`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
};

module.exports = config;
