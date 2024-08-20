// src/services/blockchain.js
import { ethers } from 'ethers';
import { NETWORK, INFURA_PROJECT_ID } from '../config';

// Create a provider connected to the Infura network
export const getProvider = () => {
  const infuraUrl = `https://${NETWORK}.infura.io/v3/${INFURA_PROJECT_ID}`;
  return new ethers.providers.JsonRpcProvider(infuraUrl);
};

// Function to check the balance of a given token for a specific address
export const getTokenBalance = async (address, tokenAddress) => {
  const provider = getProvider();
  const abi = [
    'function balanceOf(address owner) view returns (uint256)',
  ];
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatUnits(balance, 18); // Assuming the token has 18 decimals
};

// Function to transfer tokens to another address
export const transferToken = async (senderAddress, tokenAddress, recipient, amount) => {
  const provider = getProvider();
  const signer = provider.getSigner(senderAddress);
  const abi = [
    'function transfer(address to, uint256 value) public returns (bool)',
  ];
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18)); // Assuming 18 decimals
  await tx.wait(); // Wait for the transaction to be mined
  return tx;
};

// Function to check token allowance for a specific spender
export const checkAllowance = async (ownerAddress, tokenAddress, spenderAddress) => {
  const provider = getProvider();
  const abi = [
    'retrieveAllowance(Owner Address, Spender Address) view returns (uint256)',
  ];
  const allowance = await contract.allowance(ownerAddress, spenderAddress);

  const contract = new ethers.Contract(tokenAddress, abi, provider);
  
  return ethers.utils.formatUnits(allowance, 18);  
};

