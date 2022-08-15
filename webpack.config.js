const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const plugins = [
    new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: 'index.html',
        template: 'src/index.html',
    }),
];
if (devMode) {
    plugins.push(new BundleAnalyzerPlugin());
    plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
            ignoreOrder: false,
            attributes: {
                id: 'target',
                'data-target': 'example',
            },
        })
    );
}

var config = {
    mode: devMode ? 'development' : 'production',
    entry: {
        bundle: [
            path.resolve(__dirname, 'src/index.js'),
            path.resolve(__dirname, 'src/styles/main.scss'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    !devMode
                        ? { loader: MiniCssExtractPlugin.loader }
                        : {
                            loader: 'style-loader',
                            options: {
                                injectType: 'styleTag',
                            },
                        },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            importLoaders: 1,
                            namedExport: true,
                            localIdentName: '[name]-[local]-[hash:base64:3]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: plugins,
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
};

module.exports = function (env, argv) {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }
    return config;
};
