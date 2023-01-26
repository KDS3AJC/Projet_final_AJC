//yarn dev ( in the separate window) --> http://localhost:3000/
//npx playwright test tests/final_projet.spec.js --headed 

const { test, expect } = require("@playwright/test");
import { faker } from '@faker-js/faker';

test.describe("Test suite bank account",  () => {

 test.beforeEach(async ({ page }) =>{
    await page.goto("http://localhost:3000/signin"); 
});

test('Creation of a new account Katharina Bernier', async ({ page }) => {
    
    await page.locator('[data-test="signup"]').click();
    await page.locator('[data-test="signup"]').click();//bag of application, need to click two times
    await page.getByLabel('First Name').fill('Katharina');
    await page.getByLabel('Last Name').fill('Bernier');
    await page.getByLabel('Username').fill('Katharina_Bernier');
    await page.locator('[data-test="signup-password"]').getByLabel('Password').fill('s3cret');
    await page.getByLabel('Confirm Password').fill('s3cret');
    await page.locator('[data-test="signup-submit"]').click();
 
});

test('Sign in to real world application', async ({ page }) => {
    
     
    await page.locator('[id="username"]').fill('Katharina_Bernier'); 
    await page.locator('[id="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();   
});

test('Create your bank account', async ({ page }) => {
     
    await page.locator('[id="username"]').fill('Katharina_Bernier'); 
    await page.locator('[id="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();

    await page.locator('[data-test="sidenav-bankaccounts"]').click();
    await page.locator('[data-test="bankaccount-new"]').click();
    await page.locator('[id="bankaccount-bankName-input"]').fill('MyNewBankAccount');      
    await page.locator('[id="bankaccount-routingNumber-input"]').fill('123456789');
    await page.locator('[id="bankaccount-accountNumber-input"]').fill('123456789');
    await page.locator('[data-test="bankaccount-submit"]').click();
  
});


test('Carry out a new transaction from your account to another', async ({ page }) => {
    
    await page.locator('[id="username"]').fill('Katharina_Bernier'); 
    await page.locator('[id="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();

    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await page.getByText('Arely Kertzmann').click();
    await page.getByPlaceholder('Amount').fill('$1500');
    await page.getByPlaceholder('Add a note').fill('Rent a car for holidays');
    await page.locator('[data-test="transaction-create-submit-payment"]').click();    
});
})

