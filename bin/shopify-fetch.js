'use strict';
const fs = require('fs');
const path = require('path');
const config = require('../config');
const ProductsFetcher = require('../src/service/shopify/products.fetcher');

async function process() {
    try {
        const productsFetcher = new ProductsFetcher();
        const products = await productsFetcher.fetch();
        const productsJson = JSON.stringify(products);
        const outputFilename = 'products.json';

        if (!fs.statSync(config.shopifyOutputDir).isDirectory()) {
            fs.mkdirSync(config.shopifyOutputDir);
        }

        fs.writeFileSync(path.resolve(config.shopifyOutputDir, outputFilename), productsJson)
    } catch (e) {
        console.log(e)
    }
}
process();
