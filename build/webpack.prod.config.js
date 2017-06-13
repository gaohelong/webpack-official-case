var path = require('path');
var webpack = require('webpack');

module.exports = { 
    /* entry */
    entry: './app/index.js',

    /* output */
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    /* 外部扩展(防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。) */
    externals: {
        jquery: 'jQuery'
    },

    /* 插件配置 */
    plugins: [
        // js压缩.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
