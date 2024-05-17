import React from 'react';
import { useState } from "react";
import {Routes, Route} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Form from './scenes/form';
import SignInForm from './scenes/form/sign-in';

import FAQ from './scenes/faq';
import CoinSearch from './data/CoinSearch';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Calender from './scenes/calendar';
import CryptoWallet from './scenes/cryptoWallet';
import CoinInfo from './data/CoinInfo';

import { tokens } from './theme';

function App() {
  
  

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false); 

  // Define media queries
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const width = isSmallScreen ? '90%' : (isMediumScreen ? 'calc(100% - 50px)' : (isCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 270px)'));


  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
       
        <CssBaseline />

          <div className="app">
          <Sidebar isSidebar={isSidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
            <main className="content" style={{ marginLeft: isSmallScreen && isSidebar ? '50px' : (isCollapsed ? '70px' : '270px'), width , borderLeft: `1px solid ${colors.grey[700]}`,}}>
              <Topbar setIsSidebar={setIsSidebar} isCollapsed={isCollapsed}/>
              <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/form" element={<Form/>}/>
              <Route path="/coin/:id" element={<CoinInfo />} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/search" element={<CoinSearch />} />
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/wallet" element={<CryptoWallet />} />
              
              </Routes>
            </main>
            

          </div>
       
        
         
        
      </ThemeProvider>
      </ColorModeContext.Provider>

    </Provider>
    
  );
}


export default App;
