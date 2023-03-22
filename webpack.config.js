const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

const getPlugins = (page) => {
    return [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: `./${page}/index.html`,
            chunks: [page]
        })
    ];
};

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        login: "./src/client/login.js",
        register: "./src/client/registerUser.js",
        reports: "./src/client/reports.js",
        patients: "./src/client/patients.js",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        ...getPlugins('login'),
        ...getPlugins('register'),
        ...getPlugins('reports'),
        ...getPlugins('patients'),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    ],
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
    },
    devtool: isDevelopment ? 'inline-source-map' : undefined,
};