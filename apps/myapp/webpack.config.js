module.exports = (webpackConfig) => {
  webpackConfig,
  {
    module: {
      rules: [
        // Istanbul Instrumentation rule
        {
          test: /\.(js|ts)$/,
          loader: '@jsdevtools/coverage-istanbul-loader',
          options: { esModules: true },
          enforce: 'post',
          include: [require('path').join(__dirname, '/src')],
          exclude: [/\.(e2e|spec|cy)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/],
        },
      ],
    },
  }
}


