import React, { useState, createContext } from 'react';

// Create Context
export const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};