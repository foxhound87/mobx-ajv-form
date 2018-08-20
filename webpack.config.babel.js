const path = require('path')

const loaders = [{
  test: /\.ts$/,
  loader: 'ts-loader',
  include: path.join(__dirname, 'src'),
}, {
  test: /\.json$/,
  loader: 'json-loader',
}];

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'umd'),
    library: 'MobxReactForm',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.json'],
  },
  externals: {
    mobx: 'mobx',
  },
  module: { loaders },
};
