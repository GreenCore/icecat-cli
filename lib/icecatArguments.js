'use strict';

let argv = require('minimist')(process.argv.slice(2));

const icecatArguments = function () {
    this.argv = argv;
};

icecatArguments.prototype.options = {
    EMPTY: -1,
    SHOWPRODUCT: 1,
    SAVEPRODUCT: 2,
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

    if (Object.keys(argv).length === 3 && typeof this.argv.c !== 'undefined' && typeof this.argv.gtin !== 'undefined') {
        return this.options.SHOWPRODUCT;
    }

    if (Object.keys(argv).length === 4 && typeof this.argv.c !== 'undefined' && typeof this.argv.save !== 'undefined' && typeof this.argv.gtin !== 'undefined') {
        return this.options.SAVEPRODUCT;
    }

    if (Object.keys(argv).length === 2 && typeof this.argv.version !== 'undefined') {
        return this.options.VERSION;
    }

    if (Object.keys(argv).length === 2 && typeof this.argv.help !== 'undefined') {
        return this.options.HELP;
    }
};

module.exports = icecatArguments;