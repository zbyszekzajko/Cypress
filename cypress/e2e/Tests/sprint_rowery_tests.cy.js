/// <reference types="cypress" />
import SprintPage from "../../support/SprintPage.js";
import jsonFile from "../../fixtures/search.json";

const Sprint = new SprintPage();

Cypress.Commands.add("ConfirmPopUpAndScroll", () => {
	Sprint.getConfirmPopUp().click();
	cy.scrollTo("bottom");
});

beforeEach("Setup", () => {
	cy.visit("/");
	cy.wait(500);
	cy.url().should("contain", "sprint-rowery");
	cy.url().should("equal", "https://sprint-rowery.pl/");
});

describe("Test check server response sprint-rowery", () => {
	it("check status 200", () => {
		cy.request("www.sprint-rowery.pl").then(response => {
			expect(response.status).to.eq(200);
			if (response.status !== 200) {
				Cypress.runner.stop();
			}
		});
	});
});

describe("Test of Cookie pop-up sprint-rowery", () => {
	it("Confirm pop-up", () => {
		Sprint.getConfirmPopUp().should("be.visible");
		Sprint.getConfirmPopUp().click();
		Sprint.getConfirmPopUp().should("not.be.visible");
	});

	it("Close pop-up", () => {
		Sprint.getClosePopUp().should("be.visible");
		Sprint.getClosePopUp().click();
		Sprint.getClosePopUp().should("not.be.visible");
	});

	it("More information", () => {
		cy.get(".cookie-info__desc > a").click();
		cy.url().should(
			"equal",
			"https://sprint-rowery.pl/pliki-cookies-polityka-wykorzystania/"
		);
	});
});

describe("Open navigation links sprint-rowery bottom menu section", () => {
	it("Open O nas on INFORMACIE section with click on unique selector", () => {
		cy.ConfirmPopUpAndScroll();
		cy.get(
			".information > .footer-section-content > .nav-links > :nth-child(1) > a"
		).click();
		cy.url().should("contain", "odwiedz-nasze-centrum-rowerowe");
	});

	it("Open Kontakt on INFORMACIE section with click on programmability eq and children ", () => {
		cy.ConfirmPopUpAndScroll();
		Sprint.getNavigationLink().eq(0).children().children().eq(1).click();
		cy.url().should("contain", "contact");
	});

	it.skip("Open Moje konto on ZAKUPY section with click on programmability eq and children", () => {
		cy.ConfirmPopUpAndScroll();
		Sprint.getNavigationLink().eq(1).children().children().eq(0).click();
		cy.url().should("contain", "customer/account/login/");
	});
});

describe("Searchers", () => {
	it("search and go to Czapka Trek Red Patch in sprint-rowery with {enter}", () => {
		Sprint.getConfirmPopUp().click();
		cy.get("#search").clear().type(jsonFile[0].mySearch).type("{enter}");
		cy.url().should("contain", "czapka-trek-red-patch");
	});

	it("search and go to Czapka Trek Red Patch in sprint-rowery with click on sugestion programmability eq", () => {
		Sprint.getConfirmPopUp().click();
		cy.get("#search").clear().type(jsonFile[1].mySearch).wait(1000);
		cy.get(".searchautocomplete__index-magento_catalog_product > ul > li")
			.eq(0)
			.click();
		cy.url().should("contain", "czapka-trek-red-patch");
	});

	it("search and go to Czapka Trek Red Patch in sprint-rowery with click on sugestion programmability children ", () => {
		Sprint.getConfirmPopUp().click();
		cy.get("#search").clear().type(jsonFile[1].mySearch).wait(1000);
		cy.get(".searchautocomplete__index-magento_catalog_product")
			.children()
			.children()
			.eq(2)
			.click();
		cy.url().should("contain", "czapka-trek-red-patch");
	});

	it.skip("search and go to Czapka Trek Red Patch in sprint-rowery with click on sugestion programmability children and eq", () => {
		Sprint.getConfirmPopUp().click();
		cy.get("#search").clear().type(jsonFile[1].mySearch).wait(1000);
		cy.get(".searchautocomplete__index-magento_catalog_product > ul")
			.children()
			.eq(0)
			.click();
		cy.url().should("contain", "czapka-trek-red-patch");
	});
});
