
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { useMediaQuery } from '@material-ui/core';



const LineChart = ({coinid, percentage}) => {
  const [series, setSeries] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Define media queries
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

 
  console.log(percentage);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/ohlc?vs_currency=usd&days=7`, options)
      .then(response => response.json())
      .then(data => {
        const prices = data.map(item => item[4]);

        setSeries([{
          name: 'price',
          data: prices
        }]);
      })
      .catch(err => console.error(err));
  }, [coinid]);

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false
      },


    },
    stroke: {
        curve: 'smooth',
        width: 2,
        colors: [percentage > 0 ? colors.greenAccent[500] : colors.redAccent[500]], 
    },
    grid: {
      show: false
    },
    markers: {
        size: 0, // Hide markers
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },


    xaxis: {
      categories: series[0]?.data || [],
      labels: {
        show: false
      }, 
      show : false,
      axisBorder: {
        show: false
      },
        axisTicks: {
            show: false
        }

    },
    yaxis: {
      labels: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };

  return (
    <div className="line-chart">
      <Chart options={options} series={series} type="line" width= {isSmallScreen ? "120px" :"150px"} height={isSmallScreen ? "75px" : "80px"  } />
    </div>
  );
};

export default LineChart;