const { expect } = require('@playwright/test');

/**
 * Page Object Model for User Login Page / Modal
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Nav & Login Modal Elements
    this.navLoginButton = page.getByRole('button', { name: /Login \/ Register/i }).first();
    this.loginHeading = page.getByRole('heading', { name: /Welcome Back!/i });

    // Inputs & Action Buttons
    this.emailInput = page.getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Login', exact: true });
    this.adminLinkButton = page.getByRole('button', { name: /Are you the Admin\?/i });

    // Post-Login UI Elements
    this.userProfileDropdown = page.locator('a.dropdown-toggle').filter({ hasText: /Hello,/i }).first();
    this.logoutButton = page.locator('button.dropdown-item').filter({ hasText: /Logout/i }).first();
    
    // Feedback Messages
    this.alertMessage = page.locator('.alert-danger, .alert, .error-message').first();
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    if (await this.userProfileDropdown.isVisible()) {
      await this.logout();
    }
    if (await this.navLoginButton.isVisible()) {
      await this.navLoginButton.click();
    }
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
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
    await this.clickLogin();
  }

  async goToAdminLogin() {
    await this.navigate();
    if (await this.adminLinkButton.isVisible()) {
      await this.adminLinkButton.click();
    }
  }

  async verifyLoginSuccess() {
    await expect(this.userProfileDropdown).toBeVisible({ timeout: 15000 });
  }

  async verifyLoginFailure() {
    await expect(this.submitButton).toBeVisible({ timeout: 10000 });
  }

  async logout() {
    if (await this.userProfileDropdown.isVisible()) {
      await this.userProfileDropdown.click();
      await expect(this.logoutButton).toBeVisible({ timeout: 5000 });
      await this.logoutButton.click();
    }
  }
}

module.exports = LoginPage;
