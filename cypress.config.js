const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		viewportHeight: 1080,
		viewportWidth: 1440,
		baseUrl: "https://sprint-rowery.pl//",
		chromeWebSecurity: false,
		watchForFileChanges: false,
		retries: 1,
		projectId: "csm33q",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
