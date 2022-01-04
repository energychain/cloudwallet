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

// ReUse wallet remembering privateKey
const keys = instance1.getKeys();
console.log(keys);

const instance2 = new Cloudwallet('<rapidAPIkey>',keys.privateKey);
console.log(await instance2.get('Hello'));
```

*In other words*: You might create an instance as a new object. If you do not specify a privateKey as the second argument - a new keyset is generated. Values are values of the instance object and could be accessed via `get()` or `set()`methods.  It is a good practice to retrieve at least the privateKey and store it externally as there is no possibility to recover wallet data in case this key is lost.

## Background

The node module `CloudWallet` uses an Ethereum-PrivateKey to generate an [Decentralized Identifier](https://www.w3.org/TR/did-core/) as a signed JSON-WebToken (JWT) . The token itself gets transferred to the CloudWallet-API using an HTTPS-POST.  Upon receiving the JWT by the CloudWallet-API the JWT and its containing DID get decoded and the signature is verified before the fields get stored. As a result, the HTTPS-POST will return a JSON containing all values stored in the Wallet.   

## Maintainer / Imprint

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)
</addr>

Project Website: https://co2offset.io/

## LICENSE
[Apache-2.0](./LICENSE)
