var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/main.js',
    output: {
        path: './build',
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap')
            },
            { test: /\.(svg|jpg|png|gif|woff2?|ttf)$/, loader: 'url-loader?limit=10000'},
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' }
        ]
    },

    postcss: function() {
        return [autoprefixer]
    },

    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new ExtractTextPlugin('[name].css')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.scss']
    }
}
