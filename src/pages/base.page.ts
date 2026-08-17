import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async click(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
