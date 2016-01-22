var argv = require('yargs').argv,
    path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    singleRun: !argv.watch,

    frameworks: ['mocha', 'chai'],

    reporters: ['spec'],

    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './test/**/*.js'
    ],

    preprocessors: {
      ['./test/**/*.js']: ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        // Import components in tests directly from 'front' directory:
        //   BEFORE: import Example from '../../front/Example';
        //   AFTER:  import Example from 'Example';
        root: path.resolve(__dirname, './front'),
        // No more extension name required
        extensions: ['', '.js', '.jsx'],
        // REQUIRED for enzyme
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      module: {
        // DO NOT babelize sinon
        noParse: [/node_modules\/sinon\//],
        // Babelize tests
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
        ],
      },
      // REQUIRED for enzyme
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ]
  });
};
