const { test, expect } = require('../../fixtures/test-fixtures');
const { getAdminCredentials } = require('../../utils/authHelper');

test.describe('Admin Dashboard Workflows', () => {
  const adminCreds = getAdminCredentials();

  test.beforeEach(async ({ adminLoginPage }) => {
    await adminLoginPage.login(adminCreds.email, adminCreds.password);
    await adminLoginPage.verifyAdminLoginSuccess();
  });

  test('Admin can access Admin Dashboard overview', async ({ adminPage }) => {
    await adminPage.verifyAdminDashboardLoaded();
  });

  test('Admin can navigate through Manage Posts section', async ({ adminPage, page }) => {
    await adminPage.navigateToManagePosts();
    expect(page.url()).toContain('/admin');
  });

  test('Admin can navigate through Manage Users section', async ({ adminPage, page }) => {
    await adminPage.navigateToManageUsers();
    expect(page.url()).toContain('/admin');
  });
});
