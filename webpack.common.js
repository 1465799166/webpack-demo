const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { //入口文件
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: { //output为打包得到到捆
        filename: '[name].[chunkhash].bundle.js', // 打包得到的文件名, [name]即为入口中设置的键名，[chunkhash]即为hash映射后的值（重新打包后hash值改变，以保证浏览器能缓存新页面）
        chunkFilename: '[name].bundle.js', // 不通过设置entry，在代码中动态导入
        path: path.resolve(__dirname, 'dist') //_dirname为node全局对象，为当前目录路径；path.resolve（a,b）会解析路径为a/b
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor', // 将公共的依赖模块提取到指定入口vendor中
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // 清理dist目录，仅保留当前使用到的文件
        new HtmlWebpackPlugin({ // 在dist目录下创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
            title: 'Production'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        // 将公共的依赖模块提取到指定入口中;4.x已删除，用optimization.splitChunks替代；      name: 'common'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-loader', 'style-loader']
            }
        ]
    }
};