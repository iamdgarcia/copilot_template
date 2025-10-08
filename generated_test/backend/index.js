const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ status: 'ok' }));

// Stubbed endpoints from recorded schema
app.get('/api/items', (req, res) => res.json({"items":[{"id":1,"name":"Widget"}],"count":1}));

module.exports = app;
