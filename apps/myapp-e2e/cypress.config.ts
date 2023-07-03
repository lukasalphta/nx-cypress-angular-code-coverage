import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents: (on, config) => {
      require('@cypress/code-coverage/task')(on, config)

      return config;
    },

  },
});
