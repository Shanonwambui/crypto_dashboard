import React from 'react';
import { useState } from "react";
import {Routes, Route} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Form from './scenes/form';
import { UserProvider } from "./UserContext";
import CoinDetails from './data/CoinDetails';
import FAQ from './scenes/faq';
import SearchContext from './SearchContext';
import CoinSearch from './data/CoinSearch';

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [searchInput, setSearchInput] = useState('');

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SearchContext.Provider value={{searchInput, setSearchInput}}>
        <CssBaseline />
         <UserProvider>
          <div className="app">
          <Sidebar isSidebar={isSidebar}/>
            <main className="content" style={{ marginLeft: isSmallScreen && isSidebar ? '50px' : '0' }}>
              <Topbar setIsSidebar={setIsSidebar}/>
              <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/form" element={<Form/>}/>
              <Route path="/coin/:id" element={<CoinDetails />} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/search" element={<CoinSearch />} />


              </Routes>
            </main>
            

          </div>
         </UserProvider>
        
          </SearchContext.Provider>
        
      </ThemeProvider>
      </ColorModeContext.Provider>
  );
}


export default App;
