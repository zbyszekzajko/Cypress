const { defineConfig } = require("cypress");

module.exports = defineConfig({
	reporter: "cypress-mochawesome-reporter",
	e2e: {
		viewportHeight: 1080,
		viewportWidth: 1440,
		baseUrl: "https://sprint-rowery.pl/",
		chromeWebSecurity: false,
		watchForFileChanges: false,
		retries: 1,
		projectId: "yy5uud",
		setupNodeEvents(on, config) {
			// implement node event listeners here
			require("cypress-mochawesome-reporter/plugin")(on);
		},
	},
});
