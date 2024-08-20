import React, { useState } from 'react';
import { fetchAllowance } from './services/Api';

const CheckAllowance = ({ address, token }) => {
  const [spender, setSpender] = useState('');
  const [allowance, setAllowance] = useState(null);

  const checkAllowance = async () => {
    const data = await fetchAllowance(address, token, spender);
    setAllowance(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter spender address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance && (
        <div>
          Allowance: {allowance} {token.symbol}
        </div>
      )}
    </div>
  );
};

export default CheckAllowance;

