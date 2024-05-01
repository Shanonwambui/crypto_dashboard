
import { Box } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import  { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from 'react';

const ExchangeTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: isSmallScreen ? 0.8 : 1},
    { field: 'market_type', headerName: 'Market Type', flex: 1 },
    {
      field: 'thumb',
      headerName: 'Logo',
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="exchange logo" width="20" height="20" />
      ),
    },
  ];

  const columnVisibilityModel = {
    id: !matches && !isSmallScreen,
    market_type: !matches && !isSmallScreen,
    
    };

  return (
    <Box
    m={{ xs: "0px", md: "0px" }}
    mt={{ xs: "0px", md: "-10px" }}
  
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
        
    }}
    >
        <DataGrid rows={data} columns={columns} pageSize={5} columnVisibilityModel={columnVisibilityModel}/>

    </Box>
    
  );
};

export default ExchangeTable;