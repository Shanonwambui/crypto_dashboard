import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box,  useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useMediaQuery } from '@mui/material';
import {Typography} from '@mui/material';

import CoinChart from './CoinChart';



const CoinDetails = ({ match }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [coinData, setCoinData] = useState(null);
    const { id: coinId } = useParams();
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:1000px)');


    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
        };

        axios
            .request(options)
            .then(function (response) {
                setCoinData(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [coinId]);

    return (
        <Box m="20px">
        {coinData ? (
            <Box>
            {/*GRID & CHARTS */}
            <Box
            display = "grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="auto"
            gap="20px"
            >
                {/*ROW 1 */}
                <Box
                sx={{
                  gridColumn: {
                    xs: 'span 12', // On extra small (xs) screens, span 12 columns
                    sm: 'span 12',  // On small (sm) screens, span 6 columns
                    md: 'span 12',  // On medium (md) screens, span 4 columns
                    lg: 'span 12',  // On large (lg) screens, span 3 columns
                  },
                  backgroundColor: colors.primary[400],
                  display: 'inline',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  height: {
                    xs: '50vh', // On extra small (xs) screens, set height to 50vh
                    sm: '50vh', // On small (sm) screens, set height to 50vh
                    md: '75vh', // On medium (md) screens, set height to 75vh
                    lg: '75vh', // On large (lg) screens, set height to 75vh
                },
                  width: "100%"
                  
                  
                }}
                >
                    
                    <Box m="20px" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                        <Typography variant={isSmallScreen ? 'h6' : 'h1'}>{coinData.name}</Typography>
                        <img src={coinData.image.large} alt={coinData.name} width="30" style={{ margin: "20px" }}/>
                        </Box>
                        <Box >
                            <Typography variant={isSmallScreen ? 'h6' : 'h4'}>Current Price: </Typography>
                            <Typography variant={isSmallScreen ? 'h6' : 'h4'}> {coinData.market_data.current_price.usd} USD</Typography>

                            
                            
                            <h4 style={{ color: coinData.market_data.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                                {coinData.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                                {coinData.market_data.price_change_percentage_24h} %
                            </h4>

                        </Box>
                    </Box>

                    <Box  sx={{
                        width: isSmallScreen ? '100%' : '500px', // Set width to 100% on small screens
                        height: isSmallScreen ? '200px' : '300px', // Adjust height on small screens
                        marginLeft: isSmallScreen ? '0px' : isMediumScreen ? '50px' : '250px' // Adjust margin on small screens
                    }} alignItems="center" justifyContent="center" >
                        <CoinChart coinId={coinData.id} />
                    </Box>
                    
                    

                </Box>

                

            </Box>



                
                
            </Box>
        ) : (
            <p>Loading...</p>
        )}
    </Box>
    );
};

export default CoinDetails;