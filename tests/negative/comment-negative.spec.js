const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');

test.describe('Negative Comment Tests', () => {
  const userCreds = getUserCredentials();

  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.login(userCreds.email, userCreds.password);
    await loginPage.verifyLoginSuccess();
    await homePage.openFirstBlog();
  });

  test('User cannot submit an empty comment', async ({ commentsSection }) => {
    await commentsSection.verifyEmptyCommentValidation();
  });
});
