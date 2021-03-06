### 官方网站
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### npm网站
```
https://www.npmjs.com/
```

#### Sass
```
官方地址：https://doc.webpack-china.org/loaders/sass-loader/
```

#### 安装
```
npm install sass-loader node-sass webpack --save-dev

npm install style-loader css-loader --save-dev

node-sass 和 webpack 是 sass-loader 的 peerDependency，因此能够精确控制它们的版本。
```

#### 安装sass compass
```
npm install compass-mixins --save-dev
```

```
# 配置
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
}

```

#### 示例
通过将 style-loader 和 css-loader 与 sass-loader 链式调用，可以立刻将样式作用在 DOM 元素。
```javascript
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" //将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }]
    }
};
```

也可以通过指定 options 参数，向 node-sass 传递选项参数。例如：
```javascript
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }]
    }
};
```
Sass 的更多选项参见 node-sass。

#### 生产环境
```
通常，生产环境下比较推荐的做法是，使用 ExtractTextPlugin 将样式表抽离成专门的单独文件。这样，样式表将不再依赖于 JavaScript：
```
```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],

                // 在开发环境使用 style-loader
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};
```