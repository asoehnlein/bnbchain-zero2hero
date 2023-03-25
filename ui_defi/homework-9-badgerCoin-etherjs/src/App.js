import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const { ethereum } = window;
  let contract = null;
  let provider = null;
  let signer = null;
  let contractAddress = null;

  // address for wallet connect
  const [address, setAddress] = useState("");

  // addressValue for balanceOf()
  const [addressValue, setAddressValue] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleChange = (event) => {
    setAddressValue(event.target.value);
  };

  const handleBalanceOfClick = async () => {
    if (!addressValue) {
      setAddressError("Please enter a wallet address");
      return;
    }
    try {
      const balance = await contract.balanceOf(addressValue);
      const formattedBalance = ethers.utils.formatEther(balance._hex);
      setBalanceOf(formattedBalance);
      setAddressError("");
    } catch (error) {
      console.log(error);
      setAddressError("Invalid wallet address");
    }
  };

  if (ethereum) {
    const abi = [
      "function totalSupply() public view returns (uint256)",
      "function symbol() view returns (string)",
      "function balanceOf(address) view returns (uint256)",
    ];
    contractAddress = "0xDd80677aFd4715E6a8930F376C1A8d3aC88F4B41";
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
  }

  const connectMetamask = async () => {
    try {
      const resolveAccounts = await provider.send("eth_requestAccounts", []);
      setAddress(resolveAccounts);
    } catch (error) {
      console.log(error);
      setAddressError("Failed to connect to Metamask");
    }
  };

  ethereum.on("accountsChanged", () => {
    connectMetamask();
  });

  ethereum.on("chainChanged", (chainId) => {
    if (chainId !== "0x61") {
      console.log("Please connect to BNB Testnet");
    } else {
      console.log("Correct chain");
      window.location.reload();
    }
  });

  return (
    <div className="App">
      <h1 className="title">BadgerCoin Contract</h1>

      <button
        className={`button ${connected ? "connected" : ""}`}
        onClick={() => {
          if (contract && !connected) {
            ethereum
              .request({ method: "eth_requestAccounts" })
              .then((accounts) => {
                setConnected(true);
                connectMetamask();
              })
              .catch((error) => {
                console.log(error);
                setAddressError("Failed to connect to Metamask");
              });
          }
        }}
      >
        {!connected ? "Connect wallet" : "Wallet connected"}
      </button>

      <h5 className="address">{address}</h5>

      <button onClick={() => {
        if (contract) {
          contract.totalSupply()
            .then(totalSupply => {
              totalSupply = ethers.utils.formatEther(totalSupply._hex);
              setTotalSupply(totalSupply);
            })
        }
      }}>Get totalSupply</button>

      <h5>{totalSupply}</h5>

      <button onClick={() => {
        if (contract) {
          contract.symbol()
            .then(symbol => {
              setSymbol(symbol);
            })
        }
      }}>Get Symbol</button>

      <h5>{symbol}</h5>

      <input
        type="text"
        id="addressValue"
        name="addressValue"
        placeholder="Enter wallet address"
        onChange={handleChange}
        value={addressValue}
      />

      {addressValue === '' && <p style={{ color: 'red' }}>Please enter a wallet address</p>}

      <h5></h5>

      <button onClick={() => {
        if (contract && addressValue) {
          contract.balanceOf(addressValue)
            .then(balanceOf => {
              balanceOf = ethers.utils.formatEther(balanceOf._hex);
              setBalanceOf(balanceOf);
            })
        }
      }}>Get wallet balance</button>

      <h5>{balanceOf}</h5>

    </div>
  );
}

export default App;