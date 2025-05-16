import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackRightToLeft, Calender, CalenderGray, PinChallenge } from '@/assets/images/Button'
import { Mission, missions } from '@/data/missions'
import { router, useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { MissionSmallComponent } from './_components/MissionSmall'
import { Info } from './_components/Info'

const DetailChanllenge = () => {
    const { data, id } = useLocalSearchParams()
    const mission: Mission = useMemo(() => JSON.parse(data as string), [id])
    const { image, title, time, position, host, description, hostImage } = mission

    return (
        <ScrollView className="flex-1 bg-neutral-50">
            <View className="rounded-bl-[20px] rounded-br-[20px] overflow-hidden mb-[25.3] relative">
                <Image
                    source={image}
                    style={{
                        width: '100%',
                        height: 250,
                        borderRadius: 20,
                    }}
                />
                <TouchableOpacity
                    className="absolute left-[24] top-[50] w-[50px] h-[50px] justify-center items-center flex-row bg-neutral-50 rounded-full shadow"
                    onPress={() => router.back()}
                >
                    <BackRightToLeft />
                </TouchableOpacity>
            </View>
            <View className="px-6">
                <View className="mb-[30]">
                    <Text className="text-neutral-800 text-[26px] font-semibold font-['Montserrat']  tracking-wide">
                        {title}
                    </Text>
                </View>
                <View>
                    <Info title={time} description={'32 days remaining'} icon={<Calender />} />
                    <Info title={position} description={'23km near here'} icon={<PinChallenge />} />
                    <Info
                        title={host}
                        description={'Organizer'}
                        icon={
                            <Image
                                source={hostImage}
                                style={{
                                    width: '70%',
                                    height: '70%',
                                    borderRadius: 20,
                                }}
                            />
                        }
                        prefix={
                            <TouchableOpacity className="px-[13px] py-2 bg-sky-100 rounded-[10px] justify-center items-center inline-flex">
                                <Text className="text-sky-900 text-[10px] font-normal font-['Montserrat'] leading-[10px]">
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View className="mb-[60]">
                    <Text className="text-xl font-normal leading-tight text-neutral-800 ">About event</Text>
                    <Text numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                </View>
                <View className="flex-row flex-wrap justify-between flex-1 gap-1">
                    {missions
                        .filter((m) => m.id !== Number(id))
                        .map((mission, index) => (
                            <MissionSmallComponent key={index} info={mission} />
                        ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailChanllenge
