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

    /* webpack-dev-server */
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 8080
    },

    /* 外部扩展(防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。) */
    externals: {
        jquery: 'jQuery'
    },

    /* 插件配置 */
    plugins: [
        // source map(方便排查、定位javascript问题)
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }),

        // 生成html.
        new HtmlWebpackPlugin({
            title: 'webpack html plugin',
            template: './app/tpl/index.html'
        })
    ]
};
