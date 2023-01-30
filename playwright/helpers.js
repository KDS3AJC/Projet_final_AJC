export async function loadHomepage(page) {
    await page.goto("http://localhost:3000/signin");
}

export async function loginFunction(page) {
    await page.type('[id="username"]', 'Katharina_Bernier');
    await page.type('[id="password"]', 's3cret');
    await page.locator('[data-test="signin-submit"]').click();
}


export async function signUpFunction(page, firstname, lastname, username, password) {
    await page.locator('[data-test="signup"]').click();
    await page.locator('[data-test="signup"]').click();
    await page.getByLabel('First Name').fill(firstname);
    await page.getByLabel('Last Name').fill(lastname);
    await page.getByLabel('Username').fill(username);
    await page.locator('[data-test="signup-password"]').getByLabel('Password').fill(password);        
    await page.getByLabel('Confirm Password').fill(password);
    await page.locator('[data-test="signup-submit"]').click();
}

export async function newBankAccount(page, bankName, routingNumber, accountNumber) {
    await page.locator('[data-test="sidenav-bankaccounts"]').click();
    await page.locator('[data-test="bankaccount-new"]').click();
    await page.locator('[id="bankaccount-bankName-input"]').fill(bankName);
    await page.locator('[id="bankaccount-routingNumber-input"]').fill(routingNumber);
    await page.locator('[id="bankaccount-accountNumber-input"]').fill(accountNumber);
    await page.locator('[data-test="bankaccount-submit"]').click();
}

export async function newTransaction(page, amount) {
    await page.locator('[data-test="nav-top-new-transaction"]').click(); // nav-top-new-transaction
    await page.getByText('Arely Kertzmann').click();
    await page.getByPlaceholder('Amount').fill(amount);
    await page.getByPlaceholder('Add a note').fill('Rent a car for holidays');
    await page.locator('[data-test="transaction-create-submit-payment"]').click();
}