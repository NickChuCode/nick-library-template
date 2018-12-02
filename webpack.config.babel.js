const path = require('path')

const context = path.resolve(__dirname, 'src')

module.exports = {
    entry: './src/index',
    mode: "none",
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'starWarsNames',
        globalObject: "this" // 解决node环境下，require这个umd文件报错"window is not defined"的问题
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    context
                ],
                use: 'babel-loader'
            }
        ]
    }
}
