import { test, expect } from '@playwright/test';

test('has configuration link', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('p')[0].innerText())
    .toContain('Go to Configurator');
});
