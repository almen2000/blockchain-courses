require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;
const etherscanKey = process.env.

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.17",
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    myNetwork: {
      url: `https://eth-goerli.alchemyapi.io/v2/${api}`,
      accounts: [PK],
    },
  },
  etherscan: {
    apiKey: ""
  }
};
