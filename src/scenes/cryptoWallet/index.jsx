import React from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../components/Header';
import Wallet from '../../components/wallet';


const CryptoWallet = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 



    return (
        <Box p="20px" sx={{backgroundColor: colors.primary[400]}} marginTop="60px">
            <Header title="CRYPTO WALLET" subtitle="Welcome to your crypto wallet"/>
            <Wallet />
        </Box>
        
    )
};

export default CryptoWallet;