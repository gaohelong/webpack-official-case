var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

// 将css提取成单独文件.
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    // disable: process.env.NODE_ENV === "development" // true: 禁用，这是css在当前页面的<style></style>中. 如果为false: 启用，则单独生成css文件. 默认为false.
});

module.exports = { 
    /* entry */
    entry: {
        main: ['./src/main.js'],
        news: ['./src/modules/news/news.js'],
    },

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

    /* loader */
    module: {
        rules: [
            // sass.
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {loader: "css-loader"}, 
                        // {loader: "sass-loader"}
                        {loader: "sass-loader?includePaths[]=" + path.resolve(__dirname, "../node_modules/compass-mixins/lib")}
                    ],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
        ]
    },

    /* 插件配置 */
    plugins: [
        // source map(方便排查、定位javascript问题)
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js'] // 排除vendor.js
        }),

        // 提取成单独的css文件.
        extractSass,

        // 生成html.
        new HtmlWebpackPlugin({
            title: 'webpack html plugin',
            template: './src/views/index/index.html',

            /* chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。*/
            /* chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。*/

            // chunks: ['main'], // 只引入main
            /* 跟 chunks 是相反的，排除掉某些 js 文件 */
            excludeChunks: ['news']
        }),
        new HtmlWebpackPlugin({
            title: 'news',
            filename: 'news.html',
            template: './src/views/news/index.html',
            // chunks: ['news'], // 只引入news
            excludeChunks: ['main']
        })
    ]
};
