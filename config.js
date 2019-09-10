'use strict';

require('dotenv').config();
const path = require('path');

const shopifyOutputDir = path.resolve(__dirname, './var/shopify');

const config = {
    shopify: {
        shopName: process.env.SHOPIFY_NAME,
        apiKey: process.env.SHOPIFY_API_KEY,
        password: process.env.SHOPIFY_PASSWORD,
        autoLimit: true
    },
    shopifyOutputDir
};

module.exports = config;