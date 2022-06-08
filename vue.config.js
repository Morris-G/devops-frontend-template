const path = require('path')

module.exports = {
    publicPath: '/devops/',
    productionSourceMap: false,
    pages: {
        devops: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config
            .plugin('html-devops')
            .tap(args => {
                args[0].timeStamp = +new Date()
                return args
            })

        config.module.rule('cw-svg')
            .test(/\.svg$/)
            .include
            .add(path.resolve(__dirname, 'src'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')

        config.module.rule('svg')
            .exclude
            .add(path.resolve(__dirname, 'src'))
            .end()
    },
    devServer: {
        port: 8866,
        disableHostCheck: true
    }
}
