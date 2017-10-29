// config/webpack.js

var webpack = require('webpack');
var path = require('path');
// compile js assets into a single bundle file
module.exports.webpack = {
    options: {
        devtool: 'eval',
        entry: [
            './views/src/index.js'
        ],
        output: {
            path: path.resolve(__dirname, '../.tmp/public/js'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        devServer: {
            historyApiFallback: true,
            contentBase: './'
        }
    },

    // docs: https://webpack.github.io/docs/node.js-api.html#compiler
    watchOptions: {
        aggregateTimeout: 300
    }
};