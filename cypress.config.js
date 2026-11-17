const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
});
