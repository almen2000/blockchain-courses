import Web3 from "web3";
import "./App.css";
import abi from "./contractABI/abi.json";

function App() {
  const callAMethod = async () => {
    try {
      let accountAddress = "";
      const web3 = new Web3(window.ethereum);
      const [account] = await web3.eth.getAccounts();
      if (!account) {
        const address = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountAddress = address;
      } else {
        accountAddress = account;
      }

      const contractAddr = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";

      const contract = new web3.eth.Contract(abi, contractAddr);

      // method call example
      const count = await contract.methods.getCount().call();
      console.log(count.toString());

      // transaction example on metamask
      const tx = await contract.methods
        .increment()
        .send({ from: accountAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button onClick={callAMethod}>Call a method</button>
    </div>
  );
}

export default App;
