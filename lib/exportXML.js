'use strict';

const fs = require('fs');
const https = require('https');
const ProgressBar = require('progress');

const exportXML = function () {
};

/**
 * @param auth
 * @param lang
 */
exportXML.prototype.save = function (auth, lang) {
    saveXML(auth, lang);
};

/**
 * @param httpRequestUrl
 * @param localPath
 */
function fetchUrl(httpRequestUrl, localPath) {
    https.get(httpRequestUrl, function (response) {
        let body = '';

        let len = parseInt(response.headers['content-length'], 10) / 1024;

        if (isNaN(len)) {
            console.log('\n' +
                'The exact XML file size could not be determined based on the information from the Icecat server. \n' +
                'The download size is therefore an estimate. \n ');
            len = 15000;
        }

        let bar = new ProgressBar('  Downloading [:bar] :rate Kb/s :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 40,
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
 * @param auth
 * @param exportLang
 */
function saveXML(auth, exportLang) {
    let exportXMLPath = process.cwd() + `/export-${exportLang}.xml`;
    let exportXMLUrl = `https://${auth}@data.icecat.biz/export/freexml.int/${exportLang}/`;

    fetchUrl(exportXMLUrl, exportXMLPath);
}

module.exports = exportXML;