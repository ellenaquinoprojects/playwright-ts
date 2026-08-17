import { test, expect } from '@fixtures/base.fixtures';

test.describe('Estrutura do framework', () => {
  test('deve carregar a página inicial e exibir o heading principal', async ({ examplePage }) => {
    await examplePage.open();
    const heading = await examplePage.getHeadingText();
    expect(heading).toBeTruthy();
  });

  test('deve exibir um título de página válido', async ({ examplePage, page }) => {
    await examplePage.open();
    await expect(page).toHaveTitle(/.+/);
  });
});
