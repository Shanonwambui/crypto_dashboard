import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import  { DataGrid } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatBox from "../../components/StatBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCryptoData } from '../../redux/state/crypto/CryptoSlice';
import Wallet from "../../components/wallet";
import CoinDetails from "../../data/CoinDetails";
import { setCoinId } from "../../redux/state/coin-details/CoinDetailSlice";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const dispatch = useDispatch();

    const cryptoData = useSelector(state => state.crypto.data);
    const status = useSelector(state => state.crypto.status);



    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCryptoData());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress style={{ color: "white" }} />
            </div>
        );
        }
    const columns = [
        {field: "id", headerName: "ID", flex: 1},
        {field: "symbol", headerName: "Symbol", flex: isSmallScreen ? 0.5 : 1},
    
        {
            field: "name",
            headerName: "NAME",
            flex:  1,
            cellClassName: "name-column--cell"
        },
        {
            field: "image",
            headerName: "Logo",
            width: 100,
            flex: isSmallScreen ? 0.4 : 1,
            renderCell: (params) => (
                <img src={params.value} alt="crypto" width="20" height="20" />
            ),
        },
        {
            field: "current_price",
            headerName: "Current Price",
            flex: 1
        },
        {
            field: "market_cap",
            headerName: "Market Cap",
            flex: 1
        },
        {
            field: "price_change_percentage_24h",
            headerName: isSmallScreen ? "24 %" : "24h Price Change",
            flex: isSmallScreen ? 0.5 : 1,
            renderCell: (params) => (
                <div style={{ color: params.value >= 0 ? colors.greenAccent[500] : colors.redAccent[500], fontWeight: "bold" }}>
                    {params.value >= 0 ? '↑' : '↓'} {params.value}%
                </div>
            ),
        },
        
       
    ];

    const columnVisibilityModel = {
        id: !matches && !isSmallScreen,
        market_cap: !matches && !isSmallScreen,
        name: !matches && !isSmallScreen,
        current_price: !matches && !isSmallScreen,
        };

    

   
    const ethereumData = cryptoData.find(coin => coin.id === 'ethereum');
    const tetherData = cryptoData.find(coin => coin.id === 'tether');
    const litecoinData = cryptoData.find(coin => coin.id === 'litecoin');

    return (
        <Box p={isSmallScreen ? "10px" : "20px"} sx={{backgroundColor: colors.primary[400]}} marginTop="60px">
            <Header title="CRYPTO DASHBOARD" subtitle="Welcome to your crypto dashboard"/>
            <Box
            display = "grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows={isSmallScreen ? "100px" : "140px"}
            gap={isSmallScreen ? "10px" : "20px"}
            
           

            >
                {/* ROW 1 */}
                <Box
                sx={{
                  gridColumn: {
                    xs: 'span 12', // On extra small (xs) screens, span 12 columns
                    sm: 'span 12',  // On small (sm) screens, span 6 columns
                    md: 'span 6',  // On medium (md) screens, span 4 columns
                    lg: 'span 4',  // On large (lg) screens, span 3 columns
                  },
                  backgroundColor: colors.primary[500],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: "10px",
                  
                  
                }}
                >
                    <StatBox
                    title={ethereumData?.name}
                    subtitle={ethereumData?.symbol}
                    price={ethereumData?.current_price}
                    coinid={ethereumData?.id}
                    percentage={ethereumData?.price_change_percentage_24h}
                    icon={
                        <img src={ethereumData?.image} alt="ethereum" width="20" height="20" />
                    }
                    />
                    

                </Box>

                <Box
                sx={{
                  gridColumn: {
                    xs: 'span 12', // On extra small (xs) screens, span 12 columns
                    sm: 'span 6',  // On small (sm) screens, span 6 columns
                    md: 'span 6',  // On medium (md) screens, span 4 columns
                    lg: 'span 4',  // On large (lg) screens, span 3 columns
                  },
                  backgroundColor: colors.primary[500],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: "10px",
                  
                }}
                >
                    <StatBox
                    title= {tetherData?.name}
                    subtitle={tetherData?.symbol}
                    price={tetherData?.current_price}
                    coinid={tetherData?.id}
                    percentage={tetherData?.price_change_percentage_24h}
                    icon={
                        <img src={tetherData?.image} alt="tether" width="20" height="20" />
                    }
                    />
                    

                </Box>

                <Box
                sx={{
                  gridColumn: {
                    xs: 'span 12', // On extra small (xs) screens, span 12 columns
                    sm: 'span 6',  // On small (sm) screens, span 6 columns
                    md: 'span 6',  // On medium (md) screens, span 4 columns
                    lg: 'span 4',  // On large (lg) screens, span 3 columns
                  },
                  backgroundColor: colors.primary[500],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: "10px",
                  
                }}
                >
                    <StatBox
                    title={litecoinData?.name}
                    subtitle={litecoinData?.symbol}
                    price={litecoinData?.current_price}
                    coinid={litecoinData?.id}
                    percentage={litecoinData?.price_change_percentage_24h}
                    icon={
                        <img src={litecoinData?.image} alt="litecoin" width="20" height="20" />
                    }
                    />
                    

                </Box>



               


                
            </Box>

            
           
            
            {/* ROW 2 */}


            <Box marginTop="20px">
                <CoinDetails />
                
            </Box>

            {/* ROW 3 */}
            
            <Box height="800px" m="20px 0 0 0">
            <Wallet isDashboard={true} />
            </Box>
            

           



            {/* ROW 4 */}


            <Box 
            m={{ xs: "0px", md: "0px" }}
            mt={{ xs: "-75px", md: "-80px" }}
            height={{xs:"90vh", md:"75vh"}}
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[400], 
                    borderBottom: "none",
                    padding:"0",
                    color: colors.grey[900],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[500], 
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop:"none",
                    backgroundColor: colors.blueAccent[400], 

                    color: colors.grey[900],

                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontSize: isSmallScreen ? '0.8rem' : '0.9rem',
                    
                },
                '& .MuiTablePagination-root': { 
                    color: colors.grey[900],
                },
                '& .MuiTablePagination-actions .Mui-disabled': {
                    color: 'white !important',
                    },

                '& .MuiSvgIcon-root.MuiSelect-icon': {
                    color: 'white !important',
                    },
                
            }}>
                 {status === 'loading' ?  (
                    <CircularProgress />
                ) : (
                    <DataGrid rows={cryptoData} 
                    columns={columns} 
                    pageSize={5} 
                    onRowClick={(row) => {
                        dispatch(setCoinId(row.id)); // Dispatch the setCoinId action before navigating
                        navigate(`/coin/${row.id}`);
                    }} 
                    columnVisibilityModel={columnVisibilityModel}
                    />
                )}
            </Box>
        </Box>
    );
}

export default Dashboard;
