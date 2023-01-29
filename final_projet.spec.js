//yarn dev ( in the separate window) --> http://localhost:3000/
//npx playwright test tests/projetfinal.spec.js --headed 

const { test, expect } = require("@playwright/test");
import { faker } from '@faker-js/faker';

test.describe("Test suite bank account", () => {

    test.beforeEach(async ({ page }) =>{
        await page.goto("http://localhost:3000/signin");
    });

    test("main navigation", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("http://localhost:3000/signin");
      });

    let firstname = faker.name.firstName()
    let lastname = faker.name.lastName()
    let username = faker.internet.userName()
    let password = faker.internet.password()
    let bankName = faker.company.name()
    let routingNumber = faker.finance.routingNumber()
    let accountNumber = faker.finance.routingNumber()
    let amount = faker.finance.amount(1, 500, 0)

    test('Sign up', async ({ page }) => {
        await page.locator('[data-test="signup"]').click();
        await page.locator('[data-test="signup"]').click();//bag of application, need to click two times
        await page.getByLabel('First Name').fill(firstname);
        await page.getByLabel('Last Name').fill(lastname);
        await page.getByLabel('Username').fill(username);
        await page.locator('[data-test="signup-password"]').getByLabel('Password').fill(password);        

        await page.getByLabel('Confirm Password').fill(password);
        await page.locator('[data-test="signup-submit"]').click();
    });

    test('Sign in', async ({ page }) => {
        await page.type('[id="username"]', 'Katharina_Bernier');
        await page.type('[id="password"]', 's3cret');
        await page.locator('[data-test="signin-submit"]').click();
    });
    
    //assertion to check we fill well username and password
    (async () => {
        await page.expect((username, password) => {
            const actualUsername = document.querySelector('[id="username"]').value;
            const actualPassword = document.querySelector('[id="password"]').value;
            return actualUsername === username && actualPassword === password;
          }, 'Katharina_Bernier', 's3cret');
        });

    test('Creation new bank account', async ({ page }) => {
        await page.locator('[id="username"]').fill('Katharina_Bernier');
        await page.locator('[id="password"]').fill('s3cret');
        await page.locator('[data-test="signin-submit"]').click();

        await page.locator('[data-test="sidenav-bankaccounts"]').click();
        await page.locator('[data-test="bankaccount-new"]').click();
        await page.locator('[id="bankaccount-bankName-input"]').fill(bankName);
        await page.locator('[id="bankaccount-routingNumber-input"]').fill(routingNumber);
        await page.locator('[id="bankaccount-accountNumber-input"]').fill(accountNumber);
        await page.locator('[data-test="bankaccount-submit"]').click();
    });

    test('New Transaction', async ({ page }) => {
        await page.locator('[id="username"]').fill('Katharina_Bernier');
        await page.locator('[id="password"]').fill('s3cret');
        await page.locator('[data-test="signin-submit"]').click();
        await page.locator('[data-test="nav-top-new-transaction"]').click();
        await page.getByText('Arely Kertzmann').click();
        await page.getByPlaceholder('Amount').fill(amount);
        await page.getByPlaceholder('Add a note').fill('Rent a car for holidays');
        await page.locator('[data-test="transaction-create-submit-payment"]').click();
    });

})
