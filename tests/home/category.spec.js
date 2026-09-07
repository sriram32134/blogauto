const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Category Filter Tests', () => {

  test('User can select category filter - Development', async ({ homePage, page }) => {
    await homePage.navigate();
    await homePage.selectCategory('Development');
    
    // Verify URL or filtered results update
    expect(page.url()).toMatch(/category=Development|\/category/i);
  });

  test('User can select category filter - AI', async ({ homePage, page }) => {
    await homePage.navigate();
    await homePage.selectCategory('AI');
    
    expect(page.url()).toMatch(/category=AI|\/category/i);
  });
});
