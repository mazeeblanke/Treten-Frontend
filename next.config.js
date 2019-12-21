const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const withFonts = require('next-fonts');

// const dev = process.env.NODE_ENV === 'development';
module.exports = withFonts(
  withSass(
    withCSS({
      webpackDevMiddleware: config => {
        // Solve compiling problem via vagrant
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300 // delay before rebuilding
        };
        return config;
      },
      webpack(config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        });

        config.plugins.push(
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
          })
        );

        config.plugins.push(
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
          })
        );

        // // if (dev) {
        // config.module.rules.push({
        //   test: /\.(js|jsx)$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader'
        //   // options: {
        //   //   // eslint options (if necessary)
        //   // }
        // });
        // // }

        return config;
      }
    })
  )
);
