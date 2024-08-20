import React, { useState } from 'react';
import TokenItem from './TokenItem';

const TokenList = ({ tokens, onAddToken }) => {
  const [tokenAddress, setTokenAddress] = useState('');

  const handleAddToken = () => {
    onAddToken(tokenAddress);
    setTokenAddress('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write your token address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={handleAddToken}>Add Token</button>
      <ul>
        {tokens.map((token) => (
          <TokenItem key={token.address} token={token} />
        ))}
      </ul>
    </div>
  );
};

export default TokenList;

