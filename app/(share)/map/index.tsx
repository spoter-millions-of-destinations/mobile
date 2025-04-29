import { useNavigation } from '@react-navigation/native'
import Mapbox, { LocationPuck, PointAnnotation } from '@rnmapbox/maps'
import * as Location from 'expo-location'
import React, { useEffect, useMemo, useState } from 'react'
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { BackRightToLeft, LineDart, Microphone, Navigation, Pin5, PinMap, Save } from '@/assets/images/Button'

import { UserContext } from '@/context/AuthContext'
import attractionService from '@/services/attraction.service'

import { FloatingButtonComponent, Loading, SelectMapModal } from '@/components'
import postService, { Post, PostsQuery } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_PUBLIC_KEY_MAPBOX || '')

const MapScreen = () => {
    const { data } = useLocalSearchParams()
    console.log(data)

    const post: Post | null = useMemo(() => (data ? (JSON.parse(data as string) as Post) : null), [data])
    const navigation = useNavigation()
    const { user } = React.useContext(UserContext)

    const [urlMap, setUrlMap] = useState('mapbox://styles/phuocnguyen12/clz04sn5800gn01pheoolchfd')
    const [zoomLevel, setZoomLevel] = useState(50)
    const [userLocation, setUserLocation] = useState<[number, number]>([106.696, 10.776])
    const [selectedLoaction, setSelectedLoaction] = useState<Post | null>(null)

    const fetchPostsByZoomAndLocation = async ({
        queryKey,
    }: {
        queryKey: [string, number, [number, number]]
    }): Promise<Post[]> => {
        const [, zoom, location] = queryKey

        const [longitude, latitude] = location
        let query: PostsQuery = {
            limit: 100,
            offset: 0,
            longitude,
            latitude,
        }

        if (zoom > 14) {
            query.rate = 5
        } else {
            query.radius = 50000 // 50km
        }

        return await postService.getAllFeed(100, 1)
    }

    const {
        data: posts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts', zoomLevel, userLocation],
        queryFn: fetchPostsByZoomAndLocation,
        enabled: !!userLocation, // chỉ gọi khi đã có vị trí
    })

    // Lấy attractions
    const {
        data: attractions = [],
        isLoading: isAttractionLoading,
        error: attractionError,
    } = useQuery({
        queryKey: ['attractions'],
        queryFn: () => attractionService.getAllAttractions(0, 100),
    })

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
                return
            }
            if (post) {
                setUserLocation([+post.longitude, +post.latitude])
            } else {
                let {
                    coords: { longitude, latitude },
                } = await Location.getCurrentPositionAsync({})
                setUserLocation([108.181637, 16.0569])
            }
        })()
    }, [])
    if (isLoading) return <Loading />
    return (
        <View className="flex-1">
            <Mapbox.MapView
                style={{ flex: 1 }}
                zoomEnabled={true}
                rotateEnabled={true}
                styleURL={Mapbox.StyleURL.Outdoors}
                onMapIdle={(e) => {
                    // const newCenter = e.geometry?.coordinates as [number, number]
                    // const newZoom = e.properties.zoomLevel

                    // if (newCenter) {
                    //     setUserLocation(newCenter)
                    //     setZoomLevel(newZoom)
                    // }
                    console.log(e)
                }}
            >
                {/* <SafeAreaView className="z-20">
                    <View className="flex-col items-end justify-between px-6 ">
                        <View>
                            <View className="flex-row px-[20px] py-2 bg-neutral-50 rounded-[35px] shadow items-center w-full justify-between mb-[15]">
                                <View className="flex-row items-center justify-center">
                                    <PinMap className="mr-5" />
                                    <TouchableOpacity className="" onPress={() => {}}>
                                        <Text className="text-neutral-500 text-sm font-normal font-['Montserrat']">
                                            Search here...
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row items-center justify-center">
                                    <Microphone className="mr-5" />
                                    <Image
                                        source={user!.avatar}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 50,
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row justify-between">
                                <FloatingButtonComponent icon={<BackRightToLeft />} onPress={() => router.back()} />
                                {selectedLoaction && (
                                    <View className="w-[181px] h-[54px] px-5 py-[11px] bg-neutral-50 rounded-[15px] shadow justify-between items-center flex-row">
                                        <TouchableOpacity>
                                            <Text className="text-center text-[#4371e8] text-base font-semibold font-['Montserrat']">
                                                Post
                                            </Text>
                                        </TouchableOpacity>
                                        <LineDart />
                                        <TouchableOpacity>
                                            <Text className="text-center text-neutral-500 text-sm font-normal font-['Montserrat']">
                                                Infomation
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <SelectMapModal urlMap={urlMap} setUrlMap={setUrlMap} />
                            </View>
                        </View>
                        <View className="relative z-20 top-[600]">
                            <FloatingButtonComponent
                                style={{
                                    marginBottom: 20,
                                }}
                                icon={<Save />}
                                onPress={() => {}}
                            />

                            <FloatingButtonComponent onPress={() => {}} icon={<Navigation />} />
                        </View>
                    </View>
                </SafeAreaView> */}
                {posts &&
                    posts.map((post, index) => (
                        <PointAnnotation
                            key={`point-${index}`}
                            id={`point-${index}`}
                            coordinate={[+post.longitude, +post.latitude]}
                            onSelected={() => {
                                setSelectedLoaction(post)
                                router.push({
                                    pathname: '/(share)/map/post_pin',
                                    params: {
                                        data: JSON.stringify(post),
                                    },
                                })
                            }}
                        >
                            <ImageBackground
                                className="w-[30] h-[30] rounded-full overflow-hidden border-[#fafafa]"
                                style={{
                                    borderWidth: 2,
                                    width: 30,
                                    height: 30,
                                }}
                                source={{ uri: post.images[0] }}
                            />
                        </PointAnnotation>
                    ))}

                {attractions &&
                    attractions.map((attraction, index) => (
                        <PointAnnotation
                            draggable={false}
                            key={`point-${index}`}
                            id={`point-${index}`}
                            coordinate={[+attraction.longitude, +attraction.latitude]}
                            onSelected={() =>
                                router.push({
                                    pathname: '/(share)/map/attraction_pin',
                                    params: {
                                        data: JSON.stringify(attraction),
                                        dataType: 'attraction',
                                    },
                                })
                            }
                        >
                            <View className="relative">
                                <Pin5 width={40} height={40} />
                            </View>
                        </PointAnnotation>
                    ))}

                {userLocation && (
                    <>
                        <Mapbox.Camera
                            zoomLevel={17}
                            centerCoordinate={userLocation}
                            animationMode="flyTo"
                            animationDuration={6000}
                            pitch={60}
                        />
                        <LocationPuck
                            puckBearingEnabled={true}
                            visible={true}
                            pulsing={{
                                isEnabled: true,
                                color: 'teal',
                                radius: 50.0,
                            }}
                        />
                    </>
                )}
            </Mapbox.MapView>
            {/* {selectedLoaction && <BottomSheetMap info={selectedLoaction} />} */}
            <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
                <View className="flex-col items-end justify-between px-6">
                    {/* Search bar */}

                    <View className="flex-row pl-3 pr-3 py-2 bg-neutral-50 rounded-[35px] shadow items-center justify-between w-full mt-2">
                        <View className="flex-row items-center gap-x-3">
                            <PinMap className="mr-5" />
                            <TouchableOpacity onPress={() => {}}>
                                <Text className="text-sm font-normal text-neutral-500">Search here...</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row items-center gap-x-3">
                            <Microphone className="mr-5" />
                            <Image
                                source={user!.avatar}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                    </View>

                    {/* Buttons */}
                    <View className="flex-row items-center justify-between w-full mt-3">
                        <FloatingButtonComponent icon={<BackRightToLeft />} onPress={() => router.back()} />

                        {selectedLoaction && (
                            <View className="w-[181px] h-[54px] px-5 py-[11px] bg-neutral-50 rounded-[15px] shadow justify-between items-center flex-row">
                                <TouchableOpacity>
                                    <Text className="text-[#4371e8] text-base font-semibold">Post</Text>
                                </TouchableOpacity>
                                <LineDart />
                                <TouchableOpacity>
                                    <Text className="text-sm font-normal text-neutral-500">Information</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <SelectMapModal urlMap={urlMap} setUrlMap={setUrlMap} />
                    </View>
                </View>
            </SafeAreaView>

            {/* Floating Buttons */}
            <View className="absolute z-10 flex-col gap-3 space-y-4 bottom-10 right-5">
                <FloatingButtonComponent icon={<Save />} onPress={() => {}} />
                <FloatingButtonComponent icon={<Navigation />} onPress={() => {}} />
            </View>
        </View>
    )
}

export default MapScreen
