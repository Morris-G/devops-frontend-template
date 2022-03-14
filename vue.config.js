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
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
    },
    devServer: {
        port: 8866,
        disableHostCheck: true
    }
}
