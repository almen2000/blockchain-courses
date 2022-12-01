require("dotenv").config();

const Web3 = require("web3");

const compiledContract = require("./compiledFile.json");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

console.log(api);
const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;
// const contractAddr = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const web3 = new Web3(rpc);

const main = async () => {
  let contract = new web3.eth.Contract(compiledContract.abi);
  // deploy the contract
  const encodedDeploy = contract
    .deploy({
      data: compiledContract.bytecode,
      arguments: [],
    })
    .encodeABI();

  let tx = {
    gas: 1000000,
    data: encodedDeploy,
  };

  let signedTransaction = await web3.eth.accounts.signTransaction(tx, PK);

  console.log("Start send transaction ...");
  let response = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  const contractAddress = response.contractAddress;
  console.log("contract deployed successfully");
  console.log("contract address is:", contractAddress);

  // create new instance of contract
  contract = new web3.eth.Contract(
    compiledContract.abi,
    contractAddress
  );

  // call a transaction method 
  const encodedIncrement = await contract.methods.increment().encodeABI();
  tx = {
    to: contractAddress,
    gas: 1000000,
    data: encodedIncrement,
  };

  signedTransaction = await web3.eth.accounts.signTransaction(tx, PK);

  console.log("Start send transaction ...");
  response = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log("transaction sent successfully");

  // call a view method
  const count = await contract.methods.getCount().call();
  console.log(count.toString());
};

main();
