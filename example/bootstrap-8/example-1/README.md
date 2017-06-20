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

### 【Bootstrap】

#### bootstrap-loader
```
npm：https://www.npmjs.com/package/bootstrap-loader
```

##### 一、安装

```javascript
# 第1步安装bootstrap-loader.
npm install bootstrap-loader --save

# 第2步安装bootstrap.
# 如果你使用的是Bootstrap3
npm install bootstrap-sass --save-dev

# 如果你使用的是Bootstrap4，注意上官网检查一下最新的版本。
npm install bootstrap@v4.0.0-alpha.5 --save

# 第3步 安装其他样式处理loader
npm install css-loader node-sass resolve-url-loader sass-loader style-loader url-loader --save

# 如果你使用的是Bootstrap 4,可能会需要安装个loader
npm install postcss-loader --save
```

##### 二、使用
```javascript
如果在js中直接使用，那么：
require('bootstrap-loader');

如果想打包，那么：
entry : {
    'bootstrap': 'bootstrap-loader'
},
```

##### 三、字体加载器.
```javascript
// woff、fft、eot、svg
{
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=assets/font/'
},
{
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: 'url-loader?limit=10000&mimetype=application/octet-stream&outputPath=assets/font/'
},
{
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: 'file-loader?outputPath=assets/font/'
},
{
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: 'url-loader?limit=10000&mimetype=image/svg+xml' // 将小于10kb的svg转换成data url
}
```
