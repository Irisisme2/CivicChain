const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');

const MNEMONIC = "month now stem exist sorry cliff soda slice enroll nasty slot fan"; // Twój mnemonic fraza
const infuraKey = "8ef77dd64b3440b880d0572df5857bc4"

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc.sepolia-api.lisk.com'),
      network_id: 4202,       // Sepolia's network id
      gas: 5500000,           // Gas limit
      gasPrice: 20000000000,  // Gas price in wei (20 gwei)
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",    // Specify the compiler version
    },
  },
};

