const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { cssLoaders } = require('./util');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        app: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: cssLoaders({
                        sourceMap: isDev,
                        extract: !isDev,
                      }),
                      cssSourceMap: isDev,
                      cacheBusting: isDev,
                      transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                      }
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    { loader: 'vue-jsx-hot-loader' },
                    { loader: 'ts-loader' }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.vue', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.[hash:5].js',
        path: path.resolve(__dirname, '..', 'dist')
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
    ],

};