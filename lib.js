'use strict';

const axios = require("axios");
const EthrDID = require("ethr-did").EthrDID;

const cloudwallet = function(rapidAPIkey,keypair,identifier) {

  let baseURL = 'https://cloudwallet.p.rapidapi.com/';

  let parent = this;

  if((typeof keypair == 'undefined')||(keypair == null)) {
    keypair = EthrDID.createKeyPair();
    keypair.id = "did:ethr:"+keypair.identifier;
  }
  if(typeof keypair == 'string') {
    keypair = {
      privateKey:keypair,
      identifier:identifier
    }
  }
  const headers = {
        "content-type":"application/json",
        "x-rapidapi-host":"cloudwallet.p.rapidapi.com",
        "x-rapidapi-key":rapidAPIkey,
        "useQueryString":true
  };

  const _call = async function() {
    const ethrDid = new EthrDID({
      identifier:keypair.identifier,
      rpcUrl:"https://integration.corrently.io/",
      name: "mainnet",
      chainId: "6226",
      registry:"0xda77BEeb5002e10be2F5B63E81Ce8cA8286D4335",
      privateKey:keypair.privateKey
     });
    const jwt = await ethrDid.signJWT(parent);
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

  this.set = async function(key,value) {
      parent[key] = value;
      await _call();
  }

  this.getKeypair = function() {
    return keypair;
  }

  _call();
}
module.exports = cloudwallet;
