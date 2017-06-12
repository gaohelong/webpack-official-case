### 官方网站
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### webpack.
```
webpack 是一个用来构建我们应用程序中的 JavaScript 模块的工具。在按照安装说明安装 webpack 后，我们可以从 CLI 或 API 来开始使用 webpack。 webpack 通过快速建立应用程序依赖图表并以正确的顺序打包它们来简化你的工作流。你能够针对你的代码来对 webpack 进行自定义的优化配置，比如为生产环境拆分 vendor/css/js 代码，通过运行「开发中 server(development server)」来实现无刷新热重载(hot-reload)等很多酷炫的特性。了解更多关于为什么使用 webpack。
```

### 项目创建.
#### 创建项目目录.
```
mkdir webpack-office-case && cd webpack-office-case
npm init -y
npm install --save-dev webpack
```

```
./node_modules/.bin/webpack --help # 显示有效的 CLI 命令列表
.\node_modules\.bin\webpack --help # windows 用户请使用此路径
webpack --help # 如果你在全局安装了 webpack
```

```
现在在 app 子目录下创建一个 index.js 文件。
```
```html
//app/index.js
function component () {
  var element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

```
要运行这段代码，在项目根目录下创建 index.html 文件。
```
```html
// index.html
<html>
  <head>
  <title>webpack 2 demo</title>
  <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
<body>
  <script src="app/index.js"></script>
</body>
</html>
```
```
在此示例中，<script> 标签之间存在隐式依赖关系。
运行 index.js 会依赖于页面中提前引入的 lodash。之所以说是隐式的是因为 index.js 并未显式声明需要引入 lodash，只是假定推测已经存在一个全局变量 _。
使用这种方式去管理 JavaScript 项目会有一些问题：
  1、如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
  2、如果依赖被引入但是并没有使用，那样就会存在许多浏览器不得不下载的无用代码。
```

```
要在 index.js 中打包 lodash 依赖，首先我们需要安装 lodash。
npm install --save lodash
```
```
然后 import 它。
```
```html
// app/index.js
import _ from 'lodash';
function component () {
  var element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

```
当然我们还要修改 index.html，来引入打包好的单个 js 文件。
```
```html
<html>
  <head>
    <title>webpack 2 demo</title>
    -  <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
  -  <script src="app/index.js"></script>
  +  <script src="dist/bundle.js"></script>
</body>
</html>
```

```
ndex.js 显式要求引入的 lodash 必须存在，然后将它以 _ 的别名绑定（不会造成全局范围变量名污染）。

通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图表，然后使用图表生成一个优化过的，会以正确代码顺序被运行的 bundle。并且没有用到的依赖将不会被 bundle 引入。

现在在此文件夹下带上以下参数运行 webpack，其中 index.js 是入口文件，bundle.js 是已打包所需的所有代码的输出文件。
```
```
./node_modules/.bin/webpack app/index.js dist/bundle.js
```

```
在浏览器中打开 index.html，查看构建成功后的 bundle 的结果。你应该能看到带有以下文本的页面：'Hello webpack'。
```

#### 在 webpack 中使用 ES2015 模块
```
你注意到在 app/index.js 中使用的 ES2015 模块的 import 了吗？尽管 import/export 语句在浏览器中还未被支持，你也可以正常的使用，因为 webpack 会将其替换为 ES5 兼容的代码。你可以检查 dist/bundle.js 的代码来说服自己放心使用。

注意，webpack 不会更改你的代码中除 import/export 以外的部分。如果你在使用其它 ES2015 特性，请确保你使用了一个像是 Babel 或 Bublé 的转译器。
```

#### 使用带有配置的 webpack
```
对于更复杂的配置，我们可以使用一个配置文件，webpack 会按照它来打包代码。创建一个 webpack.config.js 文件后，你可以使用如下的配置设置来表示上述 CLI 命令。
```
```html
// webpack.config.js
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

```
此文件可以像下面这样被 webpack 执行。
./node_modules/.bin/webpack --config webpack.config.js

注：如果存在 webpack.config.js，webpack 命令将默认选择使用它。
注：如果在上面“创建一个 bundle 文件”章节，已经成功创建过 dist/bundle.js 文件，可以删除 dist 子目录来验证通过 webpack.config.js 的设置所输出的内容是否符合预期。
```

```
通过配置文件可以最灵活地使用 webpack。我们可以通过向配置文件添加 loader 规则(loader rules)、插件(plugins)、解析选项(resolve options)以及许多其他增强功能，来进行打包。
```

#### 配合 npm 使用
```
考虑到用 CLI 这种方式来运行 webpack 不是特别方便，我们可以设置一个快捷方式。像这样调整 package.json：
```
```html
{
  ...
    "scripts": {
        "build": "webpack"
    },
  ...
}
```
```
现在你可以通过使用 npm run build 命令来实现与上面相同的效果。npm 通过命令选取脚本，并临时扩充执行环境，使脚本可以在运行时包含 bin 命令。你可以在很多项目中看到这种使用习惯。
注：你可以通过向 npm run build 命令添加两个中横线，给 webpack 传递自定义参数，例如：npm run build -- --colors。
```

#### 结论
```
 现在你已经一起学习了基本的构建过程，你可以深入 webpack 基本概念和配置来更好地理解其设计。也可以查看指南来学习如何处理常见问题。API 章节则是对底层的功能进行深入。
```









