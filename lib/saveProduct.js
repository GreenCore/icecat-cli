'use strict';

const fs = require('fs');
const http = require('http');
const mkdirp = require('mkdirp');

const saveProduct = function () {
};

/**
 * @param product
 */
saveProduct.prototype.save = function (product) {
    if (product.getReturnCode() == product.returnCode.SUCCESS) {

        let productDirs = [
            product.getEan(),
            product.getEan() + '/images',
            product.getEan() + '/pdf'
        ];

        for (let i = 0; i < productDirs.length; i++) {
            mkdirp(productDirs[i], function (err) {
                if (err) console.error(err);
            });
        }

        saveProductXML(product);
        saveImages(product)

    } else {
        console.log('Product data not found.');
    }
};

function getUrlFilename(url)
{
    return url.substring(url.lastIndexOf('/'));
}

function saveImages(product) {
    let images = product.getImages();

    for (let i = 0; i < images.length; i++) {
        let imagePath = process.cwd() + '/' + product.getEan() + '/images/' + getUrlFilename(images[i].HighImg);
        fetchImage(images[i].HighImg, imagePath);
    }
}

/**
 * @param httpRequestUrl
 * @param localPath
 */
function fetchImage(httpRequestUrl, localPath) {
    http.get(httpRequestUrl, function (response) {
        let body = '';
        response.setEncoding('binary');

        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            fs.writeFile(localPath, body, 'binary', function(err) {
                if (err) throw err;
                console.log('Successfully downloaded file: ' + httpRequestUrl);
            });
        });
    });
}

/**
 *
 * @param product
 */
function saveProductXML(product) {

    let productXMLPath = process.cwd() + '/' + product.getEan() + '/' + product.getEan() + '.xml';

    fs.writeFile(productXMLPath, product.getXML(), 'utf8', function(err) {
        if (err) throw err
    });
}

module.exports = saveProduct;