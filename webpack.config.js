const autoprefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === 'development';
    }

    var config = {
        entry: {
            editor: './src/editor.js',
            script: './src/script.js'
        },
        output: {
            filename: '[name].bundle.js',
            clean: true
        },
        optimization: {
            minimize: false, //set to true to minimize js bundle files
            minimizer: [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({
                    map: {
                        inline: false,
                        annotation: true
                    }
                })
            ]
        },
        plugins: [
            //new CleanWebpackPlugin(),
            new MiniCSSExtractPlugin({
                //chunkFilename: "[id].css",
                filename: (chunkData) => {
                    return chunkData.chunk.name === 'script' ? 'style.bundle.css' : "[name].bundle.css"
                } 
            })
        ],
        devtool: isDevelopment() ? 'eval-cheap-module-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: ["@babel/plugin-proposal-class-properties"],
                            presets: [
                                '@babel/preset-env',
                                [
                                    '@babel/preset-react',
                                    {
                                        "pragma": "wp.element.createElement",
                                        "pragmaFrag": "wp.element.Fragment",
                                        "development": isDevelopment() //set to true to see the lines on which error occur in index.html
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "autoprefixer",
                                            {
                                                // Options
                                            },
                                        ],
                                    ],
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        externals: { //to skip while bundling, these blocks will be take from the browser itself
            jquery: "jQuery",
            lodash: "lodash",
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/i18n": ["wp", "i18n"],
            "@wordpress/block-editor": ["wp", "editor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/element": ["wp", "element"],
            "@wordpress/blob": ["wp", "blob"],
            "@wordpress/data": ["wp", "data"],
            "@wordpress/html-entities": ["wp", "htmlEntities"]
        }
    };
    return config;
}



