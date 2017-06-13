var path = require('path');

module.exports = { 
    /* entry */
    entry: './app/index.js',

    /* output */
    output: {
        filename: 'bundle.js',
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
    }
};
