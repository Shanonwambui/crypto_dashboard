import React from "react";
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { UserContext } from "../../UserContext";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import {Link} from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";


const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
         active={selected===title} 
         style={{color: colors.grey[100],
        }} 
         onClick={()=> setSelected(title)} 
         icon={icon}
         >
        <Typography>{title}</Typography>
        <Link to={to}/>
        </MenuItem>
    );

};


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user } = useContext(UserContext);

    useEffect(() => {
        setIsCollapsed(isMobile);
      }, [isMobile]);

    return (
        <Box sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
                width: isCollapsed ? (isMobile ? '50px' : '80px') : 'auto',
                
              },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
               
            },
            "& .pro-inner-item": {
                
                padding: isCollapsed ? (isMobile ?  "5px 35px 5px 10px !important" :"5px 35px 5px 20px !important" ): 'auto',
                marginRight: isMobile && isMobile ? '10px' : '0', 
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important"
            },
            "& .pro-menu-item.active" : {
                color: "#6870fa !important"
            },
            
            position: isMobile ? 'fixed' : 'relative', 
            zIndex: isMobile ? 1000 : 'auto', 
            height: isMobile ? '100%' : '100vh',
                   
}}>
            
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem 
                    onClick={()=>setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MapOutlinedIcon/> : undefined}
                    style={{
                        margin: "5px 0 20px 0",
                        color: colors.grey[100],
                    }}
                    >
                        {!isCollapsed && (
                            <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINS

                                </Typography>
                                <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>

                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px">
                            

                            <Box textAlign="center">
                                <Typography
                                 variant="h2" 
                                 color={colors.grey[100]} 
                                 fontWeight="bold" 
                                 sx={{m:"5px 0 0 0"}}
                                 >
                                    {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                                    </Typography>
                                <Typography
                                 variant="h5"
                                 color={colors.greenAccent[500]}
                                 >Crypto Admin</Typography>

                            </Box>

                        </Box>
                    )}
                    {/*MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item 
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected= {selected}
                            setSelected={setSelected}
                        />
                        
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: isCollapsed && isMobile ? "5px 0 5px 10px" : "5px 0 5px 20px" }}
                            >
                            Pages
                        </Typography>
                        <Item 
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon/>}
                            selected= {selected}
                            setSelected={setSelected}
                        />
                        
                        <Item 
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlinedIcon/>}
                            selected= {selected}
                            setSelected={setSelected}
                        />

                    </Box>

                </Menu>

            </ProSidebar>

        </Box>
    )
}

export default Sidebar;