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
      console.log(accountAddress);
      console.log(abi);

      const contract = new web3.eth.Contract(
        abi,
        "0x080D769887Bdc29ed16D690532B0AB17FE1c2A71"
      );
      console.log(contract);

      //call a method
      const balance = await contract.methods
        .mint(accountAddress, "1000000000000000000")
        .send({ from: accountAddress });
      console.log(balance.toString());
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
