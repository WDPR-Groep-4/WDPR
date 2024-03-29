describe("navbar test", () => {
    it("Nav titel", () => {
        cy.visit("https://localhost:44419", { responseTimeout: 180000 });
        cy.get("a").first().should("contain", "Theater Laak");
    });
    it("homepage knop", () => {
        cy.visit("https://localhost:44419");
        cy.get("header").contains("Home").click();
        cy.url().should("include", "/");
    });
    it("agenda knop", () => {
        cy.visit("https://localhost:44419");
        cy.get("header").contains("Agenda").click();
        cy.url().should("include", "/agenda");
    });
});
