const { test, expect } = require('../../fixtures/test-fixtures');
const usersData = require('../../test-data/users.json');

test.describe('Negative Authentication Tests', () => {

  test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(usersData.invalidUser.email, usersData.invalidUser.password);
    await loginPage.verifyLoginFailure();
  });

  test('User cannot login with empty fields', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.verifyLoginFailure();
  });

  test('Admin cannot login with invalid credentials', async ({ adminLoginPage }) => {
    await adminLoginPage.login(usersData.invalidAdmin.email, usersData.invalidAdmin.password);
    await adminLoginPage.verifyAdminLoginFailure();
  });

  test('Admin cannot login with empty fields', async ({ adminLoginPage }) => {
    await adminLoginPage.login('', '');
    await adminLoginPage.verifyAdminLoginFailure();
  });
});
