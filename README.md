# Webcom as Promised
### Promise wrapper for [Webcom](https://github.com/webcom-components/webcom-npm) library.

[![Build Status](https://travis-ci.org/EhabGamal/webcom-as-promised.svg?branch=master)](https://travis-ci.org/EhabGamal/webcom-as-promised)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd0a561a6cbe13d3b5f5/maintainability)](https://codeclimate.com/github/EhabGamal/webcom-as-promised/maintainability)
[![npm](https://img.shields.io/npm/v/webcom-as-promised.svg)](https://github.com/EhabGamal/webcom-as-promised)
[![Webcom Version](https://img.shields.io/badge/webcom-v2.2.0-orange.svg)](https://github.com/webcom-components/webcom-npm)
[![Webcom Version](https://img.shields.io/npm/l/webcom-as-promised.svg)](https://github.com/EhabGamal/webcom-as-promised/blob/master/LICENSE)

> ### The promised wrapper that will protect you from falling into the callback hell.

## Installation
```
npm i webcom-as-promised
```

## Example
```node
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

## Promisified APIs
| Callback API | Promise API |
|:--------:|:-------:|
|value|valueAsync|
|update|updateAsync|
|set|setAsync|
|remove|removeAsync|
|push|pushAsync|
|resume|resumeAsync|
|logout|logoutAsync|

## New APIs
1. `getPathFromRoot`
2. `navigateFromRoot`

## Thanks
All thanks to [Mohamad Gamal](https://github.com/MohamadGamal) for his contribution in developing this wrapper.