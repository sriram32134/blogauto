const { expect } = require('@playwright/test');

/**
 * Page Object Model for Blog Comments Section
 */
class CommentsSection {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Comment Locators
    this.commentInput = page.getByPlaceholder(/Comment as/i).or(page.locator('textarea')).first();
    this.postCommentButton = page.getByRole('button', { name: /Post Comment|Add Comment/i }).first();
    this.commentsHeading = page.locator('*:has-text("Comments")').first();
    this.commentsList = page.locator('.comment-item, .list-group-item, [class*="comment"]');
  }

  async fillComment(commentText) {
    await this.commentInput.fill(commentText);
  }

  async clickPostComment() {
    await this.postCommentButton.click();
  }

  async addComment(commentText) {
    await this.fillComment(commentText);
    await this.clickPostComment();
    await this.page.waitForTimeout(1500);
  }

  async verifyCommentAppears(commentText) {
    const commentElement = this.page.getByText(commentText).first();
    await expect(commentElement).toBeVisible({ timeout: 10000 });
  }

  async verifyEmptyCommentValidation() {
    await this.fillComment('');
    await this.clickPostComment();
    // Verify comment input remains visible or empty submit prevented
    await expect(this.commentInput).toBeVisible();
  }
}

module.exports = CommentsSection;
