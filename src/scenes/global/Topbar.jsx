import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, useTheme } from "@mui/material";
import  IconButton  from "@mui/material/IconButton"
import {useContext} from "react";
import { UserContext } from '../../UserContext';
import {Link} from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import SearchContext from '../../SearchContext';
import InputBase  from "@mui/material/InputBase";
import  LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import  PersonOutlinedIcon  from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from '@mui/icons-material/Search';


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { searchInput, setSearchInput } = useContext(SearchContext); // Get searchInput from context
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
      };
      const handleSearchSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            navigate('/search');
        }
      };

    return (<Box display = "flex" justifyContent="space-between" p={2}>
        {/*SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor = {colors.primary[400]} 
          borderRadius="3px"
          >
            <InputBase 
            sx={{ml:2, flex:1}} 
            placeholder = "Search"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
            />
            <IconButton type="button" sx={{p:1}} onClick={handleSearchSubmit}>
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
           
            <Link to="/form">
                <IconButton>
                 {user ? user.firstName[0] + user.lastName[0] : <PersonOutlinedIcon />}
                </IconButton>
            </Link>

                </Box> 
        

    </Box>)
}

export default Topbar;