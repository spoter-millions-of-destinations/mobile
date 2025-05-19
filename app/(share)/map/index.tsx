import { useNavigation } from '@react-navigation/native'
import Mapbox, { CircleLayer, LocationPuck, PointAnnotation, ShapeSource, SymbolLayer } from '@rnmapbox/maps'
import * as Location from 'expo-location'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    ActivityIndicator,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native'

import { BackRightToLeft, LineDart, Microphone, Navigation, Pin5, PinMap, Save } from '@/assets/images/Button'

import { UserContext } from '@/context/AuthContext'
import attractionService from '@/services/attraction.service'
import PinImage from '@/assets/images/pin-image.png'
import { FloatingButtonComponent, Loading, SelectMapModal } from '@/components'
import postService, { Post, PostsQuery } from '@/services/post.service'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { useUserLocation } from '@/hooks/useUserLocation'
import { color } from '@/constants/Colors'
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson'

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_PUBLIC_KEY_MAPBOX || '')
console.log('MAPBOX_ACCESS_TOKEN', process.env.EXPO_PUBLIC_PUBLIC_KEY_MAPBOX)

// Định nghĩa các level zoom
const LEVEL1_THRESHOLD = 10 // Dưới level này: hiển thị clusters
const LEVEL2_THRESHOLD = 14 // Giữa LEVEL1 và LEVEL2: hiển thị attractions
// Trên LEVEL2: hiển thị các posts
const PACKAGE_SIZES: Record<string, number> = {
    'Ruby package': 50,
    'Diamond package': 45,
    'Gold package': 40,
}
const DEFAULT_SIZE = 35

const MapScreen = () => {
    const { data, from } = useLocalSearchParams()
    const { userLocation, setUserLocation } = useUserLocation({ data } as { data: string })
    const { user } = React.useContext(UserContext)
    const { goToSearchDestination, showPostPin, showAttractionPin } = useNavigatHelper()
    const cameraRef = useRef<Mapbox.Camera>(null)
    const [postsMap, setPostsMap] = useState<Map<number, Post[]>>(new Map())
    const [urlMap, setUrlMap] = useState(Mapbox.StyleURL.Street)
    const [zoomLevel, setZoomLevel] = useState(0)
    const fetchedAttractionIdsRef = useRef<Set<number>>(new Set())
    // Lấy attractions
    const {
        data: attractions = [],
        isLoading: isAttractionLoading,
        error: attractionError,
    } = useQuery({
        queryKey: ['attractions'],
        queryFn: () => attractionService.getAllAttractions(0, 100),
    })

    const attractionsGeoJson: FeatureCollection = useMemo(
        () => ({
            type: 'FeatureCollection',
            features: attractions.map((attraction) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [+attraction.longitude, +attraction.latitude],
                },
                properties: {
                    id: attraction.id,
                    name: attraction.name,
                    // Thêm các thuộc tính khác nếu cần
                },
            })),
        }),
        [attractions],
    )

    useEffect(() => {
        if (zoomLevel > LEVEL2_THRESHOLD && !isAttractionLoading) {
            const fetchMissingPosts = async () => {
                const missing = attractions.filter(
                    (a) => !postsMap.has(a.id) && !fetchedAttractionIdsRef.current.has(a.id),
                )

                if (missing.length === 0) return
                console.log('Fetching posts for missing attractions:')

                const results = await Promise.all(
                    missing.map((a) =>
                        postService
                            .getPostsOfAttraction(0, 10, a.id)
                            .then((posts) => [a.id, posts] as [number, Post[]]),
                    ),
                )

                setPostsMap((prev) => {
                    const newMap = new Map(prev)
                    results.forEach(([id, posts]) => {
                        newMap.set(id, posts)
                        fetchedAttractionIdsRef.current.add(id)
                    })
                    return newMap
                })
            }

            fetchMissingPosts()

            return () => {
                fetchedAttractionIdsRef.current.clear()
            }
        }
    }, [zoomLevel, attractions, isAttractionLoading])

    if (isAttractionLoading) return <Loading />

    return (
        <View className="flex-1">
            <Mapbox.MapView
                style={{ flex: 1 }}
                zoomEnabled={true}
                rotateEnabled={true}
                styleURL={urlMap}
                onCameraChanged={(e) => {
                    const zoom = e.properties.zoom
                    if (zoom !== undefined) {
                        setZoomLevel(zoom)
                    }
                }}
            >
                <Mapbox.RasterDemSource id="mapbox-dem" url="mapbox://mapbox.terrain-rgb" tileSize={512}>
                    <Mapbox.Terrain sourceID="mapbox-dem" exaggeration={2} />
                </Mapbox.RasterDemSource>

                {/* Optional: 3D Building Layer */}
                <Mapbox.VectorSource id="composite" url="mapbox://mapbox.mapbox-streets-v8">
                    <Mapbox.FillExtrusionLayer
                        id="3d-buildings"
                        sourceLayerID="building"
                        minZoomLevel={0}
                        maxZoomLevel={24}
                        style={{
                            fillExtrusionColor: '#aaa',
                            fillExtrusionHeight: ['get', 'height'],
                            fillExtrusionBase: ['get', 'min_height'],
                            fillExtrusionOpacity: 0.6,
                        }}
                    />
                </Mapbox.VectorSource>
                <Mapbox.Images
                    images={{
                        attractionPin: PinImage,
                    }}
                />
                {/* LEVEL 1: Clusters - Chỉ hiển thị khi zoom thấp */}
                {zoomLevel <= LEVEL1_THRESHOLD && (
                    <Mapbox.ShapeSource
                        id="attractions"
                        shape={attractionsGeoJson}
                        cluster={true}
                        clusterRadius={50}
                        clusterMaxZoom={LEVEL1_THRESHOLD}
                        onPress={(e) => {
                            const { properties, geometry } = e.features[0]
                            if (properties?.cluster) {
                                // Zoom vào cụm để chuyển sang LEVEL 2
                                if (geometry.type === 'Point' && Array.isArray(geometry.coordinates)) {
                                    const [longitude, latitude] = geometry.coordinates
                                    const camera = cameraRef.current
                                    if (camera) {
                                        camera.setCamera({
                                            centerCoordinate: [longitude, latitude],
                                            zoomLevel: LEVEL1_THRESHOLD + 2, // Zoom đến level 2
                                            animationDuration: 1000,
                                        })
                                    }
                                }
                            }
                        }}
                    >
                        {/* Layer cho cụm (cluster) */}
                        <Mapbox.CircleLayer
                            id="clusterCircles"
                            filter={['has', 'point_count']}
                            style={{
                                circleColor: '#1d4ed8',
                                circleRadius: ['step', ['get', 'point_count'], 20, 10, 25, 20, 30],
                                circleOpacity: 0.8,
                                circleStrokeWidth: 2,
                                circleStrokeColor: '#ffffff',
                            }}
                        />

                        <Mapbox.SymbolLayer
                            id="cluster-counts"
                            filter={['has', 'point_count']}
                            style={{
                                textField: ['get', 'point_count_abbreviated'],
                                textSize: 14,
                                textColor: '#ffffff',
                                textIgnorePlacement: true,
                                textAllowOverlap: true,
                            }}
                        />
                    </Mapbox.ShapeSource>
                )}

                {/* LEVEL 2: Individual Attractions - Chỉ hiển thị khi zoom trung bình */}
                {zoomLevel > LEVEL1_THRESHOLD && zoomLevel <= LEVEL2_THRESHOLD && (
                    <Mapbox.ShapeSource
                        id="attractions-level2"
                        shape={attractionsGeoJson}
                        cluster={false}
                        onPress={(e) => {
                            const { properties } = e.features[0]
                            // Hiện chi tiết attraction
                            const attraction = attractions.find((a) => a.id === properties?.id)
                            if (attraction) {
                                showAttractionPin(attraction)
                                // Có thể zoom thêm để chuyển sang level 3 nếu muốn
                                const camera = cameraRef.current
                                if (camera) {
                                    camera.setCamera({
                                        centerCoordinate: [+attraction.longitude, +attraction.latitude],
                                        zoomLevel: LEVEL2_THRESHOLD + 2,
                                        animationDuration: 800,
                                    })
                                }
                            }
                        }}
                    >
                        {/* Layer cho điểm lẻ (attraction) */}
                        <Mapbox.SymbolLayer
                            id="attraction-points"
                            style={{
                                iconImage: 'attractionPin',
                                iconSize: 0.1,
                                iconAllowOverlap: true,
                                iconIgnorePlacement: true,
                                textField: ['get', 'name'],
                                textSize: 12,
                                textOffset: [0, 1.5],
                                textAnchor: 'top',
                                textColor: '#1d4ed8',
                                textHaloColor: '#ffffff',
                                textHaloWidth: 1,
                            }}
                        />
                    </Mapbox.ShapeSource>
                )}

                {/* LEVEL 3: Posts - Chỉ hiển thị khi zoom cao */}
                {zoomLevel > LEVEL2_THRESHOLD &&
                    Array.from(postsMap.entries()).flatMap(([attractionId, posts]) =>
                        Array.isArray(posts)
                            ? posts.map((post) => {
                                  const uri = post.images[0]
                                  const pkg = post.attraction?.advertisingPackage?.name
                                  const size = pkg && PACKAGE_SIZES[pkg] ? PACKAGE_SIZES[pkg] : DEFAULT_SIZE
                                  const borderColor = pkg ? color[pkg] : '#fafafa'

                                  return (
                                      <PointAnnotation
                                          key={`post-${attractionId}-${post.id}`}
                                          id={`post-${attractionId}-${post.id}`}
                                          coordinate={[+post.longitude, +post.latitude]}
                                          onSelected={() => showPostPin(post)}
                                      >
                                          <ImageBackground
                                              source={{ uri }}
                                              style={{
                                                  width: size,
                                                  height: size,
                                                  borderRadius: size / 2,
                                                  overflow: 'hidden',
                                                  borderWidth: 2,
                                                  borderColor,
                                              }}
                                          />
                                      </PointAnnotation>
                                  )
                              })
                            : [],
                    )}

                {userLocation && (
                    <>
                        <Mapbox.Camera
                            ref={cameraRef}
                            centerCoordinate={userLocation}
                            animationMode="flyTo"
                            animationDuration={4000}
                            zoomLevel={16}
                            pitch={60}
                            heading={45}
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

            <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
                <View className="flex-col items-end justify-between px-6">
                    {/* Search bar */}

                    <View className="flex-row px-3 py-2 bg-neutral-50 rounded-[35px] shadow items-center justify-between w-full mt-2">
                        <View className="flex-row items-center ml-2 gap-x-3">
                            <PinMap />
                            <TouchableOpacity onPress={() => goToSearchDestination()}>
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

                        <SelectMapModal urlMap={urlMap} setUrlMap={setUrlMap} />
                    </View>
                </View>
            </SafeAreaView>

            {/* Floating Buttons */}
            <View className="absolute z-10 flex-col gap-3 space-y-4 bottom-10 right-5">
                <FloatingButtonComponent icon={<Save />} onPress={() => {}} />
                <FloatingButtonComponent
                    icon={<Navigation />}
                    onPress={() => {
                        if (cameraRef.current && userLocation) {
                            cameraRef.current.setCamera({
                                centerCoordinate: userLocation,
                                zoomLevel: 16,
                                animationDuration: 1000,
                                pitch: 60, // nghiêng camera
                                heading: 45, // xoay hướng camera
                            })
                        }
                    }}
                />
            </View>
        </View>
    )
}

export default MapScreen
