import React, { useState } from 'react';
import { transferToken } from './services/Api';

const TokenTransferForm = ({ address, token }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      await transferToken(address, token, recipient, amount);
      alert('Successful Transfer :)');
    } catch (error) {
      alert('Failed Transfer :(');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TokenTransferForm;

