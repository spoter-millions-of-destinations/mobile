import { BackRightToLeft, Clock, Info, KinhLup, Mark, Pin } from '@/assets/images/Button'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import mapService, { MapLocation } from '@/services/map.service'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    ActivityIndicatorBase,
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { ItemSave, SearchResult } from './components'
import { Building, Coffee, Hotel, Play, Sun } from 'lucide-react-native'
import { getDataFromStorage, setDataStorage } from '@/helpers/storage'

const SearchDestinationScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [searchHistory, setSearchHistory] = useState<MapLocation[]>([])

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            setDebouncedQuery(text)
        }, 500),
        [],
    )

    const handleChangeText = (text: string) => {
        setSearchText(text)
        if (text) debouncedSearch(text)
    }

    const addToHistory = (item: MapLocation) => {
        const newHistory = [item, ...searchHistory.filter((i) => i.id !== item.id)].slice(0, 10)
        setSearchHistory(newHistory)
        setDataStorage<MapLocation[]>('search_history', newHistory)
    }

    console.log('searchHistory', searchHistory)

    const {
        data: searchResults = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['places', debouncedQuery],
        queryFn: () => mapService.findLocationByName(debouncedQuery),
        enabled: !!debouncedQuery,
    })

    useEffect(() => {
        ;(async () => {
            const data = await getDataFromStorage('search_history')
            if (data) {
                setSearchHistory(data)
            }
        })()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-neutral-50 ">
            <View className="px-6">
                <View className="px-5 py-4 bg-neutral-50 rounded-[35px] border border-neutral-300 justify-between items-center flex-row mb-[23]">
                    <View className="flex-row items-center justify-center gap-x-4">
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <BackRightToLeft className="mr-6" />
                        </TouchableOpacity>

                        <TextInput
                            value={searchText}
                            onChangeText={handleChangeText}
                            multiline
                            placeholder="Search here..."
                            returnKeyType="search"
                        />
                    </View>
                    <TouchableOpacity>
                        <View className="flex-row items-center justify-center">
                            <KinhLup height={20} width={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                {searchText && isLoading && (
                    <View className="items-center py-4">
                        <Text className="text-neutral-500">Loading...</Text>
                        <ActivityIndicator size="small" color="#999" />
                    </View>
                )}
                {!isLoading && searchText && (
                    <FlatList
                        data={searchResults}
                        renderItem={({ item }) => (
                            <SearchResult icon={<Pin width={20} height={20} />} data={item} onPress={addToHistory} />
                        )}
                    />
                )}
                {!searchText && (
                    <>
                        <View className="mb-[22] flex-row items-center">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {_itemSave.map((item, index) => (
                                    <ItemSave key={index} {...item} />
                                ))}
                            </ScrollView>
                            <View className="p-4">
                                <Mark />
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center mb-[29]">
                            <Text className="text-neutral-800 text-sm font-normal font-['Montserrat']">Recently</Text>
                            <Info />
                        </View>

                        <FlatList
                            data={searchHistory}
                            renderItem={({ item }) => (
                                <SearchResult icon={<Clock />} data={item} onPress={addToHistory} />
                            )}
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}
const _itemSave = [
    {
        title: 'Hotel',
        number: 5,
        icon: <Hotel />,
    },
    {
        title: 'Coffee',
        number: 12,
        icon: <Coffee />,
    },
    {
        title: 'Office',
        number: 8,
        icon: <Building />,
    },
    {
        title: 'Entertainment',
        number: 23,
        icon: <Play />,
    },
    {
        title: 'Beach',
        number: 15,
        icon: <Sun />,
    },
]

export default SearchDestinationScreen
