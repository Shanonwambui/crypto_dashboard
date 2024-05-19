import React from 'react';
import CoinDetails from './CoinDetails';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from '../components/Header'; 


const CoinInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   

  return (
    <Box p="20px" sx={{backgroundColor: colors.primary[400]}} height="110vh" marginTop="60px">
       <Header title="CRYPTO INFO" subtitle="Discover detailed information about your coin!"/>

        <CoinDetails />

    </Box>
  );
};

export default CoinInfo;