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

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [newAppointments, setNewAppointments] = useState([]);

    const updateNewAppointments = (newAppointment) => {
        setNewAppointments((prev) => [...prev, newAppointment]);
    };

    return (
        <AppointmentContext.Provider value={{ newAppointments, updateNewAppointments }}>
            {children}
        </AppointmentContext.Provider>
    );
};
export const useNewAppointments = () => useContext(AppointmentContext);


// Create a context for Admin
const DoctorContext = createContext();

// Create a Provider Component
export const DoctorProvider = ({ children }) => {
  const [doctorDetails, setDoctorDetails] = useState(null); // Initialize with null

  const updateDoctorDetails = (details) => {
    setDoctorDetails(details);
  };

  return (
    <DoctorContext.Provider value={{ doctorDetails, updateDoctorDetails }}>
      {children}
    </DoctorContext.Provider>
  );
};

// Custom hook to use the Admin context
export const useDoctor = () => {
  return useContext(DoctorContext);
};




// Create a context for Admin
const AdminContext = createContext();

// Create a Provider Component
export const AdminProvider = ({ children }) => {
  const [adminDetails, setAdminDetails] = useState(null); // Initialize with null

  const updateAdminDetails = (details) => {
    setAdminDetails(details);
  };

  return (
    <AdminContext.Provider value={{ adminDetails, updateAdminDetails }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the Admin context
export const useAdmin = () => {
  return useContext(AdminContext);
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
