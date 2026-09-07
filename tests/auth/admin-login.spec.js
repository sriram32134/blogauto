const { test, expect } = require('../../fixtures/test-fixtures');
const { getAdminCredentials } = require('../../utils/authHelper');
const usersData = require('../../test-data/users.json');

test.describe('Admin Authentication Tests', () => {
  const adminCreds = getAdminCredentials();

  test('Admin can navigate through "Are you the Admin?" link', async ({ adminLoginPage, page }) => {
    await adminLoginPage.navigate();
    await expect(page.getByRole('button', { name: 'Admin Login', exact: true })).toBeVisible();
  });

  test('Admin can login with valid credentials', async ({ adminLoginPage }) => {
    await adminLoginPage.login(adminCreds.email, adminCreds.password);
    await adminLoginPage.verifyAdminLoginSuccess();
  });

  test('Admin cannot login with invalid credentials', async ({ adminLoginPage }) => {
    await adminLoginPage.login(usersData.invalidAdmin.email, usersData.invalidAdmin.password);
    await adminLoginPage.verifyAdminLoginFailure();
  });

  test('Admin can verify successful admin login state', async ({ adminLoginPage }) => {
    await adminLoginPage.login(adminCreds.email, adminCreds.password);
    await adminLoginPage.verifyAdminLoginSuccess();
    
    // Verify admin UI state (admin profile dropdown)
    await expect(adminLoginPage.adminProfileDropdown).toBeVisible();
  });

  test('Admin can logout successfully', async ({ adminLoginPage, page }) => {
    await adminLoginPage.login(adminCreds.email, adminCreds.password);
    await adminLoginPage.verifyAdminLoginSuccess();

    await adminLoginPage.logout();

    // Verify logged out state (Login / Register nav button reappears)
    const loginNavBtn = page.getByRole('button', { name: /Login \/ Register/i }).first();
    await expect(loginNavBtn).toBeVisible({ timeout: 10000 });
  });
});
