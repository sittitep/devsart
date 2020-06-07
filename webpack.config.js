const Dotenv = require('dotenv-webpack');
// Webpack uses this to work with directories
const path = require('path');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  node: {
    fs: "empty"
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]' 
      },
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
    ],
  },
  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/assets/packs/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: '/assets',
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv()
  ]
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  // mode: 'development'
};
