#!/usr/bin/env node

/*
 * Icecat CLI
 * MIT Licensed
 */
'use strict';

const fs = require('fs');
const ini = require('ini');
const Table = require('cli-table');

const icecat = require('icecat');

let argv = require('minimist')(process.argv.slice(2));

let configfilePath = argv.c;
let productEAN = argv.ean;

let config = ini.parse(fs.readFileSync(__dirname + '/' + configfilePath, 'utf-8'))

const Icecat = new icecat(config.account.user, config.account.password);

Icecat.openCatalog.getProduct(config.product.language, productEAN).then(function (product) {

    if (product.getReturnCode() == product.returnCode.SUCCESS) {
        showTable(product);
    } else {
        console.log('Product data not found.');
    }
});

/**
 *
 * @param product
 */
function showTable(product) {

    let terminalWidth = process.stdout.columns;
    const colAWidth = 30;
    let colBWidth = terminalWidth - colAWidth - 10;

    if (colBWidth < colAWidth)
    {
        colBWidth = 30;
    }

    let table = new Table({
        head: ['Type', 'Value']
        , colWidths: [colAWidth, colBWidth]
    });

    table.push(
        ['Name: ', product.getName()],
        ['Release: ', product.getReleaseDate()],
        ['Supplier: ', product.getSupplier()],
        ['Category: ', product.getCategory()],
        ['Short Description: ', product.getShortDescription()],
        ['Product Url: ', product.getProductUrl()],
        ['Manual PDF Url: ', product.getProductManualPDFurl()],
        ['Product Info PDF Url: ', product.getProductInfoPDFurl()]
    );

    console.log(table.toString());
}