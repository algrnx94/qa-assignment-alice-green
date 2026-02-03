import { test, expect } from '@playwright/test';
import { InventoryPage } from '../page-objects/inventoryPage';

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:3000/')
})

test('add item to inventory UI test', async ({ page }) => {
  const inventoryPage = new InventoryPage(page)
  const itemName = 'Desk'
  await inventoryPage.addItem(itemName, '1000', '20')
  await inventoryPage.expectItemAdded(itemName, '1000', '20')
})

//retreive inventory
test('GET inventory via API', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/inventory')
    expect(res.status()).toBe(200)
    expect(await res.json()).toBeInstanceOf(Array)
})
    
//create invoice
test('POST create invoice via API', async ({ request }) => {
    const res = await request.post('http://localhost:3000/api/invoices', {
    data: { customerName: 'Jane', items: [{ itemId: 1, quantity: 3 }] }
    })
    expect(res.status()).toBe(201)
})

//generate report
test('GET sales report via API', async ({ request }) => {
    const res = await request.get('http://localhost:3000/api/reports/sales')
    expect(res.status()).toBe(200)
 })
