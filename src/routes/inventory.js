const express = require('express');
const router = express.Router();
const store = require('../store');

// Get all inventory items
router.get('/', (req, res) => {
    res.json(store.items);
});

// Add a new inventory item
router.post('/', (req, res) => {
    const { name, price, stock } = req.body;

    // FLAW: No validation on unique names.
    // FLAW: Allows creating items with negative price.

    const newItem = {
        id: store.items.length + 1,
        name,
        price,
        stock
    };

    store.items.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;
