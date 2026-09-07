const { expect } = require('@playwright/test');

/**
 * Page Object Model for Admin Login Page / Modal
 */
class AdminLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation & Triggers
    this.navLoginButton = page.getByRole('button', { name: /Login \/ Register/i }).first();
    this.adminLinkButton = page.getByRole('button', { name: /Are you the Admin\?/i });
    this.adminHeading = page.getByRole('heading', { name: /Admin Login/i }).first();
    this.backToUserLoginButton = page.getByRole('button', { name: /Back to User Login/i });

    // Form Inputs & Action Buttons
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Admin Login', exact: true });

    // Admin UI Post-Login Indicators
    this.adminProfileDropdown = page.locator('a.dropdown-toggle').filter({ hasText: /Hello,/i }).first();
    this.logoutButton = page.locator('button.dropdown-item').filter({ hasText: /Logout/i }).first();
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    if (await this.adminProfileDropdown.isVisible()) {
      await this.logout();
    }
    if (await this.navLoginButton.isVisible()) {
      await this.navLoginButton.click();
    }
    if (await this.adminLinkButton.isVisible()) {
      await this.adminLinkButton.click();
    }
    await expect(this.submitButton).toBeVisible({ timeout: 10000 });
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickAdminLogin() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.navigate();
    if (email !== undefined && email !== null && email !== '') {
      await this.fillEmail(email);
    }
    if (password !== undefined && password !== null && password !== '') {
      await this.fillPassword(password);
    }
    await this.clickAdminLogin();
  }

  async verifyAdminLoginSuccess() {
    await expect(this.adminProfileDropdown).toBeVisible({ timeout: 15000 });
  }

  async verifyAdminLoginFailure() {
    await expect(this.submitButton).toBeVisible({ timeout: 10000 });
  }

  async logout() {
    if (await this.adminProfileDropdown.isVisible()) {
      await this.adminProfileDropdown.click();
      await expect(this.logoutButton).toBeVisible({ timeout: 5000 });
      await this.logoutButton.click();
    }
  }
}

module.exports = AdminLoginPage;
