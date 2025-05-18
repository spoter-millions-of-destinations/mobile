import { useEffect, useMemo, useState } from 'react'
import * as Location from 'expo-location'

type LocationType = {
    data?: string
}
export const useUserLocation = ({ data }: LocationType) => {
    const [userLocation, setUserLocation] = useState<[number, number]>([106.696, 10.776])
    const coords: [number, number] | null = useMemo(
        () => (data ? (JSON.parse(data as string) as [number, number]) : null),
        [data],
    )
    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
                return
            }
            if (coords) {
                setUserLocation([+coords[0], +coords[1]])
            } else {
                let {
                    coords: { longitude, latitude },
                } = await Location.getCurrentPositionAsync({})
                setUserLocation([longitude, latitude])
            }
        })()
    }, [])
    return { userLocation, setUserLocation }
}
