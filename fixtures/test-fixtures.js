const { test: base } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const AdminLoginPage = require('../pages/AdminLoginPage');
const HomePage = require('../pages/HomePage');
const BlogDetailsPage = require('../pages/BlogDetailsPage');
const BlogEditorPage = require('../pages/BlogEditorPage');
const CommentsSection = require('../pages/CommentsSection');
const AdminPage = require('../pages/AdminPage');

/**
 * Custom Playwright test fixtures providing pre-configured Page Objects
 */
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  adminLoginPage: async ({ page }, use) => {
    const adminLoginPage = new AdminLoginPage(page);
    await use(adminLoginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  blogDetailsPage: async ({ page }, use) => {
    const blogDetailsPage = new BlogDetailsPage(page);
    await use(blogDetailsPage);
  },
  blogEditorPage: async ({ page }, use) => {
    const blogEditorPage = new BlogEditorPage(page);
    await use(blogEditorPage);
  },
  commentsSection: async ({ page }, use) => {
    const commentsSection = new CommentsSection(page);
    await use(commentsSection);
  },
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
