'use strict';

let argv = require('minimist')(process.argv.slice(2));

const icecatArguments = function () {
    this.argv = argv;
};

icecatArguments.prototype.options = {
    EMPTY: -1,
    SHOWPRODUCT: 1,
    SAVEPRODUCT: 2,
    CREATEDOC: 10,
    EXPORTXML: 50,
    VERSION: 80,
    HELP: 99
};

/**
 *
 */
icecatArguments.prototype.currentOption = function () {
    if (Object.keys(argv).length === 1) {
        return this.options.EMPTY;
    }
    if (isShowProduct()) {
        return this.options.SHOWPRODUCT;
    }

    if (isSaveProduct()) {
        return this.options.SAVEPRODUCT;
    }

    if (isCreateProductDoc()) {
        return this.options.CREATEDOC;
    }

    if (isInNumbOfArg([3]) && isConfig() && isExport()) {
        return this.options.EXPORTXML;
    }

    if (isInNumbOfArg([4]) && isConfig() && isExport() && typeof this.argv.lang !== 'undefined') {
        return this.options.EXPORTXML;
    }

    if (isInNumbOfArg([2]) && typeof this.argv.version !== 'undefined') {
        return this.options.VERSION;
    }

    if (isInNumbOfArg([2]) && typeof this.argv.help !== 'undefined') {
        return this.options.HELP;
    }
};

function isInNumbOfArg(nrOfArg) {
    return Boolean(nrOfArg.includes(Object.keys(argv).length));
}

function isConfig() {
    return typeof argv.c !== 'undefined';
}

function isSave() {
    return typeof argv.save !== 'undefined'
}

function isExport() {
    return typeof argv.export !== 'undefined'
}

function isProductId() {
    return (typeof argv.gtin !== 'undefined' || typeof argv.id !== 'undefined' ||
        (typeof argv.brand !== 'undefined' && typeof argv.sku !== 'undefined'))
}

function isShowProduct() {
    return isInNumbOfArg([2, 3, 4]) && isConfig() && isProductId() && !isSave()
}

function isSaveProduct() {
    return isInNumbOfArg([3, 4, 5]) && isConfig() && isProductId() && isSave()
}

function isCreateProductDoc() {
    return typeof argv.doc !== 'undefined'
}

module.exports = icecatArguments;