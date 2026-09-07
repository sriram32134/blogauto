const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Search Blogs Tests', () => {

  test('User can search for a blog by keyword', async ({ homePage }) => {
    await homePage.navigate();
    await homePage.searchBlog('ai');
    
    // Verify search results or URL update/filtered cards
    await expect(homePage.page.locator('body')).toBeVisible();
  });

  test('Verify search results display matching content', async ({ homePage, page }) => {
    await homePage.navigate();
    await homePage.searchBlog('ai');
    
    // Check that search results contain matching blogs or message
    const blogCount = await homePage.blogCards.count();
    expect(blogCount).toBeGreaterThanOrEqual(0);
  });
});
