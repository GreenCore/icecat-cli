# Icecat CLI (Test version)


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
user = {your-icecat-username}
password = {your-icecat-password} 

[product]
language = {preferred-language-code}
```
Language: [Supported language codes.](https://github.com/GreenCore/icecat/blob/master/Languages.md)


Run the follow command: 

```bash
icecat -c config.ini --ean 4948570114344
```
