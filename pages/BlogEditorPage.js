const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Page Object Model for Blog Creation & Management (CRUD)
 */
class BlogEditorPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Dashboard & Navigation
    this.userProfileDropdown = page.locator('a.dropdown-toggle').filter({ hasText: /Hello,/i }).first();
    this.mySpaceLink = page.locator('a[href="/dashboard"], a.dropdown-item:has-text("My Space")').first();
    this.createBlogButton = page.getByRole('button', { name: /Create New Content/i }).or(page.getByText('Create New Content')).first();

    // Form Fields
    this.titleInput = page.locator('input[name="title"]');
    this.subtitleInput = page.locator('input[name="subtitle"]');
    this.categorySelect = page.locator('select[name="category"]');
    this.coverImageInput = page.locator('input[name="coverImage"], input[type="file"]').first();
    this.contentEditor = page.locator('.ql-editor');
    this.publishButton = page.locator('form button[type="submit"], .modal button[type="submit"]').or(page.getByRole('button', { name: /Publish|Create/i })).first();
    this.updateButton = page.getByRole('button', { name: /Update|Save|Publish/i }).first();

    // Dashboard Post Cards
    this.postCards = page.locator('.card, article, [class*="card"]');
  }

  async openDashboard() {
    await this.page.goto('/dashboard');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openCreateModal() {
    await this.openDashboard();
    await expect(this.createBlogButton).toBeVisible({ timeout: 10000 });
    await this.createBlogButton.click();
    await expect(this.titleInput).toBeVisible({ timeout: 10000 });
  }

  async fillContent(content) {
    if (content !== undefined && content !== null) {
      const qlEditor = this.page.locator('.ql-editor').first();
      if (await qlEditor.isVisible()) {
        await qlEditor.click();
        await qlEditor.pressSequentially(content, { delay: 10 });
      } else {
        const textarea = this.page.locator('textarea[name="content"], textarea').first();
        if (await textarea.isVisible()) {
          await textarea.fill(content);
        }
      }
    }
  }

  async fillBlogForm({ title, subtitle, category = 'Development', content, coverImage }) {
    if (title !== undefined && title !== null) {
      await this.titleInput.fill(title);
    }
    if (subtitle !== undefined && subtitle !== null) {
      await this.subtitleInput.fill(subtitle);
    }
    if (category) {
      await this.categorySelect.selectOption(category).catch(() => {});
    }
    if (coverImage !== undefined && coverImage !== null) {
      const coverInput = this.page.locator('input[name="coverImage"], input[type="file"]').first();
      if (await coverInput.isVisible()) {
        try {
          await coverInput.fill(coverImage);
        } catch (e) {
          const tempImagePath = path.resolve(__dirname, '../temp_cover_upload.jpg');
          const dummyJpg = Buffer.from(
            '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
            'base64'
          );
          fs.writeFileSync(tempImagePath, dummyJpg);
          await coverInput.setInputFiles(tempImagePath).catch(() => {});
        }
      }
    }
    await this.fillContent(content);
  }

  async createBlog(blogData) {
    await this.openCreateModal();
    await this.fillBlogForm(blogData);
    
    const apiBase = process.env.API_BASE_URL;
    const responsePromise = this.page.waitForResponse(
      res => (apiBase ? res.url().includes(apiBase) : res.url().includes('/api/')) &&
             res.request().method() === 'POST' &&
             res.status() >= 200 && res.status() < 300,
      { timeout: 15000 }
    ).catch(() => null);

    await this.publishButton.click();
    await responsePromise;
    await this.page.waitForLoadState('domcontentloaded');

    // Cleanup temp image if created
    const tempImagePath = path.resolve(__dirname, '../temp_cover_upload.jpg');
    if (fs.existsSync(tempImagePath)) {
      try { fs.unlinkSync(tempImagePath); } catch (e) {}
    }
  }

  async verifyBlogExists(title) {
    await this.openDashboard();
    await this.page.waitForLoadState('domcontentloaded');
    const blogCard = this.postCards.filter({ hasText: title }).first();
    await expect(blogCard).toBeVisible({ timeout: 15000 });
  }

  async editBlog(oldTitle, newTitle, newContent) {
    await this.openDashboard();
    const blogCard = this.postCards.filter({ hasText: oldTitle }).first();
    const editBtn = blogCard.locator('button, a, i').filter({ hasText: /Edit/i }).or(blogCard.locator('.bi-pencil, button:has-text("Edit")')).first();
    
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await this.page.waitForTimeout(1000);
      
      if (newTitle) await this.titleInput.fill(newTitle);
      if (newContent) await this.fillContent(newContent);
      
      await this.updateButton.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async deleteBlog(title) {
    await this.openDashboard();
    const blogCard = this.postCards.filter({ hasText: title }).first();
    const deleteBtn = blogCard.locator('button, a, i').filter({ hasText: /Delete/i }).or(blogCard.locator('.bi-trash, button:has-text("Delete")')).first();

    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      await this.page.waitForTimeout(1000);

      const confirmBtn = this.page.getByRole('button', { name: /Confirm|Yes|Delete/i });
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
        await this.page.waitForTimeout(2000);
      }
    }
  }

  async verifyValidationOnEmptySubmit() {
    await this.openCreateModal();
    await this.publishButton.click();
    await expect(this.titleInput).toBeVisible();
  }
}

module.exports = BlogEditorPage;
