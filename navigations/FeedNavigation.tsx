import DetailCollection from '@/app/(share)/collection/[id]'
import DetailPostScreen from '@/app/(tabs)/feed/[id]'
import AttractionPin from '@/app/(tabs)/feed/AttractionPin'
import CreateCollection from '@/app/(modal)/collection/create_collection'
import MapScreen from '@/app/(share)/map'
import NewFeed from '@/app/(tabs)/feed'
import NotificationScreen from '@/app/(share)/notification'
import PersionPin from '@/app/(share)/map/post_pin'
import SaveScreen from '@/app/(modal)/collection/save'
import SearchDestinationScreen from '@/app/(share)/map/SearchDestinationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

const NewFeedStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="posts"
                component={NewFeed}
                initialParams={{
                    isPostSuccess: false,
                }}
            />
            <Stack.Screen name="detail-post" component={DetailPostScreen} />
            <Stack.Screen name="map" component={MapScreen} />
            <Stack.Screen name="notification" component={NotificationScreen} />
            <Stack.Screen name="search-destination" component={SearchDestinationScreen} />
            <Stack.Screen
                screenOptions={{
                    fotterShown: false,
                }}
                name="save"
                component={SaveScreen}
                options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: 'all',
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="create-collection"
                component={CreateCollection}
                options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: 'large',
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="persion-pin"
                component={PersionPin}
                options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: 'all',
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen
                name="attraction-pin"
                component={AttractionPin}
                options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: 'medium',
                    sheetCornerRadius: 30,
                    sheetGrabberVisible: true,
                }}
            />
            <Stack.Screen name="detail-collection" component={DetailCollection} />
        </Stack.Navigator>
    )
}

export default NewFeedStack
