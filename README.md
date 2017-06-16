### 【官方网站】
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### 【nodejs】
```
English:  https://nodejs.org
Chinease: http://nodejs.cn/
```

### 【npm网站】
```
https://www.npmjs.com/
```

### 【file-loader】
```
官方网址：https://doc.webpack-china.org/loaders/file-loader/
```

#### 安装
```javascript
npm install --save-dev file-loader
```

### 【url-loader】
```
官方网址：https://doc.webpack-china.org/loaders/url-loader/
```

#### 安装
```javascript
npm install --save-dev url-loader
```

#### 用法
url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 data URL。

可以通过传递查询参数(query parameter)来指定限制（默认为不限制）。

如果文件大小超过限制（的 byte），将转为使用 file-loader，所有的查询参数也会透传过去。

```javascript
require("url-loader?limit=10000!./file.png");
// => 如果 "file.png" 大小低于 10kb 将返回 data URL

require("url-loader?mimetype=image/png!./file.png");
// => 指定文件的 mimetype（否则会用文件后缀推测）

require("url-loader?prefix=img/!./file.png");
// => file-loader 的参数也有效，如果被使用它们将被传递给 file-loader
```

### 【resolve-url-loader】
```
官方网址: https://www.npmjs.com/package/resolve-url-loader
github:   https://github.com/bholloway/resolve-url-loader
```

#### 安装
```
npm install --save resolve-url-loader --dev
```

### 【svg-url-loader】
```
官方网址：https://www.npmjs.com/package/svg-url-loader
```

#### 安装
```javascript
// npm install svg-inline-loader --save-dev
npm install resolve-url-loader --save-dev
```

### 【output.publicPath】
```
官方网址：https://doc.webpack-china.org/configuration/output/
```
```

```

### 【Public Path】
```
官方网址：https://doc.webpack-china.org/guides/public-path/#components/sidebar/sidebar.jsx
```
```
webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为公共路径(publicPath)。
```

#### 示例
这里提供一些示例，在实际应用中，这些示例的特性在实现的同时，还能保持高度整洁。

#### 在构建项目时设置路径值
在开发模式中，我们通常有一个assets/文件夹，它往往存放在和首页一个级别的目录下。这样是挺方便； 但是如果在生产环境下，你想把这些静态文件统一使用CDN加载，那该怎么办？

想要解决这个问题，你可以使用有着悠久历史的环境变量。比如说，我们设置了一个名为ASSET_PATH 的变量：

```javascript
import webpack from 'webpack';

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
    output: {
        publicPath: ASSET_PATH
    },
    plugins: [
        //该插件帮助我们安心地使用环境变量
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        })
    ]
};
```

#### 即时设定路径值
另一个可能出现的情况是，我们需要即时设置公共路径。webpack 提供一个全局变量供你设置，它名叫 __webpack_public_path__。所以在你的项目入口，你可以简单地设置如下：

```javascript
__webpack_public_path__ = process.env.ASSET_PATH;
```

一切设置完成。因为我们已经在我们的配置项中使用了DefinePlugin，process.env.ASSET_PATH 就已经被定义了，所以让我们能够安心地使用它了。

警告：请注意，如果您在入口文件中使用 ES6 模块导入，则在导入后对 __webpack_public_path__ 进行赋值。在这种情况下，您必须将公共路径(public path)赋值移至自己的专属模块，然后将其导入到您的 entry.js 之上：

```javascript
// entry.js
import './public-path';
import './app';
```

### 【解析(Resolve)】
```
官方网址：https://doc.webpack-china.org/configuration/resolve/#resolve-extensions
```
```

```

### 【process.env】
```
English:  https://nodejs.org/api/process.html#process_process_env
Chinease: http://nodejs.cn/api/process.html#process_process_env
```
```

```
