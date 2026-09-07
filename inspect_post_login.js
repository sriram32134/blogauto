const { test, expect } = require('@playwright/test');
const { getUserCredentials, getAdminCredentials } = require('./utils/authHelper');

test('Inspect post login navbar and profile elements', async ({ page }) => {
  const userCreds = getUserCredentials();

  await page.goto('/');
  await page.getByRole('button', { name: /Login \/ Register/i }).first().click();
  await page.getByPlaceholder('Email Address').fill(userCreds.email);
  await page.getByPlaceholder('Password').fill(userCreds.password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Wait 3 seconds for login response
  await page.waitForTimeout(3000);

  console.log('=== User Post-Login URL ===');
  console.log(page.url());

  console.log('=== User Post-Login Nav Buttons & Elements ===');
  const allButtons = await page.locator('nav button, header button, .navbar button, button').all();
  for (const btn of allButtons) {
    const text = (await btn.innerText()).replace(/\s+/g, ' ');
    const cls = await btn.getAttribute('class');
    const isVis = await btn.isVisible();
    console.log(`Button text="${text}" visible=${isVis} class="${cls}"`);
  }

  console.log('=== User Post-Login Links ===');
  const allLinks = await page.locator('nav a, header a, .navbar a').all();
  for (const link of allLinks) {
    const text = (await link.innerText()).replace(/\s+/g, ' ');
    const href = await link.getAttribute('href');
    console.log(`Link text="${text}" href="${href}"`);
  }
});
