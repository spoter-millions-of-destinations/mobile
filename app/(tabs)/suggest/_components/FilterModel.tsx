import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, ScrollView, Text } from 'react-native'

import { Star, Line, Distance, Pin, PersonReview } from '@/assets/images/Button'
import { AccordionItem, DistanceCollapsible, CountryCollapsible, PersionReview } from '@/components/AccordionItem'
import { color } from '@/constants/Colors'
import { useUserLocation } from '@/hooks/useUserLocation'

type FilterModalProps = {
    visible: boolean
    onClose: () => void
    onApply: (filters: { latitude?: number; longitude?: number; radius?: number; rate?: number }) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
    const { userLocation, setUserLocation } = useUserLocation({ data: undefined })
    const [valueDistance, setValueDistance] = useState(5)
    const [selectedRate, setSelectedRate] = useState<string | undefined>()

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 absolute right-[24] top-[110]">
                <View className="w-[282px] max-h-[530] bg-neutral-50 rounded-[25px] shadow border border-neutral-200 backdrop-blur-sm px-[30] py-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <Star />
                        <Text className="text-neutral-500 text-xs font-medium font-['Montserrat']">
                            Describe what you want to filter
                        </Text>
                    </View>
                    <Line />
                    <ScrollView>
                        <AccordionItem
                            icon={<Distance />}
                            title={'Distance/Radius'}
                            content={<DistanceCollapsible value={valueDistance} />}
                        />

                        <AccordionItem
                            icon={<PersonReview />}
                            title={'Persion review'}
                            content={<PersionReview selectedId={selectedRate} onSelect={setSelectedRate} />}
                        />
                    </ScrollView>

                    <View className="flex-row items-center justify-end">
                        <TouchableOpacity
                            onPress={onClose}
                            className="px-4 py-2 border rounded-[10px] border-neutral-300 mr-2"
                        >
                            <Text className="text-black">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: color.primary }}
                            className="px-4 py-2 rounded-[10px]"
                            onPress={() => {
                                onApply({
                                    latitude: userLocation[1],
                                    longitude: userLocation[0],
                                    radius: valueDistance,
                                    rate: selectedRate ? parseInt(selectedRate) : undefined,
                                })
                            }}
                        >
                            <Text className="text-white">Find</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default FilterModal
