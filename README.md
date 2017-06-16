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
#### 用法
默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。

```javascript
var url = require("file-loader!./file.png");
// => 输出 file.png 文件到输出目录并返回public url
// => 即返回 "/public-path/0dcbbaa701328a3c262cfd45869e351f.png"
```

默认情况下，文件会被输出，不过如果需要的话，也可以不输出（比如使用了服务端的 packages）。

```javascript
var url = require("file-loader?emitFile=false!./file.png");
// => 返回public url 但是不输出文件
// => 即返回 "/public-path/0dcbbaa701328a3c262cfd45869e351f.png"
```
#### 文件名模板
你可以使用查询参数 name 为你的文件配置自定义的文件名模板。例如，从你的 context 目录复制文件到输出目录，并且保留完整的目录结构，你可以使用 ?name=[path][name].[ext] 。

默认情况下，会按照你指定的路径和文件名输出文件，且使用相同的 URL 路径来访问文件。

你可以使用 outputPath, publicPath 和 publicPath 查询名称参数，来指定自定义的输出路径和发布目录。

```javascript
use: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/"
```

useRelativePath should be true if you wish to generate relative URL to the each file context(生成相对路径)
```javascript
{
    loader: 'file-loader',
    query: {
        useRelativePath: process.env.NODE_ENV === "production"
    }
}
```

#### 文件名模板占位符
  [ext] 资源扩展名
  [name] 资源的基本名称
  [path] 资源相对于 context 查询参数或者配置的路径
  [hash] 内容的哈希值，默认为十六进制编码的 md5
  [<hashType>:hash:<digestType>:<length>] 可选配置
    1) 其他的 hashType, 即 sha1, md5, sha256, sha512
    2) 其他的 digestType, 即 hex, base26, base32, base36, base49, base52, base58, base62, base64
    3) length 字符的长度
  [N] 当前文件名按照查询参数 regExp 匹配后获得到第 N 个匹配结果

#### 示例
```javascript
require("file-loader?name=js/[hash].script.[ext]!./javascript.js");
// => js/0dcbbaa701328a3c262cfd45869e351f.script.js

require("file-loader?name=html-[hash:6].html!./page.html");
// => html-109fa8.html

require("file-loader?name=[hash]!./flash.txt");
// => c31e9820c001c9c4a86bce33ce43b679

require("file-loader?name=[sha512:hash:base64:7].[ext]!./image.png");
// => gdyb21L.png
// 使用 sha512 哈希值替代 md5 并且使用 7 个字符 的 base64

require("file-loader?name=img-[sha512:hash:base64:7].[ext]!./image.jpg");
// => img-VqzT5ZC.jpg
// 使用自定义名称，sha512 哈希值替代 md5 并且使用 base64 的 7 个字符

require("file-loader?name=picture.png!./myself.png");
// => picture.png

require("file-loader?name=[path][name].[ext]?[hash]!./dir/file.png")
// => dir/file.png?e43b20c069c4a01867c31e98cbce33c9
```

```javascript
# 实例.
// file-loader(将项目目录下assets/images/的目录结构及文件拷贝到输出目录下)
{
    test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,

    /* 不设置publicPath时默认使用output中的publicPath */
    // use:  "file-loader?name=[hash].[name].[ext]&publicPath=assets/images/&outputPath=assets/images/"
    // use:  "file-loader?name=[hash].[name].[ext]&publicPath=http://hl.webpack-office-case.com/&outputPath=assets/images/"
    // use:  "file-loader?name=[hash].[name].[ext]&outputPath=assets/images/"
    use:  "file-loader?name=[hash].[ext]&outputPath=assets/images/"
}
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
npm install svg-url-loader --save-dev
```

```javascript
// 实例.
{
    test: /\.svg$/,
    use: [
        /* 小于10240byte(10kb)时返回data url否则返回url, 返回data url时不会生成对应的文件. */
        // {loader: 'svg-url-loader?limit=10240&name=assets/images/[hash].[name].[ext]'}
        // {loader: 'svg-url-loader?limit=1&name=assets/images/[hash].[name].[ext]'}
        {loader: 'svg-url-loader?limit=1&name=assets/images/[hash].[ext]'}
    ]
}

```

### 【output.publicPath】
```
官方网址：https://doc.webpack-china.org/configuration/output/
```

```
string

对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束。

默认值是一个空字符串 ""。
```

```javascript
# 简单规则如下：output.path 中的 URL 以 HTML 页面为基准。

path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"
```

```javascript
# 对于这个配置：
publicPath: "/assets/",
chunkFilename: "[id].chunk.js"

# 对于一个 chunk 请求，看起来像这样 /assets/4.chunk.js。

# 对于一个输出 HTML 的 loader 可能会像这样输出：
<link href="/assets/spinner.gif" />

# 或者在加载 CSS 的一个图片时：
background-image: url(/assets/spinner.gif);
```

webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。

注意，参数中的 [hash] 将会被替换为编译过程(compilation) 的 hash。详细信息请查看指南 - 缓存。

#### 示例：
```javascript
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
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
这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。 关于 resolver 具体如何工作的更多解释说明，请查看模块解析方式。
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
