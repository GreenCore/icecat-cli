'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;
const IcecatConsole = require('../lib/icecatConsole');

describe('IcecatCLI-console', function () {
    let icecatConsole = new IcecatConsole();

    describe('run console', function () {
        it('should show help info', function () {
            icecatConsole.help();
        });

        it('should show version info', function () {
            icecatConsole.version();
        });

    });


});