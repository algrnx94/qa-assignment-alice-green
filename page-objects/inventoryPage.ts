// pages/InventoryPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly priceInput: Locator
  readonly stockInput: Locator
  readonly addButton: Locator
  readonly rows: Locator

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#itemName');
    this.priceInput = page.locator('#itemPrice');
    this.stockInput = page.locator('#itemStock');
    this.addButton = page.getByRole('button', { name: 'Add Item' });
    this.rows = page.getByRole('row');
  }

  async addItem(name: string, price: string, stock: string) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(price);
    await this.stockInput.fill(stock);
    await this.addButton.click();
  }

  async expectItemAdded(name: string, price: string, stock: string) {
    const row = this.rows.filter({ hasText: name });
    await expect(row.locator('td').nth(1)).toHaveText(name);
    await expect(row.locator('td').nth(2)).toContainText(price);
    await expect(row.locator('td').nth(3)).toHaveText(stock);
  }
}
