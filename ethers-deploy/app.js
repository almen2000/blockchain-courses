require("dotenv").config();

const { ethers } = require("ethers");

const compiledContract = require("./compiledFile.json");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;

const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(PK, provider);

const main = async () => {
  const contractFactory = new ethers.ContractFactory(
    compiledContract.abi,
    compiledContract.bytecode,
    wallet
  );

  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("contract address is ->", contract.address);
};

main();
