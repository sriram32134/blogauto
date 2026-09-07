const { test, expect } = require('../../fixtures/test-fixtures');
const { getUserCredentials } = require('../../utils/authHelper');

test.describe('Negative Blog Creation Tests', () => {
  const userCreds = getUserCredentials();

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(userCreds.email, userCreds.password);
    await loginPage.verifyLoginSuccess();
  });

  test('User cannot submit blog post with required fields missing', async ({ blogEditorPage }) => {
    await blogEditorPage.verifyValidationOnEmptySubmit();
  });
});
