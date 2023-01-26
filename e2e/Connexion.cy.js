const faker = require('faker');
faker.setLocale('fr');

describe("Sign Up et login", () => {

    let firstname = faker.name.firstName()
    let lastname = faker.name.lastName()
    let username = faker.internet.userName()
    let password = faker.internet.password()
    let bankName = faker.company.companyName()
    let routingNumber = faker.finance.routingNumber()
    let accountNumber = faker.finance.routingNumber()

    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
  
    it("Sign up", () => {
        cy.get('[data-test="signup"]').click();
        cy.signUp(firstname,lastname,username,password);
        cy.wait(5000);
        cy.loginFirstTime(username,password,bankName,routingNumber,accountNumber);
    });

    it("Login", () => {
        cy.login();
    });
  
})

