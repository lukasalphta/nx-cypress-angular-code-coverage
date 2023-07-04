# NX-Cypress-Angular-Code-Coverage Example

This repo shows a minimal working example of generating Code Coverage for an Angular app withing a NX Monorepo.



## Steps to follow

Install packages

```
npm i @cypress/code-coverage -D
npm i @jsdevtools/coverage-istanbul-loader -D
```

Adjust project.json of the tested app and create extenstion of webpack.

In project.json change the executor of build target to webpack-browser

```
"executor": "@nx/angular:webpack-browser",
```

And the executor of serve target to webpack-dev-server

```
 "executor": "@nx/angular:webpack-dev-server",
```

Add customWebpack to build target

```
"customWebpackConfig": {
    "path": "apps/myapp/webpack.config.js"
}
```

Create webpack.config.js in the app directory

```
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
```

Add cypress/coverage task to cypress.config.ts

```
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents: (on, config) => {
      require('@cypress/code-coverage/task')(on, config)

      return config;
    },

  },
});
```

Import cypress/coverage in support/e2e.ts

```
import '@cypress/code-coverage/support'
```

## Run tests with coverage

```
nx e2e myapp-e2e
```
After running tests the coverage output will be generated under ```apps/myapp-e2e/coverage```
