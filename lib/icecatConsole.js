'use strict';

const inquirer = require('inquirer');
const IcecatConfig = require('./icecatConfig');
const icecatConfig = new IcecatConfig();

const icecatConsole = function () {
}

/**
 *
 */
icecatConsole.prototype.run = function () {
    let _this = this;
    icecatConfig.getIcecatConfig().then(function (config) {
        console.log('Valid Icecat config found.');
        console.log('You can:');
        console.log('- get Icecat product info, run: icecat -c {config-filename} --ean {Product EAN}');
        console.log('- get help, run: icecat --help');
    }).catch(function (err) {
        console.log('No valid Icecat config found.');
        _this.newConfig();
    });
}

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
            }

            if (icecatConfig.saveIcecatConfig(config)) {
                console.log('Config file saved.');
            } else {
                console.log('Config error. No config file saved.');
            }
        } else {
            console.log('No config file saved.');
        }
    });
}

/**
 *
 */
icecatConsole.prototype.help = function () {
    console.log('You can:');
    console.log('- get Icecat product info, run: icecat -c {config-filename} --ean {Product EAN}');
    console.log('- get help, run: icecat --help');
}

module.exports = icecatConsole;