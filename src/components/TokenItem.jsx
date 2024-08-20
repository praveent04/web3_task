import React from 'react';
import { Link } from 'react-router-dom';

const TokenItem = ({ token }) => {
  return (
    <li>
      <Link to = {`/token/${token.address}`}>{token.name}</Link> - {token.balance} {token.symbol}
    </li>
  );
};

export default TokenItem;

