var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = { 
    /* entry */
    entry: './app/index.js',

    /* output */
    output: {
        // filename: 'bundle.js',
        filename: '[name].[chunkhash].js',
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
        }),

        // 生成html.
        new HtmlWebpackPlugin({
            title: 'webpack html plugin',
            template: './app/tpl/index.html'
        })
    ]
};
