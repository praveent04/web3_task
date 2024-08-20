import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenDetails from './pages/TokenDetails';
import useMetaMask from './hooks/metaMask';
import Home from './pages/Home';
import { ERC20_ABI } from './constants'; 
import './index.css';
import './styles/App.css';


function App() {
  const { account, web3, network } = useMetaMask();
  const [showAddToken, setShowAddToken] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    if (account) {
      setShowAddToken(true);
    }
  }, [account]);

  const handleAddToken = async () => {
    if (!web3 || !tokenAddress) return;

    try {
   
      setError('');
      
      const token = new web3.eth.Contract(ERC20_ABI, tokenAddress);
      const name = await token.methods.name().call();
      const symbol = await token.methods.symbol().call();
      setTokens([...tokens, { address: tokenAddress, name, symbol }]);
      setTokenAddress('');
    } catch (error) {

      setError('Invalid Token');
    }
  };

  return (
    <Router>
      <div className="App">
        {!account ? (
          <button onClick={() => web3 && web3.eth.requestAccounts()}>
            Connect to MetaMask
          </button>
        ) : (
          <div>
            <p>Account connected: {account}</p>
            <p>Network: {network}</p>
            {network === 'Unsupported Network' && (
              <p style={{ color: 'red' }}>
               You're connected to a different network. Please select Mainnet in MetaMask to continue.
              </p>
            )}
            {showAddToken && (
              <div >
                <div >
                  <input
                    type="text"
                    placeholder="Enter token address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                  <button onClick={handleAddToken}>Add Token</button>
                </div>
                {error && (
                  <p >{error}</p> 
                )}
                {tokens.length > 0 && (
                  <ul>
                    {tokens.map((token, index) => (
                      <li key={index}>
                        {token.name} ({token.symbol}) - {token.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/token/:address" element={<TokenDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

