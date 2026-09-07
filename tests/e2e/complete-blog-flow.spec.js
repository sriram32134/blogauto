const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');
const sampleBlogs = require('../../test-data/blogs.json');

test.describe('End-to-End Complete Blog Lifecycle Flow', () => {
  const userCreds = getUserCredentials();

  test('Full E2E Flow: Login -> Discover -> Create Blog -> Edit Blog -> Delete Blog -> Logout', async ({
    loginPage,
    homePage,
    blogEditorPage,
    blogDetailsPage,
    page
  }) => {
    const timestamp = Date.now();
    const blogTitle = `E2E Test Blog ${timestamp}`;
    const blogSubtitle = `Automated E2E Lifecycle Testing ${timestamp}`;
    const updatedTitle = `Updated E2E Test Blog ${timestamp}`;
    const blogContent = `This is a comprehensive end-to-end automated test post generated at ${timestamp}.`;

    // Step 1: User Login
    await loginPage.login(userCreds.email, userCreds.password);
    await loginPage.verifyLoginSuccess();

    // Step 2: Home Page & Discovery
    await homePage.verifyHomePageLoaded();
    await homePage.searchBlog('Development');

    // Step 3: Create New Blog Post via Dashboard Modal
    await blogEditorPage.createBlog({
      title: blogTitle,
      subtitle: blogSubtitle,
      category: 'Development',
      content: blogContent
    });

    // Step 4: Verify Created Blog Exists on Dashboard & Open Details
    await blogEditorPage.verifyBlogExists(blogTitle);
    await homePage.navigate();
    await homePage.openFirstBlog();
    await blogDetailsPage.verifyBlogDetailsLoaded();

    // Step 5: Edit the Blog Post via Dashboard
    await blogEditorPage.editBlog(blogTitle, updatedTitle, `${blogContent} (Updated)`);

    // Step 6: Verify Updated Blog Exists
    await blogEditorPage.verifyBlogExists(updatedTitle);

    // Step 7: Clean Up - Delete Created Blog Post
    await blogEditorPage.deleteBlog(updatedTitle);

    // Step 8: Logout
    await loginPage.logout();
  });
});
