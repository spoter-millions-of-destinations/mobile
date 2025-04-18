import { tabBarStyle } from '@/app/(tabs)/_layout'
import { useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'

export const useHideBottonTab = () => {
    const navigation = useNavigation()
    return useLayoutEffect(() => {
        const parent = navigation.getParent()
        parent?.setOptions({
            tabBarStyle: { display: 'none' },
        })

        return () => {
            parent?.setOptions({
                tabBarStyle: tabBarStyle, // reset lại
            })
        }
    })
}
