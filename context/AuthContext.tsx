import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    // State to hold user information
    const [user, setUser] = useState({
        avatar: "https://sme.hust.edu.vn/wp-content/uploads/2022/02/Avatar-Facebook-trang.jpg",
    });

    // Function to update user information
    const updateUser = (newUserInfo) => {
        setUser(newUserInfo);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
