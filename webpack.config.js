const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


module.exports = {
    entry: { 
        index: ['./src/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            fileName: 'index.html',
            template: './src/index.html'
        }),
        // Define the filename pattern for CSS.
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // 4. Extract CSS from JS and inject to the DOM
                  { loader: "css-loader", options: { url: false, importLoaders: 1 } }, // 3. Load the CSS into JS, set url = false to prevent following urls to fonts and images.
                  { loader: 'postcss-loader', options: { plugins: [autoprefixer(), cssnano()] }}, // 2. Add browser prefixes and minify CSS.
                  { loader: 'sass-loader' }, // 1. Load the SCSS/SASS
                ],
              },
        ]
    }

}