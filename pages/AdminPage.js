const { expect } = require('@playwright/test');

/**
 * Page Object Model for Admin Dashboard & Management Workflows
 */
class AdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Headings & Cards
    this.adminOverviewHeading = page.locator('*:has-text("Admin Overview")').first();
    this.topLikedBlogsHeading = page.locator('*:has-text("Top Liked Blogs")').first();

    // Management Action Buttons
    this.manageUsersButton = page.getByRole('button', { name: /Manage Users/i }).or(page.getByText('Manage Users')).first();
    this.managePostsButton = page.getByRole('button', { name: /Manage Posts/i }).or(page.getByText('Manage Posts')).first();
    this.reviewReportsButton = page.getByRole('button', { name: /Review Reports/i }).or(page.getByText('Review Reports')).first();
  }

  async openAdminDashboard() {
    if (!this.page.url().includes('/admin')) {
      await this.page.goto('/admin');
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async verifyAdminDashboardLoaded() {
    await this.openAdminDashboard();
    await expect(this.adminOverviewHeading).toBeVisible({ timeout: 10000 });
  }

  async navigateToManagePosts() {
    await this.openAdminDashboard();
    if (await this.managePostsButton.isVisible()) {
      await this.managePostsButton.click();
      await this.page.waitForTimeout(1500);
    }
  }

  async navigateToManageUsers() {
    await this.openAdminDashboard();
    if (await this.manageUsersButton.isVisible()) {
      await this.manageUsersButton.click();
      await this.page.waitForTimeout(1500);
    }
  }
}

module.exports = AdminPage;
