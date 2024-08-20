import React, { useState } from 'react';
import WalletConnector from '../components/WalletConnector';
import TokenList from '../components/TokenList';

const Home = () => {
  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const handleWalletConnect = (walletAddress) => {
    setAddress(walletAddress);
  };

  const handleAddToken = (tokenAddress) => {
    const token = { address: tokenAddress, name: 'Token', symbol: 'TKN', balance: 0 }; // Fetch real data here
    setTokens([...tokens, token]);
  };

  return (
    <div>
      <WalletConnector onConnect={handleWalletConnect} />
      {address && (
        <div>
          <h2>Your Address: {address}</h2>
          <TokenList tokens={tokens} onAddToken={handleAddToken} />
        </div>
      )}
    </div>
  );
};

export default Home;

