import React, { useEffect, useState } from 'react';
import Web3 from 'web3';


const TokenDetails = ({ tokenAddress, spenderAddress }) => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [balance, setBalance] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [error, setError] = useState('');

  
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },

  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
 
  {
    "constant": true,
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "name": "remaining", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  
  {
    "constant": true,
    "inputs": [{ "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }

];

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);
      } else {
        setError('MetaMask not detected');
      }
    };
    
    initWeb3();
  }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (web3 && tokenAddress) {
        try {
          const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
          const accounts = await web3.eth.getAccounts();

          const name = await contract.methods.name().call();
          const symbol = await contract.methods.symbol().call();
          const balance = await contract.methods.balanceOf(accounts[0]).call();
          const allowance = await contract.methods.allowance(accounts[0], spenderAddress).call();

          setTokenName(name);
          setTokenSymbol(symbol);
          setBalance(web3.utils.fromWei(balance, 'ether'));
          setAllowance(web3.utils.fromWei(allowance, 'ether'));
        } catch (error) {
          setError('Error fetching token data: Invalid Token Address');
        }
      }
    };

    fetchTokenData();
  }, [web3, tokenAddress, spenderAddress]);

  return (
    <div>
      <h1>Token Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Token Name: {tokenName}</p>
      <p>Token Symbol: {tokenSymbol}</p>
      <p>Balance: {balance}</p>
      <p>Allowance: {allowance}</p>
    </div>
  );
};

export default TokenDetails;

