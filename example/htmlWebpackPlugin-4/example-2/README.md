### 官方网站
```
English:  https://webpack.js.org
Chinease: https://doc.webpack-china.org
```

### npm网站
```
https://www.npmjs.com/
```

#### HtmlWebpackPlugin
```
官方地址：https://doc.webpack-china.org/plugins/html-webpack-plugin/
```
```
HtmlWebpackPlugin简化了HTML文件的创建，以便为您的webpack包提供服务。 这对于在文件名中包含每次会随着变异会发生变化的哈希的webpack bundle尤其有用。 您可以让插件为您生成一个HTML文件，使用lodash模板提供您自己的模板，或使用您自己的loader。
```

#### 安装
```
npm install --save-dev html-webpack-plugin
```
#### 基本用法

该插件将为您生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包。 只需添加插件到您的webpack配置如下：
```html
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
```

这将会产生一个包含以下内容的文件 dist/index.html：
```html
<!DOCTYPE HTML>
<html lang="zh-cn">            
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,IE=9,IE=10,IE=11">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="icon" href="http://test-portal.sinobbd.com/static/bigdata/img/global/slogo.png" type="image/x-icon"/>
  </head>
<body>
  <script type="text/javascript" src="http://portal.sinobbd.com/static/bigdata/js/global/jquery.min.js"></script>
</body>
</html>
```
