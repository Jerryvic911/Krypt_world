require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://base-sepolia.g.alchemy.com/v2/Y4wTq7q2uZylCor6WilSP5iosr45PX5_',
      accounts: ['4aecbf75738479ee33c3d096f09c62b3cb10de152273a490404e4fe29ac3912e'],
    },
  },
};

//4aecbf75738479ee33c3d096f09c62b3cb10de152273a490404e4fe29ac3912e
//0x4cED0B3cf2FeD6388df0a81C10345ea7143498EB