const fs = require('fs')
function getSidebar(dir) {
    const files = fs.readdirSync(`${__dirname}/../${dir}`)
    const sidebar = files.map(file => {
        let fileName = file.split('.')[0]
        if (fileName.toUpperCase() === 'README') {
            return ['', '写在开头']
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
    title: 'Akara的博客',
    description: 'Fooly Cooly',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    markdown: {
        extractHeaders: ['h2', 'h3', 'h4', 'h5']
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
                text: '前端博客',
                link: '/frontend/'
            },
            {
                text: '面经',
                link: '/mianshi/'
            },
            {
                text: '杂记',
                link: '/gossip/'
            },
            {
                text: '随笔',
                link: 'https://messiahhh.github.io/'
            },
            {
                text: '简历',
                link: 'https://messiahhh.github.io/resume/'
            }
        ],
        sidebar: {
            '/frontend/': [
                ['', 'HTML'],
                'css',
                'javascript',
                'node',
                'koa',
                'react',
                'vue',
                'react-vs-vue',
                'typescript',
                'browser',
                '前端工程化',
                '计算机网络',
                '前端安全',
                '网站优化',
                '错误监控',
                '设计模式',
                '数据结构',
                '排序',
                '编程题',
                '面试题',
                'git',
                'mysql',
                'mongodb',
                'linux',
                'websocket',
                'php',
                '其他'
            ],
            '/mianshi/': [
                '',
            ],
            '/gossip/': getSidebar('gossip')
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
