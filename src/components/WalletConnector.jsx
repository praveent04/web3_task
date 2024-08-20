import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnector = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        onConnect(address);
      } catch (error) {
        console.error('Wallet Connection Failed:', error);
      }
    } else {
      alert('MetaMask not found');
    }
  };

  const handleAddressInput = (e) => {
    const address = e.target.value;
    setWalletAddress(address);
    onConnect(address);
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      <input
        type="text"
        placeholder="Or enter wallet address"
        value={walletAddress}
        onChange={handleAddressInput}
      />
    </div>
  );
};

export default WalletConnector;

