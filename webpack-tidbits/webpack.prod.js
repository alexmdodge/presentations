const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // By default in production assets are minified
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      compress: true,
    })
  ]
});