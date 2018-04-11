'use strict';

const Table = require('cli-table');

const displayProduct = function () {
};

/**
 * @param product
 */
displayProduct.prototype.display = function (product) {
    if (product.getReturnCode() === product.returnCode.SUCCESS) {
        showTable(product);
    } else {
        console.log('Product data not found.');
    }
};

/**
 *
 * @param product
 */
function showTable(product) {

    let terminalWidth = process.stdout.columns;
    const colAWidth = 30;
    let colBWidth = terminalWidth - colAWidth - 10;

    if (colBWidth < colAWidth) {
        colBWidth = 30;
    }

    let table = new Table({
        head: ['Type', 'Value']
        , colWidths: [colAWidth, colBWidth]
    });

    table.push(
        ['Name: ', product.getName()],
        ['Icecat Product Id: ', product.getID()],
        ['EAN: ', product.getEan()],
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

module.exports = displayProduct;