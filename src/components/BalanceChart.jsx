import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { HistoryFetch } from './services/Api';

const BalanceChart = ({ address, token }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      const data = await HistoryFetch(address, token);
      setChartData(data);
    };

    getBalance();
  }, [address, token]);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.dates,
          datasets: [
            {
              label: 'Balance History',
              data: chartData.balances,
              fill: false,
              borderColor: 'red',
            },
          ],
        },
      });
    }
  }, [chartData]);

  return <canvas id="chart"></canvas>;
};

export default BalanceChart;

