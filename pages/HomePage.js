const { expect } = require('@playwright/test');

/**
 * Page Object Model for Home / Blog Discovery Page
 */
class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Navigation Links
    this.brandLogo = page.locator('nav').getByRole('link', { name: /Global Blog Hub/i }).first();
    this.homeNavBtn = page.locator('nav').getByRole('link', { name: 'Home' }).first();
    this.popularBlogsNavBtn = page.getByRole('link', { name: /Popular Blogs/i }).first();
    this.categoriesNavDropdown = page.locator('nav').getByRole('link', { name: /Categories/i }).or(page.getByText('Categories')).first();

    // Search Component
    this.searchInput = page.getByPlaceholder(/Search by title, topic, or author/i);
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });

    // Blog Items & Category Badges
    this.latestArticlesTab = page.getByRole('button', { name: /Latest Articles/i }).or(page.getByText('Latest Articles')).first();
    this.blogCards = page.locator('a[href*="/blog/"]').or(page.locator('.card a'));
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.switchToLatestArticlesTab();
  }

  async switchToLatestArticlesTab() {
    if (await this.latestArticlesTab.isVisible()) {
      await this.latestArticlesTab.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyHomePageLoaded() {
    await expect(this.brandLogo).toBeVisible({ timeout: 10000 });
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  }

  async verifyBlogsDisplayed() {
    await this.switchToLatestArticlesTab();
    await expect(this.blogCards.first()).toBeVisible({ timeout: 20000 });
    const count = await this.blogCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async navigateToPopularBlogs() {
    await this.popularBlogsNavBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    expect(this.page.url()).toContain('/popular');
  }

  async searchBlog(query) {
    await this.switchToLatestArticlesTab();
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForTimeout(1500);
  }

  async selectCategory(categoryName) {
    await this.switchToLatestArticlesTab();
    const directBadge = this.page.locator(`a[href*="category=${categoryName}"]`).or(this.page.getByRole('link', { name: categoryName, exact: true }));
    if (await directBadge.first().isVisible()) {
      await directBadge.first().click();
    } else {
      if (await this.categoriesNavDropdown.isVisible()) {
        await this.categoriesNavDropdown.click();
        await this.page.waitForTimeout(500);
      }
      await this.page.getByRole('link', { name: categoryName }).first().click();
    }
    await this.page.waitForTimeout(1500);
  }

  async openFirstBlog() {
    await this.navigate();
    await this.switchToLatestArticlesTab();
    await this.page.waitForTimeout(1000);
    await expect(this.blogCards.first()).toBeVisible({ timeout: 20000 });
    await this.blogCards.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = HomePage;
