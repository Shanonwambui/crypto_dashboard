import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CryptoList from "../../data/CryptoList";
import  { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const columns = [
        {field: "id", headerName: "ID", flex: 1},
        {field: "symbol", headerName: "Symbol", flex:  1},
    
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
            headerName: "24h Price Change",
            renderCell: (params) => (
                <div style={{ color: params.value >= 0 ? 'green' : 'red' }}>
                    {params.value >= 0 ? '↑' : '↓'} {params.value}%
                </div>
            ),
        },
        
       
    ];

    const { cryptoData } = CryptoList();

    return (
        <Box m="20px">
            <Header title="CRYPTO DASHBOARD" subtitle="Welcome to your crypto dashboard"/>
            <Box 
            m={{ xs: "0px", md: "0px" }}
            mt={{ xs: "0px", md: "20px" }}
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
                    backgroundColor: colors.blueAccent[700], 
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400], 
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop:"none",
                    backgroundColor: colors.blueAccent[700], 
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                
            }}>
                <DataGrid rows={cryptoData} 
                columns={columns} 
                pageSize={5} 
                onRowClick={(row) => navigate(`/coin/${row.id}`)} />
            </Box>
        </Box>
    );
}

export default Dashboard;