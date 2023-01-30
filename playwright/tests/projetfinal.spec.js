//yarn dev ( in the separate window) --> http://localhost:3000/
//npx playwright test tests/projetfinal.spec.js --headed 

const { test, expect } = require("@playwright/test");
import { faker } from '@faker-js/faker';
import { loadHomepage, signUpFunction, loginFunction, newBankAccount, newTransaction } from '../helpers';

test.describe("Test suite bank account", () => {
    
    let firstname = faker.name.firstName()
    let lastname = faker.name.lastName()
    let username = faker.internet.userName()
    let password = faker.internet.password()
    let bankName = faker.company.name()
    let routingNumber = faker.finance.routingNumber()
    let accountNumber = faker.finance.routingNumber()
    let amount = faker.finance.amount(1, 500, 0)
    
    test.beforeEach(async ({ page }) =>{
        await loadHomepage(page);        
    });

    test('Sign up', async ({ page }) => {
        await signUpFunction(page, firstname, lastname, username, password);        
    });

    test('Sign in', async ({ page }) => {
        await expect(page).toHaveURL("http://localhost:3000/signin");
        await loginFunction(page);
    });
    
    //assertion to check if we fill well username and password
    (async () => {
        await page.expect((username, password) => {
            const actualUsername = document.querySelector('[id="username"]').value;
            const actualPassword = document.querySelector('[id="password"]').value;
            return actualUsername === username && actualPassword === password;
          }, 'Katharina_Bernier', 's3cret');
        });

    test('Creation new bank account', async ({ page }) => {
        await loginFunction(page);
        await newBankAccount(page, bankName, routingNumber, accountNumber);        
    });

    test('New Transaction', async ({ page }) => {
        await loginFunction(page);
        await newTransaction(page, amount);        
    });

})