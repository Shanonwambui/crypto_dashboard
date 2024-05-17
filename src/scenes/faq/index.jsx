import React from "react";
import {Box, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ =() => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box p="20px" sx={{backgroundColor: colors.primary[400]}} height="100vh" marginTop="60px"
        >
            <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

            <Accordion  >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.grey[100]} variant="h5">
                        What is a cryptocurrency exchange?

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>
                        Cryptocurrency exchanges are digital marketplaces that enable users to buy and sell cryptocurrencies like Bitcoin, Ethereum, and Tether. The Binance exchange is the largest crypto exchange by trade volume.

                        </Typography>
                    </AccordionDetails>
            </Accordion>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.grey[100]} variant="h5">
                        How to track cryptocurrency prices

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>
                        The easiest way to track the latest cryptocurrency prices, trading volumes, trending altcoins, and market cap is the Cryptocurrency Directory. Click on the coins to know historical coin prices, 24-hour trading volume, and the price of cryptocurrencies like Bitcoin, Ethereum, BNB and others in real-time.

                        </Typography>
                    </AccordionDetails>
            </Accordion>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.grey[100]} variant="h5">
                    What is a crypto wallet?

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>
                        A crypto wallet is a software application that allows you to store, send, and receive cryptocurrency. It does not physically store the cryptocurrency itself, but rather the private keys that grant access to it.

                        </Typography>
                    </AccordionDetails>
            </Accordion>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.grey[100]} variant="h5">
                    What are the benefits of using cryptocurrency?

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>
                        Transactions are encrypted and recorded on a distributed ledger, making them highly secure and resistant to fraud.

                        </Typography>
                        <Typography>
                        Cryptocurrency is not controlled by any government or financial institution, offering greater autonomy and independence.
                        </Typography>
                        <Typography>
                        Cryptocurrency prices can be highly volatile, offering the potential for significant gains.
                        </Typography>
                    </AccordionDetails>
            </Accordion>

            <Accordion >
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.grey[100]} variant="h5">
                    What are the risks of using cryptocurrency?

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Typography>
                        Cryptocurrency prices can fluctuate significantly, leading to potential losses.

                        </Typography>
                    </AccordionDetails>
            </Accordion>



        </Box>
    );
};

export default FAQ;