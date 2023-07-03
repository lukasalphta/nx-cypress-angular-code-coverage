module.exports = (webpackConfig) => {
  return {
    ...webpackConfig,

    module: {
      rules: [
        // Istanbul Instrumentation rule
        ...webpackConfig.module.rules,
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


