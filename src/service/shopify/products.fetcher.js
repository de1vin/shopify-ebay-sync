'use strict';

const shopify = require('../../lib/shopify');
const Promise = require("bluebird");
const _ = require('lodash');

class ProductsFetcher {
    constructor (queryParams) {
        const defaultQueryParams = {
            limit: 50
        };

        this._queryParams = queryParams
            ? {...defaultQueryParams, ...queryParams}
            : defaultQueryParams
    }

    async fetch() {
        const productsCount = await shopify.product.count(this._queryParams);
        const pagesCount = Math.ceil(productsCount / this._queryParams.limit);
        const productsList = [];

        await Promise.map(_.range(1, pagesCount + 1), async (page) => {
            await shopify.product.list({...this._queryParams, ...{page: page}})
                .then(async (products) => {
                    await Promise.map(products, async (product) => {
                        console.log(product.title);
                        shopify.metafield
                            .list({
                                metafield: { owner_resource: 'product', owner_id: product.id }
                            })
                            .then((metafields) => {
                                product.metafields = metafields;
                                productsList.push(product)
                            })

                    }, {concurrency: 10})
                })
        }, {concurrency: 5});

        return productsList;
    }
}

module.exports = ProductsFetcher;