'use strict';

const ini = require('ini');
const fs = require('fs');

const icecatConfig = function () {
}

/**
 *
 * @param config
 * @returns {boolean}
 */
icecatConfig.prototype.validIcecatConfig = function (config) {
    if (typeof config.account.username !== 'undefined' ||
        typeof config.account.password !== 'undefined' ||
        typeof config.product.defaultLanguage !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

/**
 *
 */
icecatConfig.prototype.getIcecatConfig = function () {
    let _this = this;
    return new Promise(
        function (resolve, reject) {
            fs.access(_this.getNewConfigFilename(), fs.constants.R_OK | fs.constants.W_OK, (err) => {
                if (err) {
                    reject(null);
                } else {
                    let config = ini.parse(fs.readFileSync(_this.getNewConfigFilename(), 'utf-8'))
                    if (_this.validIcecatConfig(config)) {
                        resolve(config);
                    } else {
                        reject(null);
                    }
                }
            })
        }
    );
}

/**
 *
 * @returns {string}
 */
icecatConfig.prototype.getNewConfigFilename = function () {
    return process.cwd() + '/config.ini';
}

/**
 *
 * @param config
 * @returns {boolean}
 */
icecatConfig.prototype.saveIcecatConfig = function (config) {
    if (this.validIcecatConfig(config)) {
        fs.writeFileSync(this.getNewConfigFilename(), ini.stringify(config), 'utf-8')
        return true;
    } else {
        return false;
    }
}

module.exports = icecatConfig;