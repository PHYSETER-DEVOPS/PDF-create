/*jshint esversion: 6 */

// Default imports
const express = require('express');
const app = express();
// CORS
const cors = require('cors');
app.use(cors({ origin: '*' }));


// Routes
app.use(require('./pdf.routes'));

module.exports = app;