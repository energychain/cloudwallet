'use strict';

const axios = require("axios");
const EthrDID = require("ethr-did").EthrDID;
const ethers = require("ethers");

const cloudwallet = function(rapidAPIkey,privateKey) {

  let baseURL = 'https://cloudwallet.p.rapidapi.com/';

  let parent = this;

  if((typeof privateKey == 'undefined')||(privateKey == null)) {
    privateKey = EthrDID.createKeyPair();
    privateKey.id = "did:ethr:"+privateKey.identifier;
  }

  if(typeof privateKey == 'string') {
    const wallet = new ethers.Wallet(privateKey);
    privateKey = {
      privateKey:privateKey,
      identifier:wallet.address
    }
  }
  parent.privateKey=privateKey;

  const headers = {
        "content-type":"application/json",
        "x-rapidapi-host":"cloudwallet.p.rapidapi.com",
        "x-rapidapi-key":rapidAPIkey,
        "useQueryString":true
  };

  const _call = async function(key,value) {

    const ethrDid = new EthrDID({
      identifier:privateKey.identifier,
      rpcUrl:"https://integration.corrently.io/",
      name: "mainnet",
      chainId: "6226",
      registry:"0xda77BEeb5002e10be2F5B63E81Ce8cA8286D4335",
      privateKey:parent.privateKey.privateKey
     });
     let data = {};
     for (const [key, value] of Object.entries(parent)) {
       data[key] = value;
     }
     delete data.privateKey;

     const jwt = await ethrDid.signJWT(data);

    const settings = {
          "method":"POST",
          "url":baseURL+"cloudwallet",
          "headers":headers
    };

    const responds = await axios.post(baseURL+"cloudwallet",{"did":jwt},settings);

     for (const [key, value] of Object.entries(responds.data)) {
       parent[key] = value;
     }
     return responds.data;
  }

  this.get = async function(key) {
      await _call();
      return parent[key];
  }

  this.persist = async function() {
    await _call();
  }

  this.set = async function(key,value) {
      parent[key] = value;
      await _call();
  }

  this.getKeys = function() {
    return privateKey;
  }

  _call();
}
module.exports = cloudwallet;
