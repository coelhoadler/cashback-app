const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ROOT_DIRECTORY = process.cwd();
console.log

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(ROOT_DIRECTORY, 'src/index.js'),
  },
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_DIRECTORY, 'build'),
    compress: true,
    port: 4200,
    overlay: true,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve(ROOT_DIRECTORY, 'config/babel.config.js'),
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: '[name]__[local]--[contenthash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: '[name]__[local]--[contenthash:8]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.resolve(ROOT_DIRECTORY, 'config'),
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              limit: 4096,
              publicPath: 'assets',
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/index.html'),
      favicon: 'src/assets/favicon.ico',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/pages/cadastro/cadastro.html'),
      favicon: 'src/assets/favicon.ico',
      filename: 'cadastro.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/pages/dashboard/dashboard.html'),
      favicon: 'src/assets/favicon.ico',
      filename: 'dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, 'src/pages/listar/listar.html'),
      favicon: 'src/assets/favicon.ico',
      filename: 'listar.html',
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
};
