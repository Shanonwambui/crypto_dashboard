import React from "react";
import { Typography, Box, useTheme, useMediaQuery  } from "@mui/material";
import {tokens } from "../theme";

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <Box mb="30px">
            <Typography 
            variant={isSmallScreen ? 'h4' : 'h2'} 
            color={colors.grey[100]} 
            fontWeight="bold" 
            sx={{mb: "5px"}}
            >{title}</Typography>
        <Typography variant={isSmallScreen ? 'h6' : 'h5'}  color={colors.greenAccent[400]}>
            {subtitle}
        </Typography>
    </Box>)
}

export default Header;