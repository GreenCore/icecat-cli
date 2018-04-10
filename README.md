# Icecat CLI
[![Version][npm-image]][npm-url] 
![License][license-image] 
[![Known Vulnerabilities][snyk-image]][snyk-url]


Command Line Interface for Icecat product data.
- View basic product details in terminal
- Download product info


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

```bash
icecat -c config.ini --gtin 4948570114344
```

Example response:


| Type | Value |
|---|---|
| Name: | X4071UHSU-B1 |
| Release:  |  2015-10-04        |
| Supplier:  | iiyama |
| Category: | public displays |
| Short Description: | 39.5 MVA, 3 ms, 350 cd/m², 3840 x 2160, 16:9, PiP, PbP, HTCP, VESA, OSD, 3 x USB 3… |
| Product Url:  | http://www.iiyama.com/nl_nl/producten/prolite-x4071uhsu-b1/ |
| Manual PDF Url: | http://pdfs.icecat.biz/pdf/48068167-5566-manual.pdf |
| Product Info PDF Url:    | http://pdfs.icecat.biz/pdf/48068173-7155.pdf|

<sub>note: *The Manual PDF Url* and *Product Info PDF Url* are sometimes the same PDF file</sub>

## Save product information

```bash
icecat -c config.ini --gtin 4948570114344 --save
```

Example response:
```bash
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6765.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6984.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6068.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_1198.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_4628.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_9043.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_5438.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_9148.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_0569.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_3889.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_7312.jpg
Successfully downloaded file: http://images.icecat.biz/img/gallery/29900045_6129.jpg
Successfully downloaded file: http://pdfs.icecat.biz/pdf/48068173-7155.pdf
Successfully downloaded file: http://pdfs.icecat.biz/pdf/48068173-7155.pdf
```

Creates folder structure:

- 4948570114344
    - images
        - 29900045_9148.jpg
        - 29900045_7312.jpg
        - 29900045_6984.jpg
        - 29900045_3889.jpg
        - 29900045_1198.jpg
        - 29900045_0569.jpg
        - 29900045_6765.jpg
        - 29900045_4628.jpg
        - 29900045_9043.jpg
        - 29900045_6068.jpg
        - 29900045_6129.jpg
        - 29900045_5438.jpg
    - pdfs
        - 48068173-7155.pdf
    - 4948570114344.xml


# License
[MIT License](https://github.com/GreenCore/icecat-cli/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/icecat-cli.svg
[npm-url]: https://npmjs.org/package/icecat-cli
[snyk-image]: https://snyk.io/test/github/GreenCore/icecat-cli/badge.svg
[snyk-url]: https://snyk.io/test/github/GreenCore/icecat-cli
[license-image]: https://img.shields.io/npm/l/icecat-cli.svg