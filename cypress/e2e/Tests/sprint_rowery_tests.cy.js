/// <reference types="cypress" />
import SprintPage from "../../support/SprintPage.js";
import logIn from "../../fixtures/loginSprintRowery.json";

const Sprint = new SprintPage();

beforeEach("Setup", () => {
	cy.visit("/");
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
		cy.get(".cookie-info__desc > a", { timeout: 5000 }).click();
		cy.url().should(
			"equal",
			"https://sprint-rowery.pl/pliki-cookies-polityka-wykorzystania/"
		);
	});
});

describe("Open navigation links sprint-rowery bottom menu section", () => {
	beforeEach("Close PopUp and scroll down", () => {
		cy.ConfirmPopUp();
		cy.scrollTo("bottom");
	});

	it("Open O nas on INFORMACIE section with click on unique selector", () => {
		cy.get(
			".information > .footer-section-content > .nav-links > :nth-child(1) > a"
		).click();
		cy.url().should("contain", "odwiedz-nasze-centrum-rowerowe");
	});

	it("Open Kontakt on INFORMACIE section with click on programmability eq and children ", () => {
		Sprint.getNavigationLink().eq(0).children().children().eq(1).click();
		cy.url().should("contain", "contact");
	});
});

describe("Searches in sprint-rowery", () => {
	beforeEach("Close PopUp and Fixtures ", () => {
		cy.ConfirmPopUp();
		cy.fixture("searchSprintRowery").as("text");
	});

	it("search and go to Czapka Trek Red Patch in sprint-rowery with {enter}", function () {
		cy.get("#search").clear().type(this.text[0].mySearch).type("{enter}");
		cy.url().should("contain", this.text[0].query);
	});

	it("search and go to Czapka Trek Red Patch in sprint-rowery with click on sugestion programmability eq", function () {
		cy.get("#search").clear().type(this.text[1].mySearch).wait(1000);
		cy.get(".searchautocomplete__index-magento_catalog_product > ul > li")
			.eq(0)
			.click();
		cy.url().should("contain", this.text[1].query);
	});

	it("search and go to Czapka Trek Red Patch in sprint-rowery with click on sugestion programmability children ", function () {
		cy.get("#search").clear().type(this.text[1].mySearch).wait(1000);
		cy.get(".searchautocomplete__index-magento_catalog_product")
			.children()
			.children()
			.eq(2)
			.click();
		cy.url().should("contain", this.text[1].query);
	});
});

describe("Login to sprint-rowery", () => {
	it("Login with wrong login and wrong password", () => {
		cy.ConfirmPopUp();
		cy.get("#signin").click();
		cy.get("#ui-id-1 > .block").should("be.visible");
		cy.get("#email").type(logIn.login);
		cy.get("#pass").type(logIn.password);
		cy.get("#send2").click();
		cy.get("#email-error").should("be.visible");
	});
});
