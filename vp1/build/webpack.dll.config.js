const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')

// 将package.json中生产环境的依赖包取出
// vue 文件由于在 webpack.base.conf.js 中有特殊配置：'vue$': 'vue/dist/vue.esm.js'
// 因此需要单独添加：vue/dist/vue.esm.js
const vendor = Object.keys(package.dependencies).filter((item) => {
  return item != 'vue'
})
vendor.push('vue/dist/vue.esm.js')

module.exports = {
  entry: {vendor},
  output: {
    path: path.join(__dirname, '../static/js'),
    // 添加hash值避免浏览器缓存
    filename: 'dll.[name]_[hash:6].js',
    library: '[name]_[hash:6]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_[hash:6]',
      // 此处需要与 webpack.base.conf.js 的 DllReferencePlugin.context 相同
      context: __dirname
    }),
    // 把带hash的dll插入到html中
    // 方法：生成bundle-config.json 并在webpack-prod.conf中引用
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
