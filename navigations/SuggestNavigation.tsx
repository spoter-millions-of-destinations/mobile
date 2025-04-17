import DetailPostScreen from '@/app/(tabs)/feed/[id]'
import CollectionSuggestion from '@/app/(tabs)/suggest/collection_suggest'
import DetailPublicSuggestion from '@/app/(tabs)/suggest/detail_suggestion'
import Suggest from '@/app/(tabs)/suggest'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator()

const SuggestNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="suggests" component={Suggest} />
            <Stack.Screen name="detail-suggest" component={DetailPostScreen} />
            <Stack.Screen name="suggest-collections" component={CollectionSuggestion} />
            <Stack.Screen name="detail-suggest-public-collection" component={DetailPublicSuggestion} />
        </Stack.Navigator>
    )
}

export default SuggestNavigation
