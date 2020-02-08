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
    title: 'Akara',
    description: 'Fooly Cooly',
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
                text: '悄悄话',
                link: '/gossip/'
            },
            {
                text: '关于我',
                link: '/about'
            },
            {
                text: 'Github',
                link: 'https://github.com/Messiahhh'
            }
        ],
        sidebar: {
            '/frontend/': [
                '',
            ],
            '/gossip/': [
                ...getSidebar('gossip')
            ]
        }
    }
}
