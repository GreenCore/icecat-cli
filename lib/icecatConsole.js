'use strict';

const inquirer = require('inquirer');
const IcecatConfig = require('./icecatConfig');
const Icecat = require('icecat');
const icecat = new Icecat(null, null);
const icecatConfig = new IcecatConfig();
const packagejson = require('../package.json');

const icecatConsole = function () {
};

/**
 *
 */
icecatConsole.prototype.run = function () {
    let _this = this;
    icecatConfig.getIcecatConfig().then(function () {
        console.log('Valid Icecat config found.');
        _this.help();
    }).catch(function () {
        console.log('No valid Icecat config found.');
        _this.newConfig();
    });
};

icecatConsole.prototype.newConfig = function () {
    const configQuestions = [
        {
            type: 'input',
            message: 'Enter your Icecat username: ',
            name: 'username'
        },
        {
            type: 'password',
            message: 'Enter your Icecat password: ',
            name: 'password'
        },
        {
            type: 'input',
            message: 'Default Product info language: ',
            name: 'defaultLanguage'
        },
        {
            type: 'confirm',
            name: 'createINI',
            message: 'Save settings to \'' + icecatConfig.getNewConfigFilename() + '\': ',
            default: true
        }
    ];

    inquirer.prompt(configQuestions).then(function (answers) {
        if (answers.createINI) {
            let config = {
                account: {
                    username: answers.username,
                    password: answers.password
                },
                product: {
                    defaultLanguage: answers.defaultLanguage
                }
            };

            if (icecatConfig.saveIcecatConfig(config)) {
                console.log('Config file saved.');
            } else {
                console.log('Config error. No config file saved.');
            }
        } else {
            console.log('No config file saved.');
        }
    });
};

/**
 *
 */
icecatConsole.prototype.version = function () {
    console.log('icecat-cli: ' + packagejson.version);
    console.log('https://www.npmjs.com/package/icecat-cli');
    console.log('');
    console.log('icecat (API): ' + icecat.VERSION);
    console.log('https://www.npmjs.com/package/icecat');
    console.log('');
    console.log('for help, run: icecat --help');
};


/**
 *
 */
icecatConsole.prototype.help = function () {
    const options = [
        {
            descr: 'Show Icecat product info',
            cmd: 'icecat -c {config-filename} --gtin {Product EAN or UPC}'
        },
        {
            descr: 'Save Icecat product info',
            cmd: 'icecat -c {config-filename} --gtin {Product EAN or UPC} --save'
        },
        {
            descr: 'Download full Icecat XML',
            cmd: 'icecat -c {config-filename} --export'
        },
        {
            descr: 'Download full Icecat XML + Select Language',
            cmd: 'icecat -c {config-filename} --export --lang DE'
        },
        {
            descr: 'Get version info',
            cmd: 'icecat --version'
        },
        {
            descr: 'Get help',
            cmd: 'icecat --help'
        }
    ];

    console.log('You can:\n');

    options.forEach(function (option) {
        console.log('- ' + option.descr + ', run:');
        console.log('  ' + option.cmd + '\n');
    });
};

module.exports = icecatConsole;