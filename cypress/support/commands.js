// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })





Cypress.Commands.add("login", () => {
  // Login
  cy.get('[name="username"]').type("Katharina_Bernier");
  cy.get('[name="password"]').type("s3cret");
  cy.get('.MuiButton-label').click();
});
  
Cypress.Commands.add("signUp", (firstName, lastName, username, password) => {
  // création de compte user
  
  cy.get('[data-test="signup"]').click();
  cy.url().should("include", "/signup"); // assertion
  cy.get('[name="firstName"]').type(firstName);
  cy.get('[name="lastName"]').type(lastName);
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('[name="confirmPassword"]').type(password);
  cy.get('.MuiButton-label').click();
});
  
  
Cypress.Commands.add("createBankAccount", (bankName, routingNumber, accountNumber) => {
  // Création d'un nouveau compte bancaire
  cy.get('[data-test="sidenav-bankaccounts"]').click();
  cy.url().should("include", "/bankaccounts"); // assertion
  cy.get('[data-test="bankaccount-new"]').click();
  cy.url().should("include", "/bankaccount/new"); // assertion
  cy.get('[id="bankaccount-bankName-input"]').type(bankName);      
  cy.get('[id="bankaccount-routingNumber-input"]').type(routingNumber);
  cy.get('[id="bankaccount-accountNumber-input"]').type(accountNumber);
  cy.get('[data-test="bankaccount-submit"]').click();
});
  
Cypress.Commands.add("loginFirstTime", (username,password,bankName, routingNumber, accountNumber) => {
  // Login + création du compte bancaire user
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('.MuiButton-label').click(); // sign in
  cy.wait(10000);
  cy.get('.MuiButton-label').eq(2).click(); // next
  cy.get('[id="bankaccount-bankName-input"]').type(bankName);
  cy.get('[id="bankaccount-routingNumber-input"]').type(routingNumber);
  cy.get('[id="bankaccount-accountNumber-input"]').type(accountNumber);
  cy.get('.MuiButton-label').eq(1).click(); // Save
  cy.get('.MuiButton-label').eq(2).click(); // Done
});

Cypress.Commands.add("newTransaction", (amount) => {
  cy.get('[data-test="nav-top-new-transaction"]').click();
  cy.url().should("include", "/transaction/new"); // assertion
  cy.contains('Arely Kertzmann').click();
  cy.get('[id="amount"]').type(amount);
  cy.get('[id="transaction-create-description-input"]').type('Louer une voiture pour les vacances');
  cy.get('[data-test="transaction-create-submit-payment"]').click();
});
  
  
  