'use strict';

let argv = require('minimist')(process.argv.slice(2));

const icecatArguments = function () {
    this.argv = argv;
}

icecatArguments.prototype.options = {
    EMPTY: -1,
    GETPRODUCT: 1,
    HELP: 99
}

/**
 *
 */
icecatArguments.prototype.currentOption = function () {
    if (Object.keys(argv).length === 1) {
        return this.options.EMPTY;
    }

    if (Object.keys(argv).length === 3 && typeof this.argv.c !== 'undefined' && typeof this.argv.ean !== 'undefined') {
        return this.options.GETPRODUCT;
    }

    if (Object.keys(argv).length === 2 && typeof this.argv.help !== 'undefined') {
        return this.options.HELP;
    }
}

module.exports = icecatArguments;