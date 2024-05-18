const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/coins/:coinId/market_chart', (req, res) => {
  axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.coinId}/market_chart`, {
    params: {vs_currency: 'usd', days: '180'},
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
  })
  .then(response => res.send(response.data))
  .catch(error => res.send(error));
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));