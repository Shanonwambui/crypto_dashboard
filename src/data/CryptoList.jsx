import { useState, useEffect } from 'react';
import axios from 'axios';


const CryptoList = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {vs_currency: 'usd'},
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
        };
        const fetchData = () => {

            axios
                .request(options)
                .then(function (response) {
                    const dataWithIds = response.data.map((item, index) => ({ id: index, ...item }));
                    setCryptoData(dataWithIds);
                    setIsLoading(false);

                })
                .catch(function (error) {
                    console.error(error);
                });
        };
        fetchData(); // Call once immediately
        const intervalId = setInterval(fetchData, 20000); // Call every 20 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount

       

    }, []); 

    return { cryptoData, isLoading };
};

export default CryptoList;