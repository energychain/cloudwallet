# cloudwallet

<a href="https://stromdao.de/" target="_blank" title="STROMDAO - Digital Energy Infrastructure"><img src="./static/stromdao.png" align="right" height="85px" hspace="30px" vspace="30px"></a>


**Cloudwallet Implementation**

[![npm](https://img.shields.io/npm/dt/cloudwallet.svg)](https://www.npmjs.com/package/cloudwallet)
[![npm](https://img.shields.io/npm/v/cloudwallet.svg)](https://www.npmjs.com/package/cloudwallet)
[![CO2Offset](https://api.corrently.io/v2.0/ghgmanage/statusimg?host=cloudwallet&svg=1)](https://co2offset.io/badge.html?host=cloudwallet)[![Code Quality](https://api.codiga.io/project/30556/score/svg)](https://app.codiga.io/public/project/30556/cloudwallet/dashboard)[![CircleCI](https://circleci.com/gh/energychain/cloudwallet/tree/main.svg?style=svg)](https://circleci.com/gh/energychain/cloudwallet/tree/main

## API Usage

You need to register for the [Cloudwallet-API on RapidAPI](https://rapidapi.com/stromdao-stromdao-default/api/cloudwallet). Replace `rapidApiKey` with yours.

```javascript

const Cloudwallet = require("cloudwallet");
const instance1 = new Cloudwallet('<rapidApiKey>'); // Create a new KeyPair
await instance1.set('Hello','World'); // Store a Keyvalue like a presentation

// ReUse wallet remembering privateKey and identifier
const keys = instance1.getKeypair();
console.log(keys);

const instance2 = new Cloudwallet('<rapidAPIkey>',keys.privateKey,keys.identifier);
console.log(await instance2.get('Hello'));
```
