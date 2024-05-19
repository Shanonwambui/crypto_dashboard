import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import {useTheme} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { tokens } from "../theme";

const CoinChart = ({ coinId }) => {
    const [data, setData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const legendWidth = window.innerWidth < 600 ? 50 : 80;
   
    useEffect(() => {
        

        const options = {
            method: 'GET',
            url: `http://localhost:3001/coins/${coinId}/market_chart`,
            params: {vs_currency: 'usd', days: '180'},
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB', },
            mode: 'no-cors'
            
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
            type: 'area',
            width: "100%" ,
            height: isSmallScreen ? "200px" : "300px", 
            toolbar: {
                show: false
              },
        },
        stroke: {
            width: 2,
            colors: [colors.blueAccent[400]],
        },
        grid: {
            colors: colors.grey[400],
          },
        tooltip: {
            fillSeriesColor: false,
            theme: 'dark' 
        },
        series: [{
            name: 'Price',
            data: data
        }],
        dataLabels: {
            enabled: false
          },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#845ADF',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#222631',
                        opacity: 0
                    }
                ]
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: colors.grey[400] 
                }
            }
        },
        yaxis: {
            opposite: false,
            labels: {
                style: {
                    colors: colors.grey[400] 
                },
                formatter: function (value) {
                    return value.toFixed(2); // limit to two decimal places
                }
            }
            
        },

        responsive: [{
            breakpoint: 600, 
            options: {
                chart: {
                    width: "100%",
                    
                },
                legend: {
                    position: 'bottom', 
                    width: legendWidth,
                },
                grid: {
                    xaxis: { lines: { show: false } }, // hide x-axis grid lines on small screens
                    yaxis: { lines: { show: false } }, // hide y-axis grid lines on small screens
                },
                plotOptions: {
                    bar: {
                        horizontal: false, // switch to vertical bars on small screens
                    },
                },
            },
        }]

    };

    return <Chart options={options} series={options.series} type="area"  />;
};

export default CoinChart;