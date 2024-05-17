import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, useTheme } from "@mui/material";
import  IconButton  from "@mui/material/IconButton"
import {useContext} from "react";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {Link} from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import Badge from '@mui/material/Badge';
import InputBase  from "@mui/material/InputBase";
import  LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import  PersonOutlinedIcon  from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput, selectSearchInput } from '../../redux/state/search/SearchSlice';
import { withStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';




const Topbar = ({ isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const dispatch= useDispatch();
    const searchInput = useSelector(selectSearchInput);

    const StyledBadge = withStyles({
        badge: {
          backgroundColor: colors.blueAccent[400],
          color: '#fff', // Assuming you want the text color to be white
        },
      })(Badge);

    const user = useSelector(state => state.user.user);

      // Define media queries
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));


    // Calculate width based on screen size
    const width = isSmallScreen ? '90%' : (isMediumScreen ? '90%' : (isCollapsed ? '95%' : '80%'));

      // Adjust marginRight based on screen size
    const marginRight = isSmallScreen ? '2px' : '5px';

  

    // Hide IconButton on small screens
    const displaySearch = isSmallScreen ? 'none' : 'flex';

    const justifyContent = isSmallScreen ? 'flex-end' : 'space-between';



    const navigate = useNavigate();
    

    const handleSearchChange = (event) => {
        dispatch(setSearchInput(event.target.value));
      };

    const handleSearchSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            navigate('/search');
        }
      };

    return (<Box position="fixed"  p={isCollapsed ? 1.25 : 1.75} sx={{ borderBottom: `1px solid ${colors.grey[700]}`, backgroundColor: colors.primary[500] , borderLeft: `1px solid ${colors.grey[700]}` }} width={width} zIndex="1000" >
        <Box display="flex" justifyContent={justifyContent}>
            {/*SEARCH BAR */}
        <Box
          display={displaySearch}
          
          borderBottom={`1px solid ${colors.grey[700]}`}
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
            <IconButton onClick = {colorMode.toggleColorMode} sx={{marginRight: "5px"}}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon/>
                ): (
                    <LightModeOutlinedIcon/>

                )}
                
            </IconButton>
            <Box display="flex" justifyContent="center" alignContent="center" p="4px"paddingTop="6px" sx={{marginRight}}>
                <img 
                alt="profile-user"
                width="25px"
                height="25px"
                src={"../../assets/kenyan_flag.png"}
                style={{cursor: "pointer", borderRadius:"50%"}}
                />

            </Box>
            <IconButton sx={{marginRight: "5px"}}>
            <StyledBadge badgeContent={4}>
                <NotificationsNoneOutlinedIcon />
            </StyledBadge>
                
            </IconButton>
           
            <Link to="/form" sx={{marginRight: "5px"}} >
                <IconButton sx={{height: "40px"}}>
                 {user ? user.firstName[0] + user.lastName[0] : <PersonOutlinedIcon />}
                </IconButton>
            </Link>

                </Box> 
        
        </Box>

    </Box>)
}

export default Topbar;