import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import {useTheme} from '@mui/material';

import { tokens } from "../theme";

const CoinChart = ({ coinId }) => {
    const [data, setData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
            params: {vs_currency: 'usd', days: '180'},
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
        };

        axios.request(options).then(function (response) {
            const priceData = response.data.prices.map(pricePoint => ({
                x: new Date(pricePoint[0]),
                y: pricePoint[1]
            }));
            setData(priceData);
        }).catch(function (error) {
            console.error(error);
        });
    }, [coinId]);

    const options = {
        chart: {
            type: 'line'
        },
        stroke: {
            width: 2 // Adjust the thickness of the line here
        },
        tooltip: {
            fillSeriesColor: false,
            theme: 'dark' // Change the tooltip theme to 'dark' for better visibility
        },
        series: [{
            name: 'Price',
            data: data
        }],
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: colors.greenAccent[500] // Change the color of the x-axis labels here
                }
            }
        },
        yaxis: {
            opposite: true,
            labels: {
                style: {
                    colors: colors.greenAccent[500] // Change the color of the y-axis labels here
                }
            }
        }
    };

    return <Chart options={options} series={options.series} type="line" />;
};

export default CoinChart;