/* require */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

/* 将css提取成单独文件 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "assets/css/[name].[contenthash].css", // 输出到assets/css/目录下.
    // disable: process.env.NODE_ENV === "development" // true: 禁用，这是css在当前页面的<style></style>中. 如果为false: 启用，则单独生成css文件. 默认为false.
});

module.exports = function(env) {
    // publicPath
    var publicPath = (env == 'dev') ? 'http://hl.webpack-office-case.com/' : 'http://localhost:8080/';

    /* return */
    return {
        /* entry */
        entry: {
            main: ['./src/main.js'],
            news: ['./src/modules/news/news.js'],
        },

        /* 输出 */
        output: {
            // filename: 'bundle.js',
            filename: 'assets/js/[name].[chunkhash].js', // 输出到assets/js/目录下
            path: path.resolve(__dirname, '../dist'), // 输出路径

            /* 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项 */
            /* 如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。 */
            publicPath: publicPath // 一般都设置一个url否则去掉这项.
        },

        /* webpack-dev-server */
        devServer: {
            contentBase: path.join(__dirname, "../dist"),
            compress: true,
            port: 8080
        },

        /* 设置模块如何解析 */
        resolve:  {
            /* 自动解析确定的扩展。默认值为：extensions: [".js", ".json"] */
            extensions: [".js", ".json", ".scss"] // 在js中不用写前面所列出的文件后缀, 例如：1.scss就可以去掉.scss了.
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
                            {loader: "css-loader?sourceMap"},
                            // {loader: "resolve-url-loader"}, // 放在此处是转换css中的路径为绝对路径.
                            // {loader: "sass-loader"}
                            {loader: "sass-loader?sourceMap&includePaths[]=" + path.resolve(__dirname, "../node_modules/compass-mixins/lib")}
                        ],
                        // 在开发环境使用 style-loader
                        fallback: "style-loader"
                    })
                },

                // svg.
                {
                    test: /\.svg$/,
                    use: [
                        /* 小于10240byte(10kb)时返回data url否则返回url, 返回data url时不会生成对应的文件. */
                        // {loader: 'svg-url-loader?limit=10240&name=assets/images/[hash].[name].[ext]'}
                        {loader: 'svg-url-loader?limit=1&name=assets/images/[hash].[name].[ext]'}
                    ]
                },

                // file-loader(将项目目录下assets/images/的目录结构及文件拷贝到输出目录下)
                {
                    test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,

                    /* 不设置publicPath时默认使用output中的publicPath */
                    // use:  "file-loader?name=[hash].[name].[ext]&publicPath=assets/images/&outputPath=assets/images/"
                    // use:  "file-loader?name=[hash].[name].[ext]&publicPath=http://hl.webpack-office-case.com/&outputPath=assets/images/"
                    use:  "file-loader?name=[hash].[name].[ext]&outputPath=assets/images/"
                },
            ]
        },

        /* 插件配置 */
        plugins: [
            // source map(方便排查、定位javascript问题)
            new webpack.SourceMapDevToolPlugin({
                filename: 'map/[name].js.map', // 输出到map目录下
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
                filename: 'page/news.html', // 输出到page目录下
                template: './src/views/news/index.html',
                // chunks: ['news'], // 只引入news
                excludeChunks: ['main'],

                /* inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中 */
                /* 如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。*/
                inject: true
            })
        ]
    }
};
