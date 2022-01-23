    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/js/app.js',
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: ['html-loader']
                },
                {
                    test: /\.(png|jp?eg|svg)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.s[ca]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    };