import { Box, Button } from "@mui/material"
import { Typography } from "@mui/material"
import { tokens } from "../theme"
import { useTheme } from '@mui/material/styles';

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import InputBase  from "@mui/material/InputBase";
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';




const Wallet = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedButton, setSelectedButton] = useState('Buy');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [currencyAnchorEl, setCurrencyAnchorEl] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [selectedPayment, setSelectedPayment] = useState('creditCard');

    const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (coin) => {
        setSelectedCoin(coin);
        handleClose();
    };


const handleCurrencyClick = (event) => {
    setCurrencyAnchorEl(event.currentTarget);
  };
  
  const handleCurrencyClose = () => {
    setCurrencyAnchorEl(null);
  };
  
  const handleCurrencyMenuItemClick = (currency) => {
    setSelectedCurrency(currency);
    handleCurrencyClose();
  };

    



    return (
      
            
            <Box sx={{backgroundColor: colors.primary[500], borderRadius: "10px" }} >
                <Box sx={{ borderBottom: '1px solid grey', padding: "5px" }}>
                    <Box display="flex"  m="20px">
                        <Typography variant="h5">Wallet Value</Typography>
                        <Typography variant="h6" color={colors.greenAccent[400]} sx={{backgroundColor: colors.greenAccent[800], borderRadius: "4px", marginLeft: "10px", paddingRight: "5px"}}> <KeyboardArrowUpOutlinedIcon sx={{width: "20px", height: "10px"}} /> 12.2%</Typography>

                    </Box>
                    <Box m="20px">
                        <Typography variant="h5">$ 132,12933.000</Typography>
                        <Typography variant="h6" color={colors.grey[500]}>12 BTC</Typography>
                        
                    </Box>
                </Box>
                <Box padding="10px" display="flex" justifyContent="space-between" m="20px" sx={{backgroundColor: colors.primary[400], borderRadius: "5px"}}>
                    <Button  onClick={() => setSelectedButton('Buy')} sx={{ '&: hover': {
                            border: `1px solid ${colors.grey[300]}`,
                            color: colors.blueAccent[400]
                        },  width: "50%", backgroundColor: selectedButton === 'Buy' ? colors.blueAccent[400] : colors.primary[400], marginRight: "10px", color: colors.grey[100], fontWeight: "bold"}}>Buy</Button>
                    <Button 
                     onClick={() => setSelectedButton('Sell')}
                    sx={{
                        width: "50%",
                        '&: hover': {
                            border: `1px solid ${colors.grey[300]}`,
                            color: colors.blueAccent[400]
                        },
                        marginLeft: "10px",
                        backgroundColor: selectedButton === 'Sell' ? colors.blueAccent[400] : colors.primary[400],
                        color: colors.grey[100], 
                        fontWeight: "bold"
                        }}>Sell</Button>

                </Box>
                <Box m="20px" border="1px solid grey" borderRadius="5px" display="flex" sx={{backgroundColor: colors.primary[400],}}>
               
                    <Box sx={{width: "90%",  borderRadius: "5px"}}>
                        <InputBase 
                        sx={{ml:2, flex:1, color: colors.grey[100], mt:0.9}}
                        inputProps={{ placeholder: "Select Currency" }}/>
                    </Box>
                    <Box sx={{borderLeft: "1px solid grey"}} display="flex" padding="10px">
                        <Typography variant="h5">{selectedCoin}</Typography>
                        <ArrowDropDownOutlinedIcon sx={{marginLeft: "10px"}} onClick={handleClick} />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}

                        >
                            <MenuItem onClick={() => handleMenuItemClick('BTC')}>BTC</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('ETH')}>ETH</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('DASH')}>DASH</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('LTC')}>LTC</MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick('NEO')}>NEO</MenuItem>
                            
                            {/* Add more MenuItem components for other coins */}
                        </Menu>
                        
                    </Box>
                    
                   
                </Box>
                <Box m="20px" border="1px solid grey" borderRadius="5px" display="flex" sx={{backgroundColor: colors.primary[400],}}>
               
                    <Box sx={{width: "90%",  borderRadius: "5px"}}>
                        <InputBase 
                        sx={{ml:2, flex:1, color: colors.grey[100], mt:0.9}}
                        inputProps={{ placeholder: "36,335.00" }}/>
                    </Box>
                    <Box sx={{borderLeft: "1px solid grey"}} display="flex" padding="10px">
                        <Typography variant="h5">{selectedCurrency}</Typography>
                        <ArrowDropDownOutlinedIcon sx={{marginLeft: "10px"}} onClick={handleCurrencyClick} />
                        <Menu
                            anchorEl={currencyAnchorEl}
                            open={Boolean(currencyAnchorEl)}
                            onClose={handleCurrencyClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}

                        >
                            <MenuItem onClick={() => handleCurrencyMenuItemClick('USD')}>USD</MenuItem>
                            <MenuItem onClick={() => handleCurrencyMenuItemClick('EUR')}>EUR</MenuItem>
                            <MenuItem onClick={() => handleCurrencyMenuItemClick('USD')}>AED</MenuItem>
                            <MenuItem onClick={() => handleCurrencyMenuItemClick('EUR')}>AUD</MenuItem>
                            
                            
                            
                            {/* Add more MenuItem components for other coins */}
                        </Menu>
                        
                    </Box>
                    
                   
                </Box>
                <Box display="flex" justifyContent="space-between" m="20px">
                    <Box display="flex">
                        <Typography variant="h5" m="5px">Price:</Typography>
                        <Typography variant="h6" m="5px" sx={{color: colors.grey[400]}}> 36,335.00</Typography>
                    </Box>
                    <Typography variant="h5" m="5px">BTC</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" m="20px">
                    <Box display="flex">
                        <Typography variant="h5" m="5px">Amount:</Typography>
                        <Typography variant="h6" m="5px" sx={{color: colors.grey[400]}}> 2,344,543.00</Typography>
                    </Box>
                    <Typography variant="h5" m="5px">LTC</Typography>
                </Box>
                <Box display="flex" m="20px">
                    <Typography variant="h5" m="5px">Total:</Typography>
                    <Typography variant="h6" m="5px" sx={{color: colors.grey[400]}}> 22.00 BTC</Typography>
                </Box>
                <Box m="20px">
                    <Typography sx={{color: colors.greenAccent[400]}}>Additional Charges: 0.32%(0.0001231 BTC)</Typography>
                </Box>
                <Box m="20px">
                    <Typography >SELECT PAYMENT METHOD:</Typography>
                    <Box display="flex">
                        <Button sx={{border: "1px solid grey", borderRadius: "5px", width: "50%", color: colors.grey[100], display: 'flex', justifyContent: 'flex-start'}}>
                            <Radio
                            checked={selectedPayment === 'creditCard'}
                            onChange={handlePaymentChange}
                            value="creditCard"
                            sx={{ '&.Mui-checked': { color: colors.blueAccent[400] } }}// Change this to 'secondary' if you want the radio button to be purple when selected
                            />
                            Credit/Debit Card
                        </Button>
                        <Button sx={{border: "1px solid grey", borderRadius: "5px", width: "50%", color: colors.grey[100], fontWeight: "bold", marginLeft: "10px", display: 'flex', justifyContent: 'flex-start'}}>
                            <Radio
                            checked={selectedPayment === 'bankTransfer'}
                            onChange={handlePaymentChange}
                            value="bankTransfer"
                            sx={{ '&.Mui-checked': { color: colors.blueAccent[400] } }}// Change this to 'secondary' if you want the radio button to be purple when selected
                            />
                            Bank Transfer
                        </Button>
                        </Box>
                </Box>
                <Box m="20px">
                    <Button sx={{backgroundColor: colors.blueAccent[400], color: colors.grey[100], fontWeight: "bold", width: "100%", borderRadius: "5px", marginBottom: "20px"}}>BUY</Button>

                </Box>

            </Box>
            
           
        
    )
};

export default Wallet;