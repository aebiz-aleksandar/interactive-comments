    const path = require('path');
    const common = require('./webpack.common');
    const { merge } = require('webpack-merge');
    
    module.exports = merge(common, {
        mode: 'development',
        output: {
            filename: 'app.js',
            path: path.resolve('_dirname', 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.sc[a]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    });