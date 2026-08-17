// Modelo de referência: duplique este arquivo para cada nova página (ex: login.page.ts).
import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  private readonly heading = this.page.getByRole('heading', { level: 1 });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async getHeadingText(): Promise<string | null> {
    await this.waitForVisible(this.heading);
    return this.heading.textContent();
  }
}
