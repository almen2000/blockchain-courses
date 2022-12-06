require("dotenv").config();

const Web3 = require("web3");

const compiledContract = require("./compiledFile.json");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;
// const contractAddress = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const web3 = new Web3(rpc);

const main = async () => {
  const contractAddress = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";
  // create new instance of contract
  let contract = new web3.eth.Contract(compiledContract.abi, contractAddress);

  const accountObj = await web3.eth.accounts.privateKeyToAccount(PK);
  const userAddress = accountObj.address;

  const estimatedGas = await contract.methods.increment().estimateGas();
  const nonce = await web3.eth.getTransactionCount(userAddress);
  const gasPrice = await web3.eth.getGasPrice();

  console.log("user address is ->", userAddress);
  console.log("estimated gas is ->", estimatedGas);
  console.log("nonce is ->", nonce);
  console.log("gas price is ->", gasPrice);

  // call a transaction method
  const encodedIncrement = await contract.methods.increment().encodeABI();
  let tx = {
    nonce: nonce,
    to: contractAddress,
    gas: estimatedGas + 5000,
    data: encodedIncrement,
    gasPrice: gasPrice,
  };

  let signedTransaction = await web3.eth.accounts.signTransaction(tx, PK);

  console.log("Start send transaction ...");
  let response = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log("transaction sent successfully");
  console.log(response.transactionHash);

  // // call a view method
  // const count = await contract.methods.getCount().call();
  // console.log(count.toString());
};

main();
