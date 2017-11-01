const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    courtaliaHome: './web/js/app/home/index.js',
    courtaliaAdmin: './web/js/app/admin/index.js',
    partner: './web/js/app/partner/index.js',
    passwordValidation: './web/js/app/admin/password-validation/passwordValidation.js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      Popper: ['popper.js', 'default'],
    }),
    //  new MinifyPlugin()

// En prod
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })

  ],


  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }],
    noParse: function(content) {
      return /poper/.test(content);
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'web/js/dist')
  }
};
