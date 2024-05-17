import React from "react";
import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LineChart from "../data/LineChart";
import { useMediaQuery } from '@material-ui/core';




const StatBox =({title, subtitle, icon, price, coinid, percentage})=> {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const variant = isSmallScreen ? 'h6' : (isMediumScreen ? 'h5' : 'h4');
    



    return (

            <Box width="100%" m="0 10px">
            
                <Box display="flex" justifyContent="space-between">
                
                    <Box>
                        <Box display="flex" marginBottom="10px" marginTop={isSmallScreen ? "5px" : "20px"}>
                                <Box
                                width= {isSmallScreen ? "20px" : "35px"} 
                                height={isSmallScreen ? "20px" : "35px"} 
                                backgroundColor={colors.primary[400]}
                                borderRadius="50%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                marginLeft= '10px'
                                >
                                    {icon}
                                </Box>
                            
                                <Typography
                                variant={variant}
                                fontWeight="bold"
                                marginLeft="10px"
                                sx={{ color: colors.grey[900]}}
                                >
                                    {title}
                                </Typography>

                        </Box>
                        <Typography
                        variant="h6" sx={{color: colors.grey[400], marginLeft: '10px'}}
                        >
                            {subtitle ? subtitle.toUpperCase() : ''}  /USD

                        </Typography>
                        <Typography
                        variant={variant}
                        fontWeight="bold"
                        marginLeft= '10px'
                        sx={{color: colors.blueAccent[400]}}
                        >
                            {price}

                        </Typography>
                    </Box>
                
                


                    <Box  marginTop={isSmallScreen ? "-15px" : "0px"} >

                        
                        <Box  >
                            <LineChart coinid={coinid} percentage={percentage}/>
                        </Box>

                        <Typography
                            variant={variant}
                        
                            sx={{color: percentage > 0 ? colors.greenAccent[500] : colors.redAccent[500], marginLeft: '30px', marginTop: isSmallScreen ? "-25px" : "-15px"}}
                        >
                            {percentage > 0 ? <TrendingUpIcon /> :  <TrendingDownIcon />} {percentage} %
                        </Typography>

                    </Box>

                    </Box>



            </Box>

        
        
            

       
    );
};

export default StatBox;