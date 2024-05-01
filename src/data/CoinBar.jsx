import React from 'react';
import Chart from 'react-apexcharts';
import {useTheme} from '@mui/material';
import { tokens } from "../theme";
import { useMediaQuery } from '@mui/material';


const CoinBar = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // This will be true if the screen width is less than 600px
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const legendWidth = window.innerWidth < 600 ? 50 : 80;

  const options = {
    chart: {
      type: 'bar',
      theme: {
        mode: 'dark', // Add this
      },
      width: isSmallScreen ? "400px" : "500px", // Set width to 100% on small screens
      height: isSmallScreen ? "300px" : "300px", // Adjust height on small screens
    },
    title: {
      text: 'Coin Market Cap Rank',
      style: {
        color: '#ffffff', // Add this
      },
      
    },
    tooltip: {
        fillSeriesColor: false,
        theme: 'dark' // Change the tooltip theme to 'dark' for better visibility
    },
    dataLabels: {
        enabled: false // Add this
      },

    xaxis: {
      categories: data.coins.map(coin => coin.name),
      labels: {
        style: {
            colors: colors.greenAccent[500] // Change the color of the y-axis labels here
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
    },

    responsive: [{
      breakpoint: 600, // breakpoint at 600px
      options: {
          chart: {
              width: "100%", // set width to 100% on small screens
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
                  horizontal: false, // switch to vertical bars on small screens
              },
          },
      },
  }]
  };

  const series = [{
    name: 'market cap rank',
    data: data.coins.map(coin => coin.market_cap_rank)
  }];

  return (
    
    <Chart options={options} series={series} type="bar" />
  );
};

export default CoinBar;