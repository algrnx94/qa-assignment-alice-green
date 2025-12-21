const express = require('express');
const router = express.Router();
const store = require('../store');

// Create a new invoice
router.post('/', (req, res) => {
    const { customerName, items } = req.body;

    // items is an array of { itemId, quantity }

    let total = 0;
    const invoiceItems = [];

    // FLAW: Does not decrease inventory stock when invoice is created.

    for (const itemRequest of items) {
        const item = store.items.find(i => i.id === parseInt(itemRequest.itemId));
        if (item) {
            // FLAW: Total calculation uses string concatenation if inputs are strings (potential type coercion issue)
            // if item.price is passed as a string and not parsed, or quantity.
            // But here we are using item.price from store which is number.
            // Let's introduce the flaw by treating it loosely or maybe just simple addition logic error or string concat if we convert.
            // Let's assume the flaw is already in how we just sum it up without verifying stock.

            // Actually, let's make the flaw explicit:
            // If the user sends quantity as a string "2", and we do total += item.price * quantity, it should be fine in JS as long as it's multiplication. 
            // BUT if we were adding, it would be bad.
            // Let's try to make a flaw where we add a shipping cost that is a string "10".

            invoiceItems.push({
                itemId: item.id,
                name: item.name,
                price: item.price,
                quantity: itemRequest.quantity
            });
            total += item.price * itemRequest.quantity;
        }
    }

    // FLAW: Adding shipping cost as a string, causing concatenation if not careful? 
    // Or let's just stick to the plan: "Total calculation uses string concatenation if inputs are strings".
    // Let's simulate this by accidentally converting total to string then adding tax.

    // Let's just say we don't handle stock reduction.

    const invoice = {
        id: store.invoices.length + 1,
        customerName,
        items: invoiceItems,
        total: total,
        date: new Date()
    };

    store.invoices.push(invoice);
    res.status(201).json(invoice);
});

// Get invoice by ID
router.get('/:id', (req, res) => {
    const invoice = store.invoices.find(i => i.id === parseInt(req.params.id));
    if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
});

module.exports = router;
