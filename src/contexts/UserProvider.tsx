// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null); // Initialize with null

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null); // null, 'doctor', or 'admin'

    const login = (userRole) => {
        setRole(userRole);
    };

    const logout = () => {
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
