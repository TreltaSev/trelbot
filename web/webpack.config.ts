const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

let _mode: string = process.env.se_mode?.trim() || "development";

module.exports = {
    mode: _mode,
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json']
                },
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            }
        ]
    },
    devtool: _mode === "production" ? false : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    },
    devServer: {
        historyApiFallback: true
    }
}