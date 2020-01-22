/*jshint esversion: 6 */

// Import archive with all init configs
require('./config/config');

// Default imports
const express = require('express');
const app = express();

// Routes Import
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`Server ON port:${process.env.PORT}`);
});