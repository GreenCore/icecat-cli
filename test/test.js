'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;
const IcecatConsole = require('../lib/icecatConsole');

describe('IcecatCLI-console', function () {
    let icecatConsole = new IcecatConsole();

    describe('run console', function () {
        it('should get new config console question', function () {
            icecatConsole.run();
        });

    });


});