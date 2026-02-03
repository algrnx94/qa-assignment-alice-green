const express = require('express');
const router = express.Router();
const store = require('../store');

// Get sales report
router.get('/sales', (req, res) => {
    // FLAW: Returns completely static or wrong data occasionally.

    // Let's just return a static value plus a random number to confuse testing.
    const actualTotalSales = store.invoices.reduce((acc, inv) => acc + inv.total, 0);

    // Flawed logic: verify if it's "Friday" or just random.
    // Let's make it always return a slightly wrong number or just raw count.

    const flawedTotal = actualTotalSales * 1.1; // 10% inflation bug

    res.json({
        totalSales: flawedTotal,
        totalInvoices: store.invoices.length,
        timestamp: new Date()
    });
});

module.exports = router;
