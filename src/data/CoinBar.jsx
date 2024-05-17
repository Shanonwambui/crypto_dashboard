import React from 'react';
import Chart from 'react-apexcharts';
import {useTheme} from '@mui/material';
import { tokens } from "../theme";
import { useMediaQuery } from '@mui/material';


const CoinBar = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const legendWidth = window.innerWidth < 600 ? 50 : 80;


    const xaxisCategories = data && data.coins ? data.coins.map(coin => coin.name) : [];
    const seriesData = data && data.coins ? data.coins.map(coin => coin.market_cap_rank) : [];

  const options = {
    chart: {
      type: 'bar',
      theme: {
        mode: 'dark', 
      },
      width: isSmallScreen ? "400px" : "500px", 
      height: isSmallScreen ? "300px" : "300px", 
      
     
    },
    title: {
      text: 'Coin Market Cap Rank',
      style: {
        color: '#ffffff', 
      },
      
    },
    tooltip: {
        fillSeriesColor: false,
        theme: 'dark' 
    },
    dataLabels: {
        enabled: false 
      },
      fill: {
        colors: [colors.blueAccent[400]]
      },
  

    xaxis: {
      categories: xaxisCategories,
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
            }
        }
    },

    responsive: [{
      breakpoint: 600, 
      options: {
          chart: {
              width: "100%", 
              height: "180%"
          },
          legend: {
              position: 'bottom', // move legend to bottom on small screens
              width: legendWidth,
          },
          grid: {
              xaxis: { lines: { show: false } }, // hide x-axis grid lines on small screens
              yaxis: { lines: { show: false } }, // hide y-axis grid lines on small screens
          },
          plotOptions: {
              bar: {
                  horizontal: false, 
                  colors: [colors.blueAccent[400]],
              },
          },
      },
  }]
  };

  const series = [{
    name: 'market cap rank',
    data: seriesData
  }];

  return (
    
    <Chart options={options} series={series} type="bar" />
  );
};

export default CoinBar;