const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: {
        login: "./src/client/login.js",
        register: "./src/client/registerUser.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./login/index.html",
            chunks: ['login']
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./register/index.html",
            chunks: ['register']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "querystring": false,
            "url": false,
            "buffer": false,
            "util": false,
            "string_decoder": false,
            "async_hooks": false
        },
        extensions: ['.js', '.json', '.png'],
    },
};