require("dotenv").config();

const Web3 = require("web3");

const api = process.env.API_KEY;
const PK = process.env.PRIVATE_KEY;

const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`;
// const contractAddress = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

const web3 = new Web3(rpc);

const main = async () => {
  const accountObj = await web3.eth.accounts.privateKeyToAccount(PK);
  const userAddress = accountObj.address;

  const nonce = await web3.eth.getTransactionCount(userAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const sendEtherInWei = Web3.utils.toWei("0.1", "ether");

  const receiverAddress = "0x9eeE224405bBe508cBECf73722776386f509FF03";

  console.log("user address is ->", userAddress);
  console.log("nonce is ->", nonce);
  console.log("gas price is ->", gasPrice);
  console.log("0.1 ether in wei ->", sendEtherInWei);

  // call a transaction method
  let tx = {
    nonce: nonce,
    to: receiverAddress,
    gas: 21000,
    gasPrice: gasPrice,
    value: sendEtherInWei,
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
