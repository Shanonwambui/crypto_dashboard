import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import CoinChart from './CoinChart';



const CoinDetails = ({ match }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [coinData, setCoinData] = useState(null);
    const { id: coinId } = useParams();

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
                  
                  
                }}
                >
                    
                    <Box m="20px" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                        <h1>{coinData.name}</h1>
                        <img src={coinData.image.large} alt={coinData.name} width="30" style={{ margin: "20px" }}/>
                        </Box>
                        <Box m="20px">

                        <h3> {coinData.market_data.current_price.usd} USD</h3>
                        
                        <h4 style={{ color: coinData.market_data.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                            {coinData.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                            {coinData.market_data.price_change_percentage_24h} %
                        </h4>

                    </Box>
                    </Box>

                    <Box m="20px">
                        <CoinChart coinId={coinData.id} />
                    </Box>
                    
                    

                </Box>

                {/*ROW 2 */}
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
                  
                  
                }}
                >
                    
                    <Box m="20px" >
                        <h1>Fun fact</h1>
                        <p>{coinData.description.en}</p>
                       
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