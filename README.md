# Icecat CLI
[![Version][npm-image]][npm-url] 
![License][license-image] 
[![Known Vulnerabilities][snyk-image]][snyk-url]


Command Line Interface for the [Icecat API](https://github.com/GreenCore/icecat). 

- [Show product information](#show-product-information)
- [Download product information](#download-product-information)
- [Download Free XML Export](#download-free-xml-export)


# Getting started

## 1) Icecat account
To create a Icecat account, go to the [Icecat registration](https://icecat.biz/registration/) page.

## 2) Installation
Install the Icecat CLI by running the following command:

Linux / OSX:
```
sudo npm install icecat-cli -g
```

Windows:
```
npm install icecat-cli -g
```

## 3) Basic usage

Create config.ini with:
```ini
[account]
username = {your-icecat-username}
password = {your-icecat-password} 

[product]
defaultLanguage = {preferred-language-code}
```
Language: [Supported language codes.](https://github.com/GreenCore/icecat/blob/master/Languages.md)


Run the follow command: 

gtin (EAN or UPC)

```bash
icecat -c config.ini --gtin 4948570114344
```


# Commands

## Show product information

Request with EAN:
```bash
icecat -c config.ini --gtin 4948570114344
```

Request with Icecat Product Id:
```bash
icecat -c config.ini --id 29900045
```

Example response:


| Type | Value |
|---|---|
| Name: | X4071UHSU-B1 |
| Icecat Product Id: | 29900045 |
| EAN: | 4948570114344 |
| Release:  |  2015-10-04        |
| Supplier:  | iiyama |
| Category: | public displays |
| Short Description: | 39.5 MVA, 3 ms, 350 cd/m², 3840 x 2160, 16:9, PiP, PbP, HTCP, VESA, OSD, 3 x USB 3… |
| Product Url:  | http://www.iiyama.com/nl_nl/producten/prolite-x4071uhsu-b1/ |
| Manual PDF Url: | http://pdfs.icecat.biz/pdf/48068167-5566-manual.pdf |
| Product Info PDF Url:    | http://pdfs.icecat.biz/pdf/48068173-7155.pdf|

## Download product information
Download Icecat XML, Images and PDF product information.

A new folder will be created based on the Icecat unique product Id.

Request with EAN:
```bash
icecat -c config.ini --gtin 4948570114344 --save
```

Request with Icecat Product Id:
```bash
icecat -c config.ini --id 29900045 --save
```

Example response:
```bash
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6765.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6984.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6068.jpg
Successfully downloaded file: http://pdfs.icecat.biz/pdf/48068173-7155.pdf
... etc
```

Creates folder structure:

- 29900045
    - images
        - 29900045_9148.jpg
        - 29900045_7312.jpg
        - 29900045_6984.jpg
        - ... etc
    - pdfs
        - 48068173-7155.pdf
        - 48068167-5566-manual.pdf
    - 29900045.xml

## Download Free XML Export

Default XML export:
```bash
icecat -c config.ini --export
```

Example response:
```bash
Start downloading export to: 
 /home/icecat/example/export-EN.xml
  Downloading [============        ] 2637 Kb/s 58% 13.7s
```

XML export with specific language:
```bash
icecat -c config.ini --export --lang DE
```

Example response:
```bash
Start downloading export to: 
 /home/icecat/example/export-DE.xml
  Downloading [============        ] 2637 Kb/s 58% 13.7s
```

# License
[MIT License](https://github.com/GreenCore/icecat-cli/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/icecat-cli.svg
[npm-url]: https://npmjs.org/package/icecat-cli
[snyk-image]: https://snyk.io/test/github/GreenCore/icecat-cli/badge.svg
[snyk-url]: https://snyk.io/test/github/GreenCore/icecat-cli
[license-image]: https://img.shields.io/npm/l/icecat-cli.svg