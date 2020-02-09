const fs = require('fs')
function getSidebar(dir) {
    const files = fs.readdirSync(`${__dirname}/../${dir}`)
    const sidebar = files.map(file => {
        let fileName = file.split('.')[0]
        if (fileName.toUpperCase() === 'README') {
            return ''
        }
        else {
            return fileName
        }
    })
    return sidebar
}


module.exports = {
    base: '/blog/',
    logo: '/assets/img/logo.jpg',
    title: 'Akara的小站',
    description: 'Fooly Cooly',
    markdown: {
        extractHeaders: [ 'h2', 'h3', 'h4', 'h5' ]
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/nprogress'
    ],
    themeConfig: {
        nav: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: '博客',
                link: '/frontend/'
            },
            {
                text: '杂文',
                link: '/gossip/'
            },
            {
                text: '关于我',
                link: '/about'
            },
            {
                text: '简历',
                link: 'https://messiahhh.github.io/resume/'
            }
        ],
        sidebar: {
            '/frontend/': [
                '',
            ],
            '/gossip/': [
                ...getSidebar('gossip')
            ]
        },
        lastUpdated: '上次更新时间',
        // 一些github的配置
        repo: 'messiahhh/blog',
        repoLabel: 'Github',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page'
    }
}
