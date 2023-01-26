const faker = require('faker');
faker.setLocale('fr');

describe("New transaction et new bank account", () => {

    let amount = faker.finance.amount(1, 500, 0);
    
    it("Creation new bank account", () => {
          cy.createBankAccount(bankName,routingNumber,accountNumber);
    });
   
    it("Creation new transaction", () => {
         cy.newTransaction(amount);
    });
   
})