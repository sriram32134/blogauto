const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Home Page & Blog Discovery Tests', () => {

  test('Home page loads successfully', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.verifyHomePageLoaded();
  });

  test('Blogs are displayed on the home page', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.verifyBlogsDisplayed();
  });

  test('Popular Blogs navigation works', async ({ homePage, page }) => {
    await homePage.navigate();
    await homePage.navigateToPopularBlogs();
    await expect(page).toHaveURL(/.*popular/);
  });
});
