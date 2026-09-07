const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');

test.describe('Blog Comments Tests', () => {
  const userCreds = getUserCredentials();

  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.login(userCreds.email, userCreds.password);
    await loginPage.verifyLoginSuccess();
    await homePage.openFirstBlog();
  });

  test('User can add a valid comment to a blog post', async ({ commentsSection }) => {
    const timestamp = Date.now();
    const commentText = `Automated test comment ${timestamp}`;

    await commentsSection.addComment(commentText);
    await commentsSection.verifyCommentAppears(commentText);
  });

  test('User cannot post an empty comment', async ({ commentsSection }) => {
    await commentsSection.verifyEmptyCommentValidation();
  });
});
