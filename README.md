# Webcom as Promised
### Promise wrapper for Webcom library

[![Build Status](https://travis-ci.org/EhabGamal/webcom-as-promised.svg?branch=master)](https://travis-ci.org/EhabGamal/webcom-as-promised)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd0a561a6cbe13d3b5f5/maintainability)](https://codeclimate.com/github/EhabGamal/webcom-as-promised/maintainability)
[![npm](https://img.shields.io/npm/v/webcom-as-promised.svg)](https://github.com/EhabGamal/webcom-as-promised)
[![Webcom Version](https://img.shields.io/badge/webcom-v1.3.2-orange.svg)](https://github.com/webcom-components/webcom-npm)
[![Webcom Version](https://img.shields.io/npm/l/webcom-as-promised.svg)](https://github.com/EhabGamal/webcom-as-promised/blob/master/LICENSE)


> webcom-as-promised wrapper adds promises power to many webcom APIs. Allowing webcom to be compatible with the latest asynchronous patterns. (Mohamed Gamal)

# Installation
```
npm install webcom-as-promised --save
```
# Example
```
const Webcom = require('webcom-as-promised');

const webcomRef = new Webcom('YOUR NAMESPACE URL');

webcomRef
  .authWithPassword({
    "email":"email@example.com",
    "password": "$0ME_P@$$W0RD"
  })
  .then((auth) => {
    console.log(`Whola! authed sucessfully!`);
    return webcomRef.child('sub_child').valueAsync();
  })
  .then((v) => v.val())
  .then((val) => console.log(`Value sub_child is ${val}`))
  .catch(console.log);
```
