'use strict';

const fs = require('fs');
const https = require('https');
const ProgressBar = require('progress');

const exportXML = function () {
};

/**
 * @param product
 */
exportXML.prototype.save = function (auth) {
    saveXML(auth);
};

/**
 * @param httpRequestUrl
 * @param localPath
 */
function fetchUrl(httpRequestUrl, localPath) {
    https.get(httpRequestUrl, function (response) {
        let body = '';

        let len = parseInt(response.headers['content-length'], 10) / 1024;

        let bar = new ProgressBar('  Downloading [:bar] :rate Kb/s :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
        });

        console.log('Start downloading export to: \n ' + localPath);
        response.setEncoding('binary');

        response.on('data', function (chunk) {
            body += chunk;
            bar.tick(chunk.length / 1024);
        });
        response.on('end', function () {
            fs.writeFile(localPath, body, 'binary', function (err) {
                if (err) throw err;
                console.log('\n');
                console.log('Successfully downloaded file: \n ' + localPath);
            });
        });
    });
}

/**
 *
 * @param product
 */
function saveXML(auth) {
    let exportXMLPath = process.cwd() + '/export.xml';
    let exportXMLUrl = 'https://' + auth + '@data.icecat.biz/export/freexml.int/EN/';

    fetchUrl(exportXMLUrl, exportXMLPath);
}

module.exports = exportXML;