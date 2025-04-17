import React, { createContext, useEffect, useState } from 'react'
import { User } from '@/services/user.service'
import userService from '@/services/user.service'
import { router, useRouter } from 'expo-router'

// Define the UserContext type
type UserContextType = {
    user: User | null
    updateUser: (newUserInfo: User) => void
}

// Create the context
export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {}, // Placeholder
})

// Provider component
export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const updateUser = (newUserInfo: User) => {
        setUser(newUserInfo)
    }

    useEffect(() => {
        ;(async () => {
            try {
                const data = await userService.getMyInfo()
                setUser(data)
                //router.replace('/(tabs)/feed')
                router.replace('/auth/StartScreen')
            } catch (err) {
                console.log('Chưa login, chuyển hướng tới /auth/login')
                router.replace('/auth/login')
            }
        })()
    }, [])

    return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}
