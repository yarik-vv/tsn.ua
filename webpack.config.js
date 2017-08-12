'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: {
    build: './build'
  },

  output: {
    path: __dirname + '/www',
    publicPath: '/',
    filename: '[name].js'
  },

  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.css']
  },

  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        include: __dirname + '/src',
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: ['css', 'postcss', 'sass']
        })
      },
      {
        test: /\.(json|png|jpg|otf|mp4|svg)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new CleanWebpackPlugin(__dirname + '/www/*'),
    new HtmlWebpackPlugin({
      files: {
        js: 'index.js',
        css: 'styles.css',
        chunks: {
          custom: {}
        }
      },
      chunks: ['custom'],
      filename: 'index.html',
      template: 'index.ejs',
      minify: {
        minifyCSS:true,
        minifyJS:true,
        useShortDoctype: true,
        removeAttributeQuotes: true,
        removeComments:true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        caseSensitive: true,
        sortAttributes: true,
        sortClassName: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
        preventAttributesEscaping: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ],

  devServer: {
    port: 9000,
    contentBase: __dirname + '/www',
    watchContentBase: true,
    compress: true,
    inline: true,
    hot: true
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new StyleExtHtmlWebpackPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  );
}
