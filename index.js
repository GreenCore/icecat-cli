#!/usr/bin/env node

/*
 * Icecat CLI
 * MIT Licensed
 */
'use strict';

const fs = require('fs');
const ini = require('ini');
const icecat = require('icecat');
const DisplayProduct = require('./lib/displayProduct');
const IcecatConsole = require('./lib/icecatConsole');
const IcecatArguments = require('./lib/icecatArguments');
const IcecatConfig = require('./lib/icecatConfig');

let icecatConsole = new IcecatConsole();
let icecatArguments = new IcecatArguments();
let icecatConfig = new IcecatConfig();

if (icecatArguments.currentOption() === icecatArguments.options.EMPTY) {
    icecatConsole.run();
} else if (icecatArguments.currentOption() === icecatArguments.options.GETPRODUCT) {
    icecatConfig.getIcecatConfig().then(function (config) {
        const Icecat = new icecat(config.account.username, config.account.password);

        Icecat.openCatalog.getProduct(config.product.defaultLanguage, icecatArguments.argv.ean)
            .then(function (product) {
                let displayProduct = new DisplayProduct();
                displayProduct.display(product);
            });
    }).catch(function () {
        console.log('Invalid product config.');
    });
} else if (icecatArguments.currentOption() === icecatArguments.options.HELP) {
    icecatConsole.help();
} else {
    console.log("Invalid argument(s)");
}