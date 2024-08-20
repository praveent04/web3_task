import axios from 'axios';

const API_BASE_URL = 'https://mainnet.infura.io/v3/1cb41feb96474391b3134ed5f38819c6'; 

export const Historyfetch = async (address, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/historical-balance`, {
      params: { address, token: token.address },
    });
    return response.data;
  } catch (error) {
    console.error('Historical Balance Error:', error);
    return { dates: [], balances: [] };
  }
};

export const fetchAllowance = async (address, token, spender) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allowance`, {
      params: { address, token: token.address, spender },
    });
    return response.data.allowance;
  } catch (error) {
    console.error('Error fetching allowance:', error);
    return 0;
  }
};

export const transferToken = async (address, token, recipient, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transfer`, {
      address,
      token: token.address,
      recipient,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('Error transferring token:', error);
    throw error;
  }
};

