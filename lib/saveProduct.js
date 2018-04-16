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
    if (product.getReturnCode() === product.returnCode.SUCCESS) {

        let productDirs = [
            product.getID(),
            product.getID() + '/images',
            product.getID() + '/pdfs'
        ];

        for (let i = 0; i < productDirs.length; i++) {
            mkdirp(productDirs[i], function (err) {
                if (err) console.error(err);
            });
        }

        saveProductXML(product);
        saveImages(product);
        savePDFs(product);

    } else {
        console.log('Product data not found.');
    }
};

function getUrlFilename(url) {
    return url.substring(url.lastIndexOf('/'));
}

/**
 * @param product
 */
function savePDFs(product) {
    let pdfs = [];
    if (product.getProductInfoPDFurl() !== null && product.getProductInfoPDFurl() !== '') pdfs.push(product.getProductInfoPDFurl());
    if (product.getProductManualPDFurl() !== null && product.getProductManualPDFurl() !== '') pdfs.push(product.getProductManualPDFurl());

    for (let i = 0; i < pdfs.length; i++) {
        let pdfPath = process.cwd() + '/' + product.getID() + '/pdfs/' + getUrlFilename(pdfs[i]);
        fetchUrl(pdfs[i], pdfPath);
    }
}

/**
 * @param product
 */
function saveImages(product) {
    let images = product.getImages();

    for (let i = 0; i < images.length; i++) {
        let imagePath = process.cwd() + '/' + product.getID() + '/images/' + getUrlFilename(images[i].HighImg);
        fetchUrl(images[i].HighImg, imagePath);
    }
}

/**
 * @param httpRequestUrl
 * @param localPath
 */
function fetchUrl(httpRequestUrl, localPath) {
    http.get(httpRequestUrl, function (response) {
        let body = '';
        response.setEncoding('binary');

        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            fs.writeFile(localPath, body, 'binary', function (err) {
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

    let productXMLPath = process.cwd() + '/' + product.getID() + '/' + product.getID() + '.xml';

    fs.writeFile(productXMLPath, product.getXML(), 'utf8', function (err) {
        if (err) throw err
        console.log('Created file: ' + productXMLPath);
    });
}

module.exports = saveProduct;