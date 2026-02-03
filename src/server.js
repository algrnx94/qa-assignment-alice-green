const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const inventoryRoutes = require('./routes/inventory');
const invoiceRoutes = require('./routes/invoices');
const reportRoutes = require('./routes/reports');

app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`QA Challenge App running at http://localhost:${port}`);
});
