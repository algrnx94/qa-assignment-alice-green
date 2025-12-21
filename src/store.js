// Simple in-memory data store
const store = {
    items: [
        { id: 1, name: 'Laptop', price: 1200, stock: 10 },
        { id: 2, name: 'Mouse', price: 25, stock: 50 },
        { id: 3, name: 'Monitor', price: 300, stock: 20 }
    ],
    invoices: []
};

module.exports = store;
