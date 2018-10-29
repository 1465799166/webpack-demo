const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack配置
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 代码压缩
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'source-map', // 控制代码品质，当前为原始源代码，在生产环境中激活(观察报错)
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true  // 生产环境下用于调试代码，会在dist目录下生成.map文件
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') // 定义全局变量，在打包时做替换，使用JSON.stringify是因为替换时仅替换‘’内部内容
        }),
        new webpack.HashedModuleIdsPlugin() // 修改本地依赖，vender hash值不变
    ]
})