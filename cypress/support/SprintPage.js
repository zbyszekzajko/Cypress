/// <reference types="cypress" />

class SprintPage {
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
