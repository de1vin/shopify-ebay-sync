'use strict';

const config = require('../../config');
const ShopifyAPI = require('shopify-api-node');

module.exports = new ShopifyAPI(config.shopify);
