/**
 * Webpack configuration file
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const env = process.env.NODE_ENV;

module.exports = {
    entry: {
        app: ['core-js/stable', './app/index.js']
    },

    mode: env,

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ''
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'app/scripts/vendors')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [ path.resolve(__dirname, 'node_modules') ]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: [path.resolve(__dirname, 'app/images')],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images'
                        }
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: [ path.resolve(__dirname, 'app/fonts') ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: './app/index.html', minify: false}),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
            inlineAll: true,
            allowFromUrl: true
        }),
        new CopyPlugin({
            patterns: [
                { from: 'app/images', to: 'images' },
            ],
        })
    ]
};
