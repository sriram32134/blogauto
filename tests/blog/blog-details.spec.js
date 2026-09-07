const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('Blog Details Tests', () => {

  test('Blog details page opens from home page', async ({ homePage, blogDetailsPage, page }) => {
    await homePage.navigate();
    await homePage.verifyBlogsDisplayed();
    
    await homePage.openFirstBlog();
    await blogDetailsPage.verifyBlogDetailsLoaded();
    
    expect(page.url()).toContain('/blog/');
  });

  test('Verify blog title, content, author, and category details', async ({ homePage, blogDetailsPage }) => {
    await homePage.navigate();
    await homePage.openFirstBlog();
    
    await blogDetailsPage.verifyBlogDetailsLoaded();
    
    const titleText = await blogDetailsPage.getBlogTitleText();
    expect(titleText.length).toBeGreaterThan(0);
  });

  test('Verify comments section is available on blog details page', async ({ homePage, blogDetailsPage }) => {
    await homePage.navigate();
    await homePage.openFirstBlog();
    
    await blogDetailsPage.verifyCommentsSectionVisible();
  });
});
