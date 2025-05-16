import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, ImageBackground } from 'expo-image'
import { Pin } from '@/assets/images/Button'
import { useNavigation } from '@react-navigation/native'
import { Mission } from '@/data/missions'
import { useNavigatHelper } from '@/hooks/useNavigateHelper'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const MissionComponent = ({ info }: { info: Mission }) => {
    const { image, title, time, position, process } = info
    const { goToDetailMission } = useNavigatHelper()
    return (
        <TouchableOpacity
            className="bg-neutral-50 rounded-[15px] shadow border border-neutral-300 py-[11] pl-[11] pr-[40] flex-row mb-[15] relative"
            onPress={() => goToDetailMission(info)}
        >
            <View className="shadow h-[80] w-[80]  mr-[20]">
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                    }}
                    source={image}
                />
            </View>
            <View className="flex-1">
                <View className="mb-2">
                    <Text className="text-sky-800 text-base font-semibold font-['Montserrat']">{time}</Text>
                </View>

                <View className="mb-2">
                    <Text className="text-neutral-800 text-xs font-normal font-['Montserrat'] ">{title}</Text>
                </View>

                <View className="flex-row items-center w-full gap-x-2">
                    <Pin className="mr-2" />
                    <Text className="text-neutral-400 text-[10px] font-normal font-['Montserrat'] flex-1">
                        {position}
                    </Text>
                </View>
            </View>
            <View className="absolute bottom-2 right-2">
                <View className="absolute bottom-2 right-2">
                    <AnimatedCircularProgress
                        size={30}
                        width={3}
                        fill={info.process} // percent
                        tintColor="#0284c7"
                        backgroundColor="#bae6fd"
                        rotation={0}
                    >
                        {() => (
                            <Text style={{ fontSize: 8, color: '#0284c7', fontFamily: 'Montserrat' }}>
                                {info.process}%
                            </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MissionComponent
