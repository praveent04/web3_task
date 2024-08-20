import { useState, useEffect } from 'react';
import Web3 from 'web3';

const metaMask = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        try {
          const _web3 = new Web3(window.ethereum);
          setWeb3(_web3);

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);

          const networkId = await _web3.eth.net.getId();


          const numericNetworkId = parseInt(networkId, 10);


          if (numericNetworkId === 1) {
            setNetwork('Mainnet');
          } else {
            setNetwork('Network Unsupported');
          }
        } catch (error) {
          console.error('Error connecting MetaMask:', error);
        }
      } else {
        console.error('MetaMask not detected');
      }
    };

    connectMetaMask();
  }, []); 

  useEffect(() => {
    const handleAccountsChanged = (accounts) => setAccount(accounts[0]);
    const handleNetworkChanged = async () => {
      if (web3) {
        try {
          const networkId = await web3.eth.net.getId();


          const numericNetworkId = parseInt(networkId, 10);

          if (numericNetworkId === 1) {
            setNetwork('Mainnet');
          } else {
            setNetwork('Network Unsupported');
          }
        } catch (error) {
          console.error('Network Error', error);
        }
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleNetworkChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleNetworkChanged);
      }
    };
  }, [web3]); 

  return { account, web3, network };
};

export default metaMask;

