### 官方网站
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### npm网站
```
https://www.npmjs.com/
```

#### 开发
```
官方地址：https://doc.webpack-china.org/guides/development/#webpack-dev-server
```
```
在这一章节，我们将会解释如何开始开发并且如何从三种开发工具中进行选择。这里假设你已经有了一个 webpack 配置文件。

警告：永远不要在生产环境中使用这些工具，永远不要。
```

#### 调整你的文本编辑器
```
一些文本编辑器有“safe write”（安全写入）功能，并且默认启用。因此，保存文件后并不总是会导致 webpack 重新编译。

每个编辑器都有不同的方式来禁用这一功能，以下是一些最常见编辑器的设置：

    Sublime Text 3 - 在用户首选项（user preference）中增加 "atomic_save": false。

    IntelliJ - 在首选项（preferences）中使用搜索查找到 “safe write”并且禁用它。

    Vim - 在您的设置（settings）中增加 :set backupcopy=yes。

    WebStorm - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 Use "safe write"。
```

#### Source Maps
```
当 JavaScript 异常抛出时，你常会想知道这个错误发生在哪个文件的哪一行。然而因为 webpack 将文件输出为一个或多个 bundle，所以 追踪这一错误会很不方便。

Source maps 试图解决这一问题。它有很多不同的选项 - 每一个都有自己的优缺点。首先，我们使用这一个：
devtool: "cheap-eval-source-map"
```

#### 选择一个工具
```
webpack 可以在 watch mode(监视模式)下使用。在这种模式下，webpack 将监视您的文件，并在被更改时重新编译。 webpack-dev-server 提供了一个易于部署的开发服务器，具有快速的实时重载（live reloading）功能。如果你已经有一个开发服务器并且需要充分的灵活性，可以使用 webpack-dev-middleware 作为中间件。

webapck-dev-server 和 webpack-dev-middleware 使用内存编译，这意味着 bundle 不会被保存在硬盘上。这使得编译十分迅速，并使得你的文件系统带来更少的麻烦。

在大多数情况下你会想要使用 webpack-dev-server，因为这是最简单的开始的方式，并且提供了很多out-of-the-box（开箱即用）的功能。
```

#### webpack-dev-server
注：使用webpack-dev-server后nginx指向调整到dist目录下。

webpack-dev-server 为你提供了一个服务器和实时重载（live reloading） 功能。这很容易设置。

在开始前，确定你有一个 index.html 文件指向你的 bundle。假设 output.filename 是 bunlde.js。
```
<script src="/bundle.js"></script>
```

首先从 npm 安装 webpack-dev-server：
```
npm install --save-dev webpack-dev-server
```

安装完成之后，你应该可以使用 webpack-dev-server 了，方式如下：
```
webpack-dev-server --open
```

```
注：如果你的控制台说无法找到该命令，尝试运行 node_modules/.bin/webpack-dev-server。正常情况下你应该把该命令加在 package.json 中，例如："scripts": {"start": "webpack-dev-server"}。
```

```
上述命令应该自动在浏览器中打开 http://localhost:8080。

在你的文件中做一点更改并且保存。你应该可以在控制台中看到正在编译。编译完成之后，页面应该会刷新。如果控制台中什么都没发生，你可能需要调整下 watchOptions。

现在你有了实时重载功能，你甚至可以更进一步：Hot Module Replacement（热模块替换）。这是一个接口，使得你可以替换模块而不需要刷新页面。查看如何配置 HMR。

默认情况下 webpack 会使用inline mode（内联模式）。这种模式在你的 bundle 中注入客户端（用来 live reloading 和展示构建错误）。Inline 模式下，你会在你的 DevTools 控制台中看到构建错误。

webpack-dev-server 可以做很多事情，比如转发请求到你的后端服务器。更多配置项，请参阅 devServer documentation。
```
