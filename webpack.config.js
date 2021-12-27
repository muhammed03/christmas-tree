const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src')

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 3000,
          historyApiFallback: true,
          static: {
            directory: srcPath,
            watch: true,
          },
        },
      }

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    main: './index.js',
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[file]',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        include: [path.join(__dirname, 'src/pages'), path.join(__dirname, 'src/components'), path.join(__dirname, 'src/js')],
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.join(__dirname, 'src/styles/base/_base.scss'),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].js',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.scss', '**/*.sass', '**/*.html'],
          },
          noErrorOnMissing: true,
          force: true,
        },
        { from: path.resolve(__dirname, 'netlify.toml') },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
  ...devServer(development),
})
