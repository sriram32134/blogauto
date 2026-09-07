const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');
const usersData = require('../../test-data/users.json');

test.describe('User Authentication Tests', () => {
  const credentials = getUserCredentials();

  test('User can login with valid credentials', async ({ loginPage }) => {
    await loginPage.login(credentials.email, credentials.password);
    await loginPage.verifyLoginSuccess();
  });

  test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(usersData.invalidUser.email, usersData.invalidUser.password);
    await loginPage.verifyLoginFailure();
  });

  test('User cannot login with empty fields', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.verifyLoginFailure();
  });

  test('User can verify successful login state and persistent profile elements', async ({ loginPage }) => {
    await loginPage.login(credentials.email, credentials.password);
    await loginPage.verifyLoginSuccess();
    
    // Verify user UI elements post login (profile dropdown)
    await expect(loginPage.userProfileDropdown).toBeVisible();
  });

  test('User can logout successfully', async ({ loginPage, page }) => {
    await loginPage.login(credentials.email, credentials.password);
    await loginPage.verifyLoginSuccess();

    await loginPage.logout();
    
    // Verify logged out state (Login / Register nav button returns)
    const loginNavBtn = page.getByRole('button', { name: /Login \/ Register/i }).first();
    await expect(loginNavBtn).toBeVisible({ timeout: 10000 });
  });
});
