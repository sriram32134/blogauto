const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');

test.describe('Blog Management / CRUD Tests', () => {
  const userCreds = getUserCredentials();

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(userCreds.email, userCreds.password);
    await loginPage.verifyLoginSuccess();
  });

  test('User cannot submit blog creation form with required fields missing', async ({ blogEditorPage }) => {
    await blogEditorPage.verifyValidationOnEmptySubmit();
  });

  test('User can create a new blog post', async ({ blogEditorPage }) => {
    const timestamp = Date.now();
    const blogData = {
      title: `Playwright Automation Test Blog ${timestamp}`,
      subtitle: 'Automated Test Subtitle',
      category: 'Development',
      content: 'Automated test blog content created using Playwright.',
    };

    await blogEditorPage.createBlog(blogData);
    await blogEditorPage.verifyBlogExists(blogData.title);
  });

  test('User can edit an existing blog post', async ({ blogEditorPage, page }) => {
    const timestamp = Date.now();
    const initialTitle = `Playwright Test Blog To Edit ${timestamp}`;
    const updatedTitle = `Playwright Test Blog To Edit ${timestamp} - Updated`;

    await blogEditorPage.createBlog({
      title: initialTitle,
      subtitle: 'Initial Subtitle',
      category: 'Tech',
      content: 'Initial blog content for editing test.',
    });

    // Verify edit workflow interactability
    await blogEditorPage.editBlog(initialTitle, updatedTitle, 'Updated blog content by Playwright.');
    expect(page.url()).toContain('/dashboard');
  });

  test('User can delete their blog post', async ({ blogEditorPage, page }) => {
    const timestamp = Date.now();
    const titleToDelete = `Playwright Test Blog To Delete ${timestamp}`;

    await blogEditorPage.createBlog({
      title: titleToDelete,
      subtitle: 'Subtitle To Delete',
      category: 'AI',
      content: 'Content to be deleted by Playwright.',
    });

    await blogEditorPage.deleteBlog(titleToDelete);
    expect(page.url()).toContain('/dashboard');
  });
});
