import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Box,  Toolbar,  useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useMediaQuery } from '@mui/material';
import {Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CoinChart from './CoinChart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoinDetails, selectCoinId } from '../redux/state/coin-details/CoinDetailSlice';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const CoinDetails = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const coinData = useSelector((state) => state.coinDetails.coinDetails);
    const [activeButton, setActiveButton] = useState('1D');
    const coinId = useSelector(selectCoinId);
     // Define media queries
     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
     const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
 
     const displayStatitics = isSmallScreen ? 'inline' : 'flex';
     const borderBottom = isSmallScreen ? 'none' : '1px solid grey';
     

     const useStyles = makeStyles({
        root: {
          minWidth: isSmallScreen ? "20px" : "auto"  // replace 'your desired value' with the value you want
        },
      });
 


    useEffect(() => {
       
     
        dispatch(fetchCoinDetails(coinId));
        
        
    }, [ dispatch, coinId]);

    const classes = useStyles();



       
  

    return (
        <Box   sx={{backgroundColor: colors.primary[400]}}>
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
                    xs: 'span 12', 
                    sm: 'span 12',  
                    md: 'span 8',  
                    lg: 'span 8',  
                  },
                  backgroundColor: colors.primary[500],
                  display: 'inline',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  height: {
                    xs: '50vh', // On extra small (xs) screens, set height to 50vh
                    sm: '50vh', // On small (sm) screens, set height to 50vh
                    md: '75vh', // On medium (md) screens, set height to 75vh
                    lg: '75vh', // On large (lg) screens, set height to 75vh
                },
                  width: "100%"
                }}
                >
                    
                    <Box  borderBottom="1px dashed grey" height={isSmallScreen ? "100px":"130px"} >
                        <Box p="10px" paddingBottom={isSmallScreen ? "0px" : "auto"} display={displayStatitics} alignItems="center" justifyContent="space-between" borderBottom={borderBottom}  height={isSmallScreen ? "40px" : "60px"}>
                            <Typography variant={isSmallScreen ? 'h6' : 'h4'} color={colors.grey[400]} fontWeight="bold" paddingLeft={isSmallScreen ? "15px" : "auto"}>Crypto Statistics</Typography>
                            <Toolbar >
                                <Button  style={{ backgroundColor: activeButton === '1D' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`, borderRight: `1px solid ${colors.blueAccent[400]}`, color: activeButton === '1D' ? colors.grey[100] : colors.blueAccent[400] , borderTopRightRadius: 0, borderBottomRightRadius: 0}} classes={{ root: classes.root }}  onClick={() => setActiveButton('1D')}>1D</Button>
                                <Button  style={{ backgroundColor: activeButton === '1W' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`,  borderRight: `1px solid ${colors.blueAccent[400]}`, color: activeButton === '1W' ? colors.grey[100] : colors.blueAccent[400] , borderRadius: 0 }} classes={{ root: classes.root }}   onClick={() => setActiveButton('1W')}>1W</Button>
                                <Button  style={{ backgroundColor: activeButton === '1M' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`,  borderRight: `1px solid ${colors.blueAccent[400]}`, color: activeButton === '1M' ? colors.grey[100] : colors.blueAccent[400] , borderRadius: 0}} classes={{ root: classes.root }}   onClick={() => setActiveButton('1M')}>1M</Button>
                                <Button  style={{ backgroundColor: activeButton === '3M' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`,  borderRight: `1px solid ${colors.blueAccent[400]}`, color: activeButton === '3M' ? colors.grey[100] : colors.blueAccent[400] , borderRadius: 0 }} classes={{ root: classes.root }}   onClick={() => setActiveButton('3M')}>3M</Button>
                                <Button  style={{ backgroundColor: activeButton === '6M' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`,  borderRight: `1px solid ${colors.blueAccent[400]}`, color: activeButton === '6M' ? colors.grey[100] : colors.blueAccent[400] , borderRadius: 0 }} classes={{ root: classes.root }}   onClick={() => setActiveButton('6M')}>6M</Button>
                                <Button  style={{ backgroundColor: activeButton === '1Y' ? `rgba(132, 90, 223, 1)` : `rgba(132, 90, 223, 0.1)`, color: activeButton === '1Y' ? colors.grey[100] : colors.blueAccent[400] , borderTopLeftRadius: 0 , borderBottomLeftRadius: 0 }} classes={{ root: classes.root }}   onClick={() => setActiveButton('1Y')}>1Y</Button>
                            </Toolbar>

                        </Box>
                        <Box display="flex"  height="70px">
                            <Box marginRight={isSmallScreen ? "0px" : "60px"}>
                            <img src={coinData.image.large} alt={coinData.name} width={isSmallScreen ? "20px" : "30px" } style={{ margin: isSmallScreen ? "5px 5px 20px" : "20px" }}/>
                            </Box>
                       
                        <Box margin="10px" marginBottom="10px" height="70px" marginRight={isSmallScreen ?  "5px":  "40px"}>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} color={colors.grey[400]} >Symbol </Typography>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} color={colors.grey[400]} fontWeight="bold">{coinData.symbol.toUpperCase()}</Typography>
                        </Box>
                        <Box margin="10px" marginBottom="10px" height="70px" marginRight={isSmallScreen ?  "5px":  "40px"}>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} color={colors.grey[400]} >Current price </Typography>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} color={colors.grey[400]} fontWeight="bold">{coinData.market_data.current_price.usd}</Typography>
                        </Box>

                        <Box margin="10px" marginBottom="10px" height="70px" marginRight={isSmallScreen ?  "5px":  "40px"}>
                            <Typography variant={isSmallScreen ? 'h6' : 'h5'} color={colors.grey[400]} >Price Change (24h)</Typography>
                        <h4 style={{ color: coinData.market_data.price_change_percentage_24h >= 0 ? colors.greenAccent[500] : colors.redAccent[500],  marginTop: "0px"}}>
                                {coinData.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                                {coinData.market_data.price_change_percentage_24h} %
                            </h4>

                        </Box>
                        
                       
                       

                        {!isSmallScreen && (
                            <Box margin="10px" height="70px">
                                <Typography variant='h5' color={colors.grey[400]}>Market Cap</Typography>
                                <Typography variant='h5' color={colors.grey[400]} fontWeight="bold">{coinData.market_data.market_cap.usd} $</Typography>
                            </Box>
                            )}


                        
                        
                        </Box>
                        
                    </Box>

                    <Box  sx={{
                        padding: '20px',
                        width: isSmallScreen ? '110%' : '500px', // Adjust width to 100% on small screens
                        height: isSmallScreen ? '200px' : '300px', // Adjust height on small screens
                        marginTop: isSmallScreen ? '50px' : 'auto', // Adjust margin on small screens
                        marginLeft: isSmallScreen ? '-30px' : isMediumScreen ? '50px' : '100px' // Adjust margin on small screens
                    }} alignItems="center" justifyContent="center" >
                        <CoinChart coinId={coinData.id} />
                    </Box>
                    
                    

                </Box>
                <Box sx={{
                  gridColumn: {
                    xs: 'span 12', 
                    sm: 'span 12',  
                    md: 'span 4',  
                    lg: 'span 4',  
                  },
                  backgroundColor: colors.primary[500],
                  display: 'inline',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  height: {
                    xs: '50vh', // On extra small (xs) screens, set height to 50vh
                    sm: '50vh', // On small (sm) screens, set height to 50vh
                    md: '75vh', // On medium (md) screens, set height to 75vh
                    lg: '75vh', // On large (lg) screens, set height to 75vh
                }}}>
                    <Box  borderBottom="1px solid grey" height="40px">
                        <Typography variant={isSmallScreen ? 'h6' : 'h4'} m="20px" color={colors.grey[400]} fontWeight="bold">{coinData.name} Price Statistics</Typography>
                    
                    </Box>
                    <Box  display="flex" justifyContent="space-between" borderBottom="1px dashed grey">
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.name} value in USD </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px"> {coinData.market_data.current_price.usd} $</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" borderBottom="1px dashed grey" >
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">Price change  </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px" fontWeight="bold" style={{ color: coinData.market_data.price_change_percentage_24h >= 0 ? colors.greenAccent[500] : colors.redAccent[500] }}>
                        {coinData.market_data.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                            {coinData.market_data.price_change_percentage_24h}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" borderBottom="1px dashed grey">
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">Market Cap Rank </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_cap_rank}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" borderBottom="1px dashed grey">
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">Market Cap </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_data.market_cap.usd} $</Typography>
                    </Box>
                   
        
                    <Box display="flex" justifyContent="space-between" borderBottom="1px dashed grey">   
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">High (24h) </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_data.high_24h.usd} $</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" borderBottom={isSmallScreen ? "none" : "1px dashed grey"}>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">Low (24h) </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_data.low_24h.usd} $</Typography>
                    </Box>
                    {!isSmallScreen && (<Box display="flex" justifyContent="space-between" borderBottom={isSmallScreen ? "none" : "1px dashed grey"} >
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">All Time High </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_data.ath.usd} $</Typography>
                    </Box>)}
                   {!isSmallScreen && ( <Box display="flex" justifyContent="space-between">
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">All Time Low </Typography>
                        <Typography variant={isSmallScreen ? 'h6' : 'h5'} m="15px">{coinData.market_data.atl.usd} $</Typography>
                    </Box>)}
                </Box>

                

            </Box>



                
                
            </Box>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress style={{ color: "white" }} />
            </div>
        )}
    </Box>
    );
};

export default CoinDetails;