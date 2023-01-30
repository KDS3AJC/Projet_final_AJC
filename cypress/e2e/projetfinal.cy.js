import { faker } from '@faker-js/faker';
faker.setLocale('fr');

    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let username = faker.internet.userName();
    let password = faker.internet.password();
    let bankName = faker.company.companyName();
    let routingNumber = faker.finance.routingNumber();
    let accountNumber = faker.finance.routingNumber();
	let waiting_time = 2000;
    let amount = faker.finance.amount(1, 500, 0);

describe("Sign Up et login", () => {

    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });
  
    it("Sign up", () => {
        cy.signUp(firstname,lastname,username,password);
        cy.wait(waiting_time);
        cy.loginFirstTime(username,password,bankName,routingNumber,accountNumber);
    });

    it("Login", () => {
        cy.login();
    });

})

describe("New bank account and new transaction", () => {

	beforeEach(function() {
      cy.visit('http://localhost:3000');
    });

    it("Creation new bank account", () => {
        cy.login();
        cy.wait(waiting_time);
        cy.createBankAccount(bankName,routingNumber,accountNumber);
    });
   
    it("Creation new transaction", () => {
        cy.login();
        cy.wait(waiting_time);
        cy.newTransaction(amount);
    });
  
})

