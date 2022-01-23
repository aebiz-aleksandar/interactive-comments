    const path = require('path');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const common = require('./webpack.common');
    const { merge } = require('webpack-merge');

    module.exports = merge(common, {
        mode: 'production',
        output: {
            filename: 'app.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: 'images/[name].[hash][ext]'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })    
        ],
        module: {
            rules: [
                {
                    test: /\.s[ca]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    });