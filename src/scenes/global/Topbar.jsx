import React from 'react';
import {Box, useTheme } from "@mui/material";
import  IconButton  from "@mui/material/IconButton"
import {useContext} from "react";
import { UserContext } from '../../UserContext';
import {Link} from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import InputBase  from "@mui/material/InputBase";
import  LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import  NotificationOutlinedIcon  from "@mui/icons-material/NotificationsOutlined";

import  PersonOutlinedIcon  from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from '@mui/icons-material/Search';

import { useMediaQuery } from "@mui/material";
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useContext(UserContext);

    return (<Box display = "flex" justifyContent="space-between" p={2}>
        {/*SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor = {colors.primary[400]} 
          borderRadius="3px"
          >
            <InputBase sx={{ml:2, flex:1}} placeholder = "Search"/>
            <IconButton type="button" sx={{p:1}}>
            <SearchIcon />
            </IconButton>
            
            
        </Box>
        <Box display="flex">
            <IconButton onClick = {colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon/>
                ): (
                    <LightModeOutlinedIcon/>

                )}
                
            </IconButton>
            {!isSmallScreen && ( // Render only if not on a small screen
                <>
                <IconButton>
                    <NotificationOutlinedIcon />
                </IconButton>
                
                </>
            )}
            <Link to="/form">
                <IconButton>
                 {user ? user.firstName[0] + user.lastName[0] : <PersonOutlinedIcon />}
                </IconButton>
            </Link>

                </Box> 
        

    </Box>)
}

export default Topbar;