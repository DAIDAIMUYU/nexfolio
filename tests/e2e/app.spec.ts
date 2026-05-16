import { expect, test } from '@playwright/test';

test('main navigation opens first-version pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '个人数字平台', exact: true })).toBeVisible();

  await page.getByRole('link', { name: '项目', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: '项目作品' })).toBeVisible();

  await page.getByRole('link', { name: '博客', exact: true }).click();
  await expect(page.getByRole('heading', { name: '博客记录' })).toBeVisible();

  await page.getByRole('link', { name: '工具', exact: true }).click();
  await expect(page.getByRole('heading', { name: '工具入口' })).toBeVisible();

  await page.getByRole('link', { name: '关于', exact: true }).click();
  await expect(page.getByRole('heading', { name: '关于我' })).toBeVisible();
});

test('project and blog detail pages are reachable', async ({ page }) => {
  await page.goto('/projects');
  await page.getByRole('link', { name: '查看详情' }).first().click();
  await expect(page).toHaveURL(/\/projects\/nexfolio$/);
  await expect(page.getByText('项目背景')).toBeVisible();

  await page.goto('/blog');
  await page.getByRole('link', { name: '阅读全文' }).first().click();
  await expect(page).toHaveURL(/\/blog\/building-personal-platform$/);
  await expect(page.getByText('返回博客列表')).toBeVisible();
});

test('horizontal rails can scroll and mobile layout stays within viewport', async ({ page }) => {
  await page.goto('/');
  const rail = page.getByLabel('精选项目横向滑动');

  await rail.evaluate((element) => {
    element.scrollLeft = 240;
  });
  await expect.poll(async () => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();
});
