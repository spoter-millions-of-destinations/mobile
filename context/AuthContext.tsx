import React, { createContext, useState } from "react";
import { User } from "@/services/user.service";

// Define the UserContext type
type UserContextType = {
    user: User | null;
    updateUser: (newUserInfo: User) => void;
};

// Create the context
export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {}, // Placeholder function
});

// Create the provider component
export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    const updateUser = (newUserInfo: User) => {
        setUser(newUserInfo);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
