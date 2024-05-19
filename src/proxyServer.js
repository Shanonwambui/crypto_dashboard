const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/coins/:coinId/market_chart', async (req, res) => {
    const { coinId } = req.params;
    const { vs_currency, days } = req.query;

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
            params: { vs_currency, days },
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB' },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching data from CoinGecko API' });
    }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});