/// <reference types="cypress" />

class SprintPage {
	// _confirmPopUpSelector = ".cookie-allow";
	// get confirmPopUpSelector() {}
	// set confirmPopUpSelector(value) {}
	// _closePopUpSelector = ".cookie-info__close > .btn-cookie-close";
	// get closePopUpSelector() {}
	// set closePopUpSelector(value) {}

	getConfirmPopUp() {
		return cy.get(".cookie-allow");
	}
	getClosePopUp() {
		return cy.get(".cookie-info__close > .btn-cookie-close");
	}
	getNavigationLink() {
		return cy.get(".nav-links");
	}
}

export default SprintPage;
