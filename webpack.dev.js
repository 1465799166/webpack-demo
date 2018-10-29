const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map', // 控制代码品质，当前为原始源代码，且在生产环境中不激活(观察报错)
    devServer: {
        contentBase: './dist' //在localhost: 8080 下建立服务，将dist目录下的文件作为可访问文件（编译文件，并保存在内存中）
    }
})