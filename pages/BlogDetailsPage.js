const { expect } = require('@playwright/test');

/**
 * Page Object Model for Blog Details Page
 */
class BlogDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Blog Details Header & Content
    this.blogTitle = page.locator('h1, h2, h3').first();
    this.blogContent = page.locator('p, article, .blog-content').first();
    this.authorInfo = page.locator('[class*="author"], .text-muted, small').first();
    this.categoryBadge = page.locator('.badge, [class*="category"]').first();

    // Comments Section
    this.commentsSection = page.locator('*:has-text("Comments")').first();
    this.commentInput = page.getByPlaceholder(/write a comment|add a comment|comment/i);
    this.commentSubmitButton = page.getByRole('button', { name: /post|submit|add comment/i });
    this.commentList = page.locator('.comment-item, .list-group-item, [class*="comment"]');
  }

  async verifyBlogDetailsLoaded() {
    await expect(this.blogTitle).toBeVisible({ timeout: 15000 });
    await expect(this.blogContent).toBeVisible({ timeout: 10000 });
  }

  async getBlogTitleText() {
    return await this.blogTitle.innerText();
  }

  async verifyCommentsSectionVisible() {
    await expect(this.commentsSection).toBeVisible({ timeout: 10000 });
  }

  async addComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.commentSubmitButton.click();
    await this.page.waitForTimeout(1500);
  }

  async verifyCommentAppears(commentText) {
    const newComment = this.page.getByText(commentText).first();
    await expect(newComment).toBeVisible({ timeout: 10000 });
  }
}

module.exports = BlogDetailsPage;
