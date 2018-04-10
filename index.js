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
const IcecatArguments = require('./lib/icecatArguments');
const IcecatConfig = require('./lib/icecatConfig');

let icecatConsole = new IcecatConsole();
let icecatArguments = new IcecatArguments();
let icecatConfig = new IcecatConfig();

if (icecatArguments.currentOption() === icecatArguments.options.EMPTY) {
    icecatConsole.run();
} else if (icecatArguments.currentOption() === icecatArguments.options.SHOWPRODUCT) {
    icecatConfig.getIcecatConfig().then(function (config) {
        const Icecat = new icecat(config.account.username, config.account.password);

        Icecat.openCatalog.getProduct(config.product.defaultLanguage, icecatArguments.argv.gtin)
            .then(function (product) {
                let displayProduct = new DisplayProduct();
                displayProduct.display(product);
            });
    }).catch(function () {
        console.log('Invalid product config.');
    });
} else if (icecatArguments.currentOption() === icecatArguments.options.SAVEPRODUCT) {
    icecatConfig.getIcecatConfig().then(function (config) {
        const Icecat = new icecat(config.account.username, config.account.password);

        Icecat.openCatalog.getProduct(config.product.defaultLanguage, icecatArguments.argv.gtin)
            .then(function (product) {
               let saveProduct = new SaveProduct();
               saveProduct.save(product);
            });
    }).catch(function () {
        console.log('Invalid product config.');
    });
} else if (icecatArguments.currentOption() === icecatArguments.options.VERSION) {
    icecatConsole.version();
} else if (icecatArguments.currentOption() === icecatArguments.options.HELP) {
    icecatConsole.help();
} else {
    console.log("Invalid argument(s)");
}