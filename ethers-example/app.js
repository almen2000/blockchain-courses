require("dotenv").config();

const { ethers } = require("ethers");

const abi = require("./abi.json");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;
const contractAddr = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(PK, provider);

const main = async () => {
  const contract = new ethers.Contract(contractAddr, abi, wallet);

  // contract call example
  const count = await contract.getCount();
  console.log(count.toString());
  
  // contract transaction example
  const tx = await contract.increment();
  console.log(tx);
};

main();
