### 官方网站
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### npm网站
```
https://www.npmjs.com/
```

#### ExtractTextWebpackPlugin
```
官方网站：https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
```

#### 安装
```
# 对于 webpack 2
npm install --save-dev extract-text-webpack-plugin
```
#### 用法
```
# 警告: 对于 webpack v1, 请看 分支为 webpack-1 的 README 文档。

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
}
```

```
它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。

优点 | 缺点
更少 style 标签 (旧版本的 IE 浏览器有限制) | 额外的 HTTP 请求
CSS SourceMap (使用 devtool: "source-map" 和 extract-text-webpack-plugin?sourceMap 配置) | 更长的编译时间
CSS 请求并行 | 没有运行时(runtime)的公共路径修改
CSS 单独缓存 | 没有热替换
更快的浏览器运行时(runtime) (更少代码和 DOM 操作) | ...
```

#### 选项
```
new ExtractTextPlugin(options: filename | object)
```
```
名称 | 类型 | 描述
id | {String} | 此插件实例的唯一 ident。（仅限高级用途，默认情况下自动生成）

filename | {String|Function} | 生成文件的文件名。可能包含 [name], [id] and [contenthash]

allChunks | {Boolean} | 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）| 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true 

disable | {Boolean} | 禁用插件

ignoreOrder | {Boolean} | 禁用顺序检查 (这对 CSS 模块很有用！)，默认 false
```
```
[name]：chunk 的名称
[id]：chunk 的数量
[contenthash]：根据提取文件的内容生成的 hash

警告: ExtractTextPlugin 对 每个入口 chunk 都生成一个对应的文件，所以当你配置多个入口 chunk 的时候，你必须使用 [name], [id] 或 [contenthash]
```

#### extract
```
ExtractTextPlugin.extract(options: loader | object)

从一个已存在的 loader 中，创建一个提取(extract) loader。支持的 loader 类型 { loader: [name]-loader -> {String}, options: {} -> {Object} }。

名称    类型    描述
options.use | {String}/{Array}/{Object} | loader 被用于将资源转换成一个 CSS 导出模块 (必填)

options.fallback | {String}/{Array}/{Object} | loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)

options.publicPath | {String} | 重写此 loader 的 publicPath 配置
```