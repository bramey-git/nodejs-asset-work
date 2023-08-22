const { env } = require('process');

const externals = [require('webpack-node-externals')()];

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlPlugin = require('html-webpack-plugin');

const { joinRelativeToProjectRootDirectory } = require('../utils');

module.exports = function () {
    return {
        entry: {
            main: joinRelativeToProjectRootDirectory('src', 'main.js'),
            vendors: ['lit']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ],
                    exclude: [/.*\/(node_modules|config)\/.*/, /\.spec\.ts$/]
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    enforce: 'pre',
                    exclude: [/.*\/(node_modules|config)\/.*/]
                }
            ]
        },
        node: {
            __dirname: false
        },
        plugins: [
            new DefinePlugin({
                DEFAULT_CONFIG_PATH: JSON.stringify(
                    joinRelativeToProjectRootDirectory(
                        'dist',
                        'app.config.json'
                    )
                )
            }),
            new HtmlPlugin({
                filename: 'index.html',
                template: './public/index.html',
            })
        ],
        output: {
            path: joinRelativeToProjectRootDirectory('dist'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json','.png']
        },
        target: 'web'
    };
};
