# QA Automation Challenge

Welcome to the QA Automation Challenge!

You are joining a team building a **B2B SaaS platform** that supports:
- Invoice creation
- Inventory tracking
- Report generation
- A web UI used daily by operations and finance teams

## The Mission

The developers have handed off this service, but they admit they didn't have much time for testing. Your goal is to create an automated test suite to ensure the quality of this application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:3000`.

## API Documentation

- `GET /api/inventory`: List all items
- `POST /api/inventory`: Add a new item (`{ name, price, stock }`)
- `POST /api/invoices`: Create an invoice (`{ customerName, items: [{ itemId, quantity }] }`)
- `GET /api/invoices/:id`: Get invoice by ID
- `GET /api/reports/sales`: Get sales report

## The Challenge

1. **Explore**: Run the application and understand how it works.
2. **Automate**: Create a test automation framework using your preferred tools (e.g., Selenium, Cypress, Playwright, Jest, Supertest, etc.).
3. **Cover**: Write tests for:
   - API endpoints (positive and negative scenarios).
   - UI workflows (adding items, creating invoices).
4. **Report**: If you find bugs, document them clearly or create valid bug reports in your framework's output.

Good luck!
