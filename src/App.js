import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import Web3 from "web3";
import collectiveVaultABI from "./collectiveVault.abi.json";

function App() {
  useEffect(() => {
    console.log(">>>>>>>>>>>>");
  }, []);

  const clickhandler = async () => {
    const { ethereum } = window;

    const balancetoSend = "20000000000";

    const web3 = new Web3(ethereum);
    let owner = await web3.eth.getAccounts();
    owner = owner[0];
    const receiver = "0xC2c354582B9f2F417268636Ab9511dc1b889Ae08";

    const contract = new web3.eth.Contract(
      collectiveVaultABI,
      "0xb71e8f99ef52d72846636365d6b9d88691b032d5"
    );

    try {
      let receiverBalance = await contract.methods.balanceOf(receiver).call();
      const gasPrice = await web3.eth.getGasPrice();
      const gas = await contract.methods
        .mint(receiver, balancetoSend)
        .estimateGas({
          from: owner,
          value: 0,
        });

      await contract.methods.mint(receiver, balancetoSend).send({
        from: owner,
        value: 0,
        gasPrice,
        gas,
      });

      receiverBalance = await contract.methods.balanceOf(receiver).call();

      console.log(receiverBalance, "New Balance");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div>
      <button onClick={clickhandler}>Press</button>
      Hello
    </div>
  );
}

export default App;
