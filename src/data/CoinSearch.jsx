import React, {  useEffect,  } from 'react';
import { Box } from '@mui/material';
import CoinBar from './CoinBar';
import ExchangeTable from './searchTables/ExchangeTable';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import {Typography} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinData, selectSearchInput } from '../redux/state/search/SearchSlice'; // replace with actual path



const CoinSearch = () => {
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);
 const isSmallScreen = useMediaQuery('(max-width:600px)');

 const dispatch = useDispatch();
 const searchInput = useSelector(selectSearchInput);
 const coinData = useSelector(state => state.search.coinData);
 


  useEffect(() => {
    if (searchInput) {
      dispatch(fetchCoinData(searchInput));
    }
  }, [dispatch, searchInput]);

  return (
    <Box p="20px" marginTop="60px" sx={{backgroundColor: colors.primary[400]}}>
        <Box m="20px" sx={{ flex: 0.7 }}>
        {coinData && (
            <>
            <Typography variant={isSmallScreen ? 'h3' : 'h1'} gutterBottom>
            {coinData.coins[0].name} {/* Display the name of the coin */}
            </Typography>
           {/* Pass coinData to CoinBar */}
            </>
        )}
        </Box>
        <Box
        display = "grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="600px"
        gap="20px"
        
        >
            {/* Row 1*/}
            <Box 
            sx={{
                gridColumn: {
                xs: 'span 12', 
                sm: 'span 12',  
                md: 'span 12',  
                lg: 'span 12',  
                },
                backgroundColor: colors.primary[500],
                height: "75vh",
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: 4,
                width: "100%"
                
            }}>
              
            <Box  m={isSmallScreen ? '-90px 20px 20px 0px' : '20px'}  sx={{ width: isSmallScreen ? '300px' : '600px', // Set width to 100% on small screens
                        height: isSmallScreen ? '200px' : '300px', // Adjust height on small screens
                       }} >
            {coinData && <CoinBar data={coinData} />} {/* Pass coinData to CoinBar */}
            </Box>
        </Box>
                
            </Box>
                
                {/* Row 2*/}
            <Box
            sx={{
                gridColumn: {
                  xs: 'span 12',
                  lg: 'span 4',
                },
                gridRow:"span 2",
                overflow: "auto",
                marginTop: {
                  xs: '20px',
                  sm: '-20px',
                  md: '-20px', // margin-top for screens larger than 960px
                  lg: '-90px', // margin-top for screens larger than 1280px
                  
                } 
               
              }}
            >
                {coinData && coinData.exchanges && coinData.exchanges.length > 0 && (
                  <>
                    <h2>Exchanges</h2>
                    <ExchangeTable data={coinData.exchanges} />
                  </>
                )}
            </Box>

        </Box>

    
    
   
 
  );
};

export default CoinSearch;