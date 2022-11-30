require("dotenv").config();

const Web3 = require("web3");

const abi = require("./abi.json");


const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

console.log(api);;
const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;
const contractAddr = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const web3 = new Web3(rpc);

const main = async () => {
  const contract = new web3.eth.Contract(abi, contractAddr);

  // const count = await contract.methods.getCount().call();
  // console.log(count.toString());

  const encodedData = await contract.methods.increment().encodeABI();

  const tx = {
    to: contractAddr,
    gas: 1000000,
    data: encodedData,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(tx, PK);
  console.log(signedTransaction);

  console.log("Start send transaction ...");
  const response = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log(response);
};

main();
