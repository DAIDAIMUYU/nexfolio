import { expect, test } from '@playwright/test';

test('main navigation opens the NexFolio pages without Tavern coupling', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '个人数字平台', exact: true })).toBeVisible();
  await expect(page.getByText('持续构建中的个人数字平台')).toBeVisible();

  const menuButton = page.getByRole('button', { name: '菜单' });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '项目', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: '项目作品' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '博客', exact: true }).click();
  await expect(page.getByRole('heading', { name: '博客记录' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '工具', exact: true }).click();
  await expect(page.getByRole('heading', { name: '工具入口' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '关于', exact: true }).click();
  await expect(page.getByRole('heading', { name: '关于我' })).toBeVisible();

  await page.goto('/roleplay');
  await expect(page.getByRole('heading', { name: '页面没有找到' })).toBeVisible();
});

test('deep routes and public SEO files are reachable locally', async ({ page }) => {
  const routes = [
    '/',
    '/projects',
    '/projects/nexfolio',
    '/blog',
    '/blog/testing-from-day-one',
    '/tools',
    '/about',
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('#root')).toBeVisible();
  }

  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap: https://nexfolio-one.vercel.app/sitemap.xml');

  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('https://nexfolio-one.vercel.app/blog/testing-from-day-one');
});

test('empty public content states render without local cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '暂未发布内容' }).first()).toBeVisible();

  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: '暂无项目' })).toBeVisible();

  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: '暂无文章' })).toBeVisible();

  await page.goto('/tools');
  await expect(page.getByRole('heading', { name: '暂无工具' })).toBeVisible();
});

test('studio login works with or without Supabase env vars', async ({ page }) => {
  await page.goto('/studio/login');
  await expect(page.getByRole('heading', { name: /Supabase 未配置|站主登录/ })).toBeVisible();

  await page.goto('/studio');
  await expect(page).toHaveURL(/\/studio\/login$/);
  await expect(page.getByRole('heading', { name: /Supabase 未配置|站主登录/ })).toBeVisible();
});

test('mobile navigation uses a compact menu and layout stays within viewport', async ({ page }) => {
  for (const width of [390, 430, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(width);
    await expect(page.getByRole('button', { name: '菜单' })).toBeVisible();
  }

  await page.getByRole('button', { name: '菜单' }).click();
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();
  await expect(page.getByRole('link', { name: '项目', exact: true })).toBeVisible();
});
