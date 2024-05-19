import React from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/Header';
import Wallet from '../../components/wallet';
import useMediaQuery from '@mui/material/useMediaQuery';


const CryptoWallet = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
 



    return (
        <Box p={isSmallScreen ? "10px" : "20px"} sx={{backgroundColor: colors.primary[400]}} marginTop="60px">
            <Header title="CRYPTO WALLET" subtitle="Welcome to your crypto wallet"/>
            <Wallet />
        </Box>
        
    )
};

export default CryptoWallet;