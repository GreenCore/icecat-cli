#!/usr/bin/env node

/*
 * Icecat CLI
 * MIT Licensed
 */
'use strict';

const icecat = require('icecat');
const SaveProduct = require('./lib/saveProduct');
const DisplayProduct = require('./lib/displayProduct');
const IcecatConsole = require('./lib/icecatConsole');
const ExportXML = require('./lib/exportXML');
const IcecatArguments = require('./lib/icecatArguments');
const IcecatConfig = require('./lib/icecatConfig');

let icecatConsole = new IcecatConsole();
let icecatArguments = new IcecatArguments();
let exportXML = new ExportXML();
let icecatConfig = new IcecatConfig();

const currentOption = icecatArguments.currentOption();

if (currentOption === icecatArguments.options.EMPTY) {
    icecatConsole.run();
} else if (currentOption === icecatArguments.options.SHOWPRODUCT) {
    icecatConfig.getIcecatConfig().then(function (config) {
        const Icecat = new icecat(config.account.username, config.account.password);

        if (typeof icecatArguments.argv.gtin === 'number' && icecatArguments.argv.gtin >= 10000000) {
            Icecat.openCatalog.getProduct(config.product.defaultLanguage, icecatArguments.argv.gtin)
                .then(function (product) {
                    let displayProduct = new DisplayProduct();
                    displayProduct.display(product);
                });
        } else if (typeof icecatArguments.argv.id === 'number' && icecatArguments.argv.id > 0) {
            Icecat.openCatalog.getProductById(config.product.defaultLanguage, icecatArguments.argv.id)
                .then(function (product) {
                    let displayProduct = new DisplayProduct();
                    displayProduct.display(product);
                });
        } else if (icecatArguments.argv.brand !== "" && icecatArguments.argv.sku !== "") {
            Icecat.openCatalog.getProductBySKU(config.product.defaultLanguage, icecatArguments.argv.brand, icecatArguments.argv.sku)
                .then(function (product) {
                    let displayProduct = new DisplayProduct();
                    displayProduct.display(product);
                });
        }
    }).catch(function () {
        console.log('Invalid product config.');
    });
} else if (currentOption === icecatArguments.options.SAVEPRODUCT) {
    icecatConfig.getIcecatConfig().then(function (config) {
        const Icecat = new icecat(config.account.username, config.account.password);
        if (typeof icecatArguments.argv.gtin === 'number' && icecatArguments.argv.gtin >= 10000000) {
            Icecat.openCatalog.getProduct(config.product.defaultLanguage, icecatArguments.argv.gtin)
                .then(function (product) {
                    let saveProduct = new SaveProduct();
                    saveProduct.save(product);
                });
        } else if (typeof icecatArguments.argv.id === 'number' && icecatArguments.argv.id > 0) {
            Icecat.openCatalog.getProductById(config.product.defaultLanguage, icecatArguments.argv.id)
                .then(function (product) {
                    let saveProduct = new SaveProduct();
                    saveProduct.save(product);
                });
        } else if (icecatArguments.argv.brand !== "" && icecatArguments.argv.sku !== "") {
            Icecat.openCatalog.getProductBySKU(config.product.defaultLanguage, icecatArguments.argv.brand, icecatArguments.argv.sku)
                .then(function (product) {
                    let saveProduct = new SaveProduct();
                    saveProduct.save(product);
                });
        }
    }).catch(function () {
        console.log('Invalid product config.');
    });
} else if (currentOption === icecatArguments.options.EXPORTXML) {
    icecatConfig.getIcecatConfig().then(function (config) {
        let auth = encodeURIComponent(config.account.username) + ':' + encodeURIComponent(config.account.password);
        let exportLang = 'EN';
        if (typeof icecatArguments.argv.lang !== 'undefined') {
            exportLang = icecatArguments.argv.lang;
        }
        exportXML.save(auth, exportLang);
    }).catch(function (err) {
        if (err) throw err;
        console.log('Invalid product config.');
    });
} else if (currentOption === icecatArguments.options.VERSION) {
    icecatConsole.version();
} else if (currentOption === icecatArguments.options.HELP) {
    icecatConsole.help();
} else {
    console.log("Invalid argument(s)");
}