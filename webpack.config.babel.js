import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/public/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-0']
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader'
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        }
      }
    ]
  }
};

export default config;
